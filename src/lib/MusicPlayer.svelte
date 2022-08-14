<script>
    import {AudioPlayer} from 'svelte-mp3';
    import song1 from '../assets/temp/Psalm137.mp3';
    import praiseCover from '../assets/covers/praise.png';

    export let compactMode = false;
    export let onDarkBackground = false;
</script>

{#if compactMode}
<div class="sm:flex items-center">
    <div class="flex items-center">
        <div class="max-w-[3rem] w-full">
            <img src={praiseCover} alt="praise cover" class="w-full h-auto rounded">
        </div>
        <div class="leading-7 mx-2">
            <span class="font-body">Now playing</span><br>
            <span class="h2 font-body">Psalm 137</span>
        </div>
    </div>
    <div>
        <AudioPlayer 
            urls={[song1]}
            showTime={false}
            showShuffle={false}
            showVolume={false}
            shuffle={false}
            showTrackNum={false}
            color={onDarkBackground ? "#FFF7E8" : "#564138"}
        />
    </div>
</div>
{:else}
<div class="max-w-xs player-container border-solid border-[1px] border-on-tinted-bg p-4 rounded-lg text-on-light-bg">
    <div class="my-4 flex">
        <div class="max-w-[25%] mr-4 w-full">
            <img src={praiseCover} alt="praise cover" class="w-full h-auto rounded">
        </div>
        <div>
            <span class="font-body">Now playing</span><br>
            <span class="h2 font-body">Psalm 137</span>
        </div>
    </div>
    <AudioPlayer 
    urls={[song1]}
    showTime={false}
    showShuffle={false}
    showVolume={true}
    shuffle={false}
    showTrackNum={false}
    color={onDarkBackground ? "#FFF7E8" : "#564138"}
    />
</div>
{/if}

<style>
    .player-container{
        background: rgb(255,247,232);
        background: linear-gradient(23deg, rgba(255,247,232,.3) 0%, rgba(255,247,232,1) 100%);
    }

    .player button.play{
        width: 20rem !important;
    }
</style>