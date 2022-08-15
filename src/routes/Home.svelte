<script>
    import TopNav from '../lib/TopNav.svelte';
    import MusicPlayer from '../lib/MusicPlayer.svelte';
    import introVideo from '../assets/videos/intro-video.mp4';
    import introVideoPoster from '../assets/images/couple-seated-at-piano-singing.png';
    import benefitsCollageImage from '../assets/images/benefits-collage.png';
    import widePianoShotImage from '../assets/images/wide-piano-shot.png';

    import { gsap } from "gsap";
    import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMount } from 'svelte';
import Footer from '../lib/Footer.svelte';

    gsap.registerPlugin(ScrollTrigger);

    onMount(()=>{
        gsap.to('#movingProgressLabel1',{
            scrollTrigger: {
                trigger: '#movingProgressLabel1',
                start: 'bottom bottom',
                end: 'bottom top',
                scrub: 1,
            },
            xPercent: -100,
        });
        gsap.to('#movingProgressLabel2',{
            scrollTrigger: {
                trigger: '#movingProgressLabel2',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
            },
            xPercent: 100,
        });
        gsap.fromTo('#audienceStatsContainer',{
            y: -20,
            opacity: 0
        },{
            scrollTrigger: {
                trigger: '#movingProgressLabel1',
                start: 'bottom center',
            },
            y: 0,
            opacity: 1
        });
        gsap.fromTo('#progressTitle',{
            y: 20,
            opacity: 0
        },{
            scrollTrigger: {
                trigger: '#movingProgressLabel1',
                start: 'bottom center',
            },
            y: 0,
            opacity: 1
        });

        document.querySelectorAll('.fade-in-down').forEach(item=>{
            gsap.fromTo(item,{
                y: -20,
                opacity: 0
            },{
                scrollTrigger: {
                    trigger: item,
                    start: 'bottom bottom'
                },
                y: 0,
                opacity: 1
            });
        });
        document.querySelectorAll('.fade-in-right-staggered').forEach(item=>{
            gsap.fromTo(item,{
                x: -20,
                opacity: 0
            },{
                scrollTrigger: {
                    trigger: item,
                    start: 'bottom bottom'
                },
                stagger: .2,
                x: 0,
                opacity: 1
            });
        });

    });

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

    let playlistPreviews = [
        {
            name: "Kingship Psalms about Jesus",
            includedPsalms: ["2","23","90"]
        },
        {
            name: "Praise Psalms for dancing",
            includedPsalms: ["3","14","19"]
        },
        {
            name: "Confidence Psalms about Zion for rest",
            includedPsalms: ["3","14","19"]
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
    <section class="text-on-light-bg my-24">
        <div class="mx-auto w-fit">
            <h2 class="font-bold uppercase text-center">Progress</h2>
            <div id="progressTitle" class="h1 text-center">We are breaking new grounds</div>
        </div>
        <div id="movingProgressLabel1" class="font-display2 text-on-light-outline-primary text-7xl md:text-8xl lg:text-9xl uppercase whitespace-nowrap">
            134 weeks of recording - 134 weeks of recording - 134 weeks of recording
        </div>
        <div id="movingProgressLabel2" class="font-display2 text-primary text-7xl md:text-8xl lg:text-9xl uppercase whitespace-nowrap translate-x-[-100%]">
            136/150 Psalms sung - 136/150 Psalms sung - 136/150 Psalms sung
        </div>
        <ul id="audienceStatsContainer" class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto px-8 flex-wrap my-8">
            {#each audienceStats as stat}
            <li class="flex flex-col items-center text-center"><span class="text-h1 md:text-h1-lg font-display1">{stat.number}</span> {stat.description}</li>
            {/each}
        </ul>
    </section>
    <section class="text-on-light-bg max-w-4xl container mx-auto my-16 px-4">
        <h2 class="h1 w-full text-center mb-4">Get to know the Psalms</h2>
        <div class="md:flex">
            <div class="hidden md:block md:flex-grow mr-6">
                <img src={benefitsCollageImage} alt="">
            </div>
            <div class="md:max-w-sm flex flex-col justify-between">
                {#each benefits as benefit}
                <article class="text-center md:text-start fade-in-down my-4">
                    <h3 class="h2">{benefit.title}</h3>
                    <p>{benefit.content}</p>
                </article>
                {/each}
            </div>
        </div>
    </section>
    <section class="relative">
        <img src={widePianoShotImage} alt="" class="absolute w-full h-full object-cover z-0">
        <div class="absolute top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,.3)] z-10"></div>
        <div class="flex items-center justify-center relative z-20">
            <div class="max-w-sm mx-8 my-8 text-on-tinted-bg">
                <p class="text-center">
                    We are delighted to share all of the music of EveryPsalm for free, and have been amazed at the impact the songs have had on individuals around the world.
<br><br>
As we continue to sing God's word, we hear more and more testimonies of the life-giving fruit of this marriage of music and scripture.
<br><br>
<strong>Please consider partnering with us so we can see this 3-year journey to completion!</strong>
                </p>
                <div class="mt-4 w-full text-center">
                    <button class="bg-primary font-bold px-4 py-2 text-on-tinted-bg">Support us</button>
                </div>
            </div>
        </div>
    </section>
    <section class="mx-auto container text-on-light-bg px-4 py-10">
        <h2 class="text-center h2">Explore the songs</h2>
        <div class="md:flex justify-center mt-4">
            <div class="max-w-sm md:mr-8">
                <p class=" fade-in-down">
                    This is a fan website, made to help you explore the songs from EveryPsalm and learn more about the Psalms they express.
    <br><br>
    Choose a playlist to start exploring!
                </p>
            </div>
            <ul class="mt-4 md:mt-0">
                {#each playlistPreviews as playlist}  
                <li class="my-1 fade-in-right-staggered">
                    <a href="#" class="flex justify-between items-center group py-3">
                        <div class="flex mr-4">
                        <svg width="61" height="27" viewBox="0 0 61 27" fill="none" xmlns="http://www.w3.org/2000/svg"
                        class="group-hover:translate-x-3 transition-transform delay-75 ease-in-out min-w-[61px]">
                            <line y1="13.5" x2="46" y2="13.5" stroke="#564138" stroke-width="3"/>
                            <path d="M60 13.5C55.8333 12.8333 47 9.4 45 1" stroke="#564138" stroke-width="3"/>
                            <path d="M60 14C55.8333 14.6667 47 18.1 45 26.5" stroke="#564138" stroke-width="3"/>
                        </svg>
                            <p class="ml-4 group-hover:text-primary transition-colors delay-100 ease-in-out">{playlist.name}</p>
                        </div>
                        <small>Including Psalms {playlist.includedPsalms.join(', ')}</small>
                    </a>
                </li>
                {/each}
            </ul>
        </div>
    </section>
    <Footer />
</div>