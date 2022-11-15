<script>
  import { lapTargets } from "../stores.js" 
  import { msToTime } from "../time.js" 

  const defaultLap = 18500
  const defaultOpeningLap = 23000
  const defaultLaps = 12

  $: totalTime = $lapTargets.reduce((t, n) => t + parseFloat(n.target), 0)

  function removeLap() {
    lapTargets.update(l => l.slice(0, -1))
  }

  function addLap(time) {
    return function() {
      lapTargets.update(l => l.concat({target: time}))
    }
  }

  function resetLaps() {
    lapTargets.update(l => new Array())
    addLap(defaultOpeningLap)()
    for (let i = 1; i < defaultLaps; i++) {
      addLap(defaultLap)()
    }
  }

  if ($lapTargets.length == 0) {
    resetLaps()
  }

</script>

<br />

<table class="setup-table">
  <tr>
    <td></td>
    <td><button on:click={ removeLap }>Remove lap</button></td>
    <td><button on:click={ resetLaps }>Reset</button></td>
    <td><button on:click={ addLap(defaultLap) }>Add lap</button></td>
  </tr>
  {#each $lapTargets as lap, i}
    <tr>
      <td style="width: 20%;">{i + 1}</td>
      <td style="width: 20%;"><button on:click={() => lap.target -= 100 }>-</button></td>
      <td style="width: 40%;">{ (lap.target / 1000).toFixed(1) }</td>
      <td style="width: 20%;"><button on:click={() => lap.target += 100 }>+</button></td>
    </tr>
  {/each}
  <tr>
    <td colspan=4>Total: {msToTime(totalTime)}</td>
  </tr>
</table>


<a href="/timer"><button>Finish</button></a>

<style>
  .setup-table {
    width: 100%;
  }

  td {
    text-align: center;
  }

  button {
    min-width: 38px;
    min-height: 38px;
    width: 100%;
  }
</style>
