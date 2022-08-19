<script>
    import player from "./player";
    import PlayControls from './PlayControls.svelte';

    export let onDarkBackground = false;
    export let compactMode = false;

    let currentSongStore = player.getCurrentSongStore();

    function getCoverImageUrl(psalmNumber,psalmCategory){
        let name = psalmNumber==119 ? 'psalm119' : psalmCategory;
        return `/site-assets/covers/${name}.jpeg`
    }

    $: fontColorClass = onDarkBackground ? 'text-on-tinted-bg' : 'text-on-light-bg';
</script>
{#if compactMode}
<div class="sm:flex items-center">
    <div class="flex items-center">
        <div class="max-w-[3rem] w-full">
            <img src={getCoverImageUrl($currentSongStore.info['psalm-number'],$currentSongStore.info.category)} alt="praise cover" class="w-full h-auto rounded">
        </div>
        <div class={"leading-7 mx-2 "+fontColorClass}>
            <span class="font-body">Now playing</span><br>
            <span class="h2 font-body">{$currentSongStore.info.name}</span>
        </div>
    </div>
    <PlayControls {onDarkBackground}/>
</div>
{:else}
<div class="max-w-xs player-container border-solid border-[1px] border-on-tinted-bg p-4 rounded-3xl text-on-light-bg">
    <div class="my-4 flex">
        <div class="max-w-[25%] mr-4 w-full">
            <img src={getCoverImageUrl($currentSongStore.info.category)} alt="praise cover" class="w-full h-auto rounded">
        </div>
        <div>
            <span class="font-body">Now playing</span><br>
            <span class="h2 font-body">{$currentSongStore.info.name}</span>
        </div>
    </div>
    <PlayControls showProgress={true}/>
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