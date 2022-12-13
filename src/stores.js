import { writable } from 'svelte/store';

function createLapStore() {
  const { subscribe, set, update } = writable(new Array());

  return {
    subscribe,
    set,
    update,
    addLap: (time) => update(l => l.concat({target: time})),
    removeLap: () => update(l => l.slice(0, -1)),
    reset: () => set(new Array()),

    timeStart: () => {
      update(l => {
        l.at(0).start = Date.now()
        return l
      })
    },

    timeHalf: (lap) => {
      update(l => {
        l.at(lap).half = Date.now()
        return l
      })
    },

    timeFull: (lap) => {
      update(l => {
        l.at(lap).end = Date.now()
        return l
      })
    },
  }
}

export const lapTargets = createLapStore()
