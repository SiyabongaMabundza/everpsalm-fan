<script>
    import TopNav from '../lib/TopNav.svelte';
    import MusicPlayer from '../lib/MusicPlayer.svelte';
    import introVideo from '../assets/videos/intro-video.mp4';
    import introVideoPoster from '../assets/images/couple-seated-at-piano-singing.png';
</script>



<div class="bg-white-light-bg h-[200vh] font-body">
    <div class="h-[80vh]">
        <video autoplay muted loop class="absolute top-0 h-[80vh] w-full z-0 brightness-75 object-cover">
            <source src={introVideo} type="video/mp4" poster={introVideoPoster}>
        </video>
        <div class="z-10 relative h-full flex flex-col">
            <div class="flex-none">
                <TopNav />
            </div>
            <div class="container px-4 max-w-4xl mx-auto text-on-tinted-bg flex items-center grow">
                
                    <div class="md:flex">
                        <div class="max-w-md mr-4">
                            <h1 class="font-display1 text-5xl">A song for every Psalm</h1>
                            <p>Psalms is a book in the Bible composed of sacred songs/poems meant to be sung. EveryPsalm is Poor Bishop Hooper’s project where the duet creates songs heavily inspired by every Psalm, and releases that music for free.</p>
                        </div>
                        <div class="mt-8 md:mt-0 ">
                            <MusicPlayer onDarkBackground={false}/>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</div>