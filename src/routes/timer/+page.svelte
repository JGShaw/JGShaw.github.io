<script>
  import { lapTargets } from "../../stores.js"
  import { msToTime } from "../../time.js"
  import { onDestroy } from 'svelte'

  onDestroy(() => {
    setBackgroundColor("white")
      lapTargets.update(l => {
        return new Array()
      })
  })

  const thresholds = [
    {color: "Blue", from: -Infinity, to: -501},
    {color: "LawnGreen", from: -500, to: -1},
    {color: "Orange", from: 0, to: 499},
    {color: "Red", from: 500, to: Infinity},
  ]

  var halfLapCount = 0
  var finished = false

  function lap() {
    if (halfLapCount == 0) {
      lapTargets.timeStart()
      halfLapCount++
      return
    }

    if ($lapTargets.length < halfLapCount/2 ) {
      setBackgroundColor("white")
      finished = true
      return
    }

    if (halfLapCount % 2 == 1) {
      lapTargets.timeHalf((halfLapCount - 1) / 2)
    } else {
      var lapNumber = (halfLapCount / 2) - 1
      lapTargets.timeFull(lapNumber)

      var finishedLap = $lapTargets.at(lapNumber)
      var lastLapTime = finishedLap.end - (lapNumber == 0 ? finishedLap.start : $lapTargets.at(lapNumber - 1).end)
      var diff = lastLapTime - finishedLap.target

      for (const t of thresholds) {
        if(diff >= t.from && diff <= t.to) {
          finishedLap.color = t.color
          setBackgroundColor(t.color)
          break
        }
      }
    }

    halfLapCount++
  }

  function setBackgroundColor(color) {
    if (typeof window !== "undefined") {
      document.body.bgColor = color
      document.querySelector('meta[name="theme-color"]').setAttribute("content", color)
    }
  }

</script>

<table class="timer-table" on:keypress={ lap } on:click={ lap }>
  {#if halfLapCount > 0 && !finished}
    <tr>
      <td colspan=5>Timing in progress</td>
    </tr>
  {/if}

  <tr>
    <td>Lap</td>
    <td>Target</td>
    <td>Half</td>
    <td>Full</td>
    <td>Total</td>
  </tr>
  {#each $lapTargets as lap, i}
    <tr>
      <td style="width: 20%;">{i + 1}</td>
      <td style="width: 20%;">{ (lap.target / 1000).toFixed(1) }</td>
      {#if i == 0}
        <td style="width: 20%">{msToTime(lap.half - lap.start)}</td>
        <td style="width: 20%; background:{ lap.color }">{msToTime(lap.end - lap.start)}</td>
      {:else}
        <td style="width: 20%;">{msToTime(lap.half - $lapTargets.at(i-1).end)}</td>
        <td style="width: 20%; background:{ lap.color }">{msToTime(lap.end - $lapTargets.at(i-1).end)}</td>
      {/if}
      <td style="width: 20%;">{msToTime(lap.end - $lapTargets.at(0).start)}</td>
    </tr>
  {/each}
</table>

<style>
  .timer-table {
    width: 100%;
  }

  td {
    text-align: center;
  }
</style>
