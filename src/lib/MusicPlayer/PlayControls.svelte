<script>
  import player from './player';

  export let showProgress = false;
  export let onDarkBackground = false;

  let playerProgressStore = player.getProgressStore();

  function playSong() {
    player.play();
  }

  function pauseSong() {
    player.pause();
  }

  let controlsColor = onDarkBackground ? "#FFF7E8" : "#564138";
</script>

{#if showProgress}
<div class="mx-4 my-2 h-2 bg-[#8B6555] rounded-full">
  <div class="h-2 w-0 bg-secondary rounded-full" style={`width: ${$playerProgressStore.percentProgress}%`}></div>
</div>
{/if}

<div class="flex justify-between before:content-[''] after:content-['']">
  <button>
    <svg
      fill={controlsColor}
      xmlns="http://www.w3.org/2000/svg"
      height="48"
      width="48"
      ><path
        d="M11 36V12h3v24Zm26 0L19.7 24 37 12Zm-3-12Zm0 6.25v-12.5L24.95 24Z"
      /></svg
    >
  </button>
  {#if $playerProgressStore.isPlaying}
    <button on:click={pauseSong}>
      <svg
        fill={controlsColor}
        xmlns="http://www.w3.org/2000/svg"
        height="48"
        width="48"
        ><path
          d="M18.5 32h3V16h-3Zm8 0h3V16h-3ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z"
        /></svg
      >
    </button>
  {:else}
    <button on:click={playSong}>
      <svg
        fill={controlsColor}
        xmlns="http://www.w3.org/2000/svg"
        height="48"
        width="48"
        ><path
          d="M19.15 32.5 32.5 24l-13.35-8.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z"
        /></svg
      >
    </button>
  {/if}
  <button>
    <svg
      fill={controlsColor}
      xmlns="http://www.w3.org/2000/svg"
      height="48"
      width="48"
      ><path
        d="M34 36V12h3v24Zm-23 0V12l17.3 12Zm3-12Zm0 6.25L23.05 24 14 17.75Z"
      /></svg
    >
  </button>
</div>
