<script>
    import TopNav from '../lib/TopNav.svelte';
    import MusicPlayer from '../lib/MusicPlayer.svelte';
    import introVideo from '../assets/videos/intro-video.mp4';
    import introVideoPoster from '../assets/images/couple-seated-at-piano-singing.png';
    import benefitsCollageImage from '../assets/images/benefits-collage.png';

    let features = [
        {
            title: "What is it?",
            content: "EveryPsalm is a project made up of weekly musical releases accompanied by visual art. Each song is based directly on a psalm, many lyrics being word-for-word from the scriptures. Whether you want to download directly, stream, or listen on the website, all of the content is available for free."
        },
        {
            title: "Why?",
            content: "The Psalter speaks to the entirety of the human experience. Its works embody the technicolor spectrum of life. Our goal in this project, (like many of our others) is to help listeners engage with the scriptures in new ways, and bring God’s relevant and applicable word to both the normal and extraordinary times of life."
        },
        {
            title: "How?",
            content: "At 150 songs, EveryPsalm will be three straight years of new weekly music. There are many practical hurdles that accompany this endeavour, the foremost being time. Though we would love to spend days on each track, our goal is to shape each song quickly, simply, and with meditation in mind."
        },
    ];

    let audienceStats = [
        {
            number: 300000,
            description: 'streams on Spotify'
        },
        {
            number: 250000,
            description: 'streams on Apple Music'
        },
        {
            number: 189000,
            description: 'streams on Amazon Music'
        },
        {
            number: 307515,
            description: 'views on YouTube'
        },
    ];

    let benefits = [
        {
            title: 'Learn who God really is',
            content: 'The Psalms stretch our mental picture of God into its proper context. They make us wince when we sing of God’s judgment and wrath, and give us a far bigger, more beautiful, breathtaking picture of God’s glory.'
        },
        {
            title: 'Rediscover Jesus',
            content: 'There are over 32 prophecies in the Psalms which were fulfilled by Jesus Christ our Saviour during His life on earth! Learn about Christ’s suffering on the cross from Psalm 22, or turn to the Kingship Psalms to appreciate the great kingship of Christ both now and in the age to come.'
        },
        {
            title: 'Fulfil God’s commandment',
            content: 'The bible tells us to sing psalms. “Speak to one another with psalms, hymns, and spiritual songs. Sing and make music in your heart to the Lord.”(Ephesians 5:19). The psalms are one way we build one another up, by speaking to one another in song. We are called also to sing to God himself from the center of our being, with our whole self.'
        },
    ];
</script>



<div class="bg-white-light-bg font-body">
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
    <div class="relative top-[-40px] h-[40px] w-full bg-gradient-to-t from-white-light-bg">
    </div>
    <section class="container mx-auto text-on-light-bg md:grid grid-cols-3 gap-4 max-w-6xl my-8 px-4">
        {#each features as feat}  
        <dl class="my-4">
            <dt class="h2 mb-2">{feat.title}</dt>
            <dd>{feat.content}</dd>
        </dl>
        {/each}
    </section>
    <section class="text-on-light-bg">
        <div class="mx-auto w-fit">
            <h2 class="font-bold uppercase text-center">Progress</h2>
            <span class="h1 font-display1">We are breaking new grounds</span>
        </div>
        <div class="font-display2 text-on-light-outline-primary text-9xl uppercase whitespace-nowrap">
            134 weeks of recording
        </div>
        <div class="font-display2 text-primary text-9xl uppercase whitespace-nowrap">
            136/150 Psalms sung 
        </div>
        <ul class="flex justify-between max-w-4xl mx-auto px-8 flex-wrap my-8">
            {#each audienceStats as stat}
            <li class="flex flex-col items-center"><span class="text-4xl font-display1">{stat.number}</span> {stat.description}</li>
            {/each}
        </ul>
    </section>
    <section class="text-on-light-bg max-w-4xl container mx-auto my-16">
        <h2 class="h1 font-display1 w-full text-center mb-4">Get to know the Psalms</h2>
        <div class="flex">
            <div class="flex-grow mr-6">
                <img src={benefitsCollageImage} alt="">
            </div>
            <div class="max-w-sm flex flex-col justify-between">
                {#each benefits as benefit}
                <article>
                    <h3 class="h2">{benefit.title}</h3>
                    <p>{benefit.content}</p>
                </article>
                {/each}
            </div>
        </div>
    </section>
</div>