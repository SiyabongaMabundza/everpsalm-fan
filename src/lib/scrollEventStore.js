import { writable } from 'svelte/store';

// Reference: http://www.html5rocks.com/en/tutorials/speed/animations/

let prevLastKnownScrollPosition = 0;
let lastKnownScrollPosition = 0;
let ticking = false;

function listenToScroll(callback){
  document.addEventListener('scroll', (e) => {
      prevLastKnownScrollPosition = lastKnownScrollPosition;
    lastKnownScrollPosition = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        callback(lastKnownScrollPosition,(lastKnownScrollPosition-prevLastKnownScrollPosition)>0);
        ticking = false;
      });

      ticking = true;
    }
  });
  
}

/**
 * Allow subscribers
 * @param {Object} options Fields:
 * - trackElement: (Object)
 *  - element: (HTMLElement) the element to track
 *  - eventId: (string) the "name" of the event that will be fired when the trigger happens
 *  - on: (string) has two parts in the format "x y" both values can either be top, center or bottom. The event will be fired when the x of the *element* reaches the y of the *body*
 */
export function getStore(options=null){
    let scrollStore = writable(['atTop']);

    //validate options
    if(options?.trackElement){
      if(!options.trackElement.element) throw new Error('expected the trackElement option to have the "element" field set');
      if(!options.trackElement.eventId) throw new Error('expected the trackElement option to have the "eventId" field set');
      if(!options.trackElement.on) throw new Error('expected the trackElement option to have the "on" field set');
    }

    // listen to events
    listenToScroll((scrollPos,isGoingDown)=>{
      let events = [];
      if(scrollPos==0) events.push('atTop');
      if(isGoingDown) events.push('isGoingDown');
      else if(!isGoingDown) events.push('isGoingUp');
      
      if(options && options.trackElement){
        //TODO: implement trackElement feature
      }

      // console.log('scroll events: ', events)
      scrollStore.set(events);
    });

    return scrollStore;
};