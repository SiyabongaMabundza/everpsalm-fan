<script>
    import MusicPlayerWidget from "../lib/MusicPlayer/Widget.svelte";
</script>

<div class="bg-purple-tinted-bg">
    
    <MusicPlayerWidget songs={[]}/>
    <MusicPlayerWidget songs={[]} onDarkBackground={true}/>
    <MusicPlayerWidget songs={[]} compactMode={true}/>
    <MusicPlayerWidget songs={[]} compactMode={true} onDarkBackground={true}/>

</div>
