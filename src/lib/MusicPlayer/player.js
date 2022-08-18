import {Howl, Howler} from 'howler';
import { writable,get } from 'svelte/store';

const STARTING_PSALM = {
    "category": "wisdom",
    "stream-url": "https://static1.squarespace.com/static/5d828ef0eebdfb083485b0c4/t/5ee7dd3210ad0b75d55b48fd/1592253775320/Psalm001.mp3/original/Psalm001.mp3",
    "date-released": "1 Jan 2020",
    "name": "Psalm 1",
    "psalm-number": 1,
    "all-lyrics": "on your holy mountain you have placed your chosen king\non the throne of zion still you proclaim\n\ni will tell of the decree the lord said to me\nyou are my son today i have begotten you\n\nask of me…\n\nand i will make the nations your heritage \nthe ends of the earth your possession\nyou shall break them with a rod of iron \nand dash them to pieces dash them to pieces\n\non your holy mountain you have placed your chosen king\nso serve with the lord with fear and rejoice with trembling\n\nblessed are all who take refuge in\nblessed are all who take refuge in him\n\nDownload the lyrics/chords\n\noh the joy, the joy, the joy\nof those who delight in the law of the lord\noh the joy, the joy, the joy of those\nwho meditate day and night in the law of the lord\n\nlet all my delight be only in\nyour sweet and right instruction\n\nlike trees along the river with leaves that never wither\n\neverything they do will prosper in you\n\nDownload the lyrics/chords"
};
const howl = new Howl({
    src: [STARTING_PSALM['stream-url']],
    html5: true,
    onload: ()=>{
        progressStore.update(prev=>{
            let playState = prev.playState;
            if(prev.playState=='loading-to-play') playState = 'ready-to-play';
            return {percentProgress:0, playState}
        });
    }
});

/**
 * playstates: (there will always either be something to play or something loading)
 * - ready-to-play
 * - loading-to-play
 * - playing
 * - paused
 **/ 
let progressStore = writable({percentProgress: 0, playState: 'loading-to-play'});

let playlist = [STARTING_PSALM];
let currentSongStore = writable({info: STARTING_PSALM, hasNext: false, hasPrev: false});
let currentSongIndex = 0;

let trackingProgress = false;

function updateProgressStore(){
    let isPlaying = howl.playing();

    progressStore.update(prev=>{
        let playState = prev.playState;

        if(isPlaying) playState = 'playing';
        else if(prev.playState=='playing') playState = 'paused';

        return {
            percentProgress: isPlaying ? (howl.seek()/howl.duration())*100 : prev.percentProgress,
            playState}
    });

    window.requestAnimationFrame(updateProgressStore);
}

function changeSongSrc(newSrc){
    howl.unload();
    currentSongIndex = 0;
    progressStore.set({percentProgress: 0, playState:'loading-to-play'});
    howl._src = newSrc;
    howl.load();
}

function playSongInCurrentPlaylist(index){
    if(index<0 || index>=playlist.length) throw new Error('tried to play a song in playlist that is out of range');
    currentSongStore.set({info: playlist[index], hasNext: index>=playlist.length, hasPrev: index>0});
    changeSongSrc(playlist[index]['stream-url']);
    currentSongIndex = index;
}

const player = {
    setPlaylist: (songs,{startPlayingNow})=>{
        if(!songs) throw new Error('Tried to set a playlist with no songs');

        playlist = songs;
        currentSongIndex = 0;
        changeSongSrc(songs[currentSongIndex]);
        currentSongStore.set({info: songs[currentSongIndex], hasPrev: false, hasNext: songs.length>1 ? true : false});

        if(startPlayingNow) player.play();
    },
    //TODO: implement playNextInPlaylist & playPrevInPlaylist
    play: ()=>{
        let {playState} = get(progressStore);
        if(playState!='playing')
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
    },
    getCurrentSongStore: ()=>{
        return currentSongStore;
    },
    playPrevSong: ()=>{ // TODO: test this
        if(currentSongIndex<=0) return;
        playSongInCurrentPlaylist(currentSongIndex-1);
    },
    playNextSong: ()=>{ // TODO: test this
        if(currentSongIndex>=playlist.length-1) return;
        playSongInCurrentPlaylist(currentSongIndex+1);
    }
}

export default player;