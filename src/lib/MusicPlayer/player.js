import {Howl, Howler} from 'howler';
import { writable,get } from 'svelte/store';
import song1 from '../../assets/temp/Psalm137.mp3';

const howl = new Howl({
    src: [song1],
    html5: true
});

let progressStore = writable({percentProgress: 0, isPlaying: false});
let trackingProgress = false;

function updateProgressStore(){
    let nextPercentProgress = (howl.seek()/howl.duration())*100;
    let isPlaying = howl.playing();
    progressStore.update(prev=>({percentProgress: isPlaying ?nextPercentProgress : prev.percentProgress, isPlaying}));

    window.requestAnimationFrame(updateProgressStore);
}

export default {
    loadSongs: ()=>{
        //TODO: implement
    },
    play: ()=>{
        let {isPlaying} = get(progressStore);
        if(!isPlaying)
            howl.play();
    },
    pause: ()=>{
        // let {isPlaying} = get(progressStore)
        // if(isPlaying)
            howl.pause();
    },
    getProgressStore: ()=>{
        if(!trackingProgress){
            window.requestAnimationFrame(updateProgressStore);
            trackingProgress = true;
        }
        return progressStore;
    }
}