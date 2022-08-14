import { writable } from 'svelte/store';

export const scrollEventStore = writable(['atTop']);

// Reference: http://www.html5rocks.com/en/tutorials/speed/animations/

let prevLastKnownScrollPosition = 0;
let lastKnownScrollPosition = 0;
let ticking = false;

function doSomething(scrollPos,isGoingDown) {
    let events = [];
    if(scrollPos==0) events.push('atTop');
    if(isGoingDown) events.push('isGoingDown');
    else if(!isGoingDown) events.push('isGoingUp');
    scrollEventStore.set(events);
}

document.addEventListener('scroll', (e) => {
    prevLastKnownScrollPosition = lastKnownScrollPosition;
  lastKnownScrollPosition = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(() => {
      doSomething(lastKnownScrollPosition,(lastKnownScrollPosition-prevLastKnownScrollPosition)>0);
      ticking = false;
    });

    ticking = true;
  }
});

/**
 * Allow subscribers
 * @param {Object} options Fields:
 * - alertWhenPastMarker: number
 */
export function getStore(options){
    return scrollEventStore;
};