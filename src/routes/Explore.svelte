<script>
    import TopNav from "../lib/TopNav.svelte";
    import SongsFilterWidget from "../lib/SongsFilter/Widget.svelte"
    import { gsap } from "gsap";
    import { ScrollTrigger } from "gsap/ScrollTrigger";
    import { onMount } from "svelte";
    gsap.registerPlugin(ScrollTrigger);

    let psalms = [
        {
            title: '1',
            category: 'wisdom',
            dateReleased: "17 Oct 2021"
        },
        {
            title: '21',
            category: 'praise',
            dateReleased: "17 Oct 2021"
        },
        {
            title: '119',
            subTitle: 'Gimel',
            category: 'confidence',
            dateReleased: "17 Oct 2021"
        },
        {
            title: '122',
            category: 'kingship',
            dateReleased: "17 Oct 2021"

        },
        {
            title: '139',
            category: 'thanksgiving',
            dateReleased: "17 Oct 2021"
        },
        {
            title: '142',
            category: 'remembrance',
            dateReleased: "17 Oct 2021"
        },
    ]

    function getBackgroundPosition(category){
        if(['confidence','kingship'].includes(category)) return 'right';
        else return 'center';
    }

    let psalmsContainer = null;
    onMount(()=>{
        if(!psalmsContainer) return;
        gsap.to('#psalms-container',{
            scrollTrigger: {
                trigger: '#page-container',
                start: 'top top',
                scrub: true,
                // markers: true,
                end: ()=>psalmsContainer.offsetWidth,
                pin: true,
                invalidateOnRefresh: true,
            },
            x: ()=>-(psalmsContainer.getBoundingClientRect().right-window.innerWidth),
            ease: "none",
            
        });
    });

    gsap.utils.toArray('.fade-in-up').forEach(elem=>{ // TODO: make this work and implement "fade-in-down"
        gsap.fromTo(elem,{
            y: 20, opacity: 0
        },{
            scrollTrigger: elem,
            y: 0, opacity: 1
        });
    });
</script>

<div id="page-container" class="bg-purple-tinted-bg h-[100vh] relative text-on-tinted-bg font-body flex flex-col">
    <TopNav onDarkBackground={true} hideOnScollDown={false}/>

    <div class="container mx-auto max-w-6xl flex flex-col flex-grow px-4">
        <h1 class="font-bold">Explore EveryPsalm</h1>
        <div class="my-2">
            <SongsFilterWidget />
        </div>
        <h1 class="font-display2 text-4xl">Thanksgiving Psalms about Jesus</h1>
        <!-- <div class="w-full overflow-hidden"> -->

            <div bind:this={psalmsContainer} id="psalms-container" class="flex-grow flex w-fit items-center">
                {#each psalms as psalm,i}
                    <!-- <a href="#/explore" class={"group h-[200px] w-[100px] "+`bg-[url('/site-assets/covers/${psalm.category}.jpg')]`}> -->
                    <a href="#/explore" class={"group h-[250px] w-[150px] mx-16 bg-cover rounded-full flex flex-col justify-between items-center shadow-lg"+(i%2==0 ? ' shift-down fade-in-up' : ' shift-up fade-in-down')}
                    style={`background-image: url(/site-assets/covers/${psalm.category}.jpeg); background-position: ${getBackgroundPosition(psalm.category)}`}>
                        <svg viewBox="0 0 500 500">
                            <path class="fill-[rgba(0,0,0,0)]" id="curve" d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97" />
                            <text class="text-5xl fill-on-tinted-bg stroke-on-tinted-bg" width="500">
                              <textPath alignment-baseline="top" xlink:href="#curve">
                                {psalm.dateReleased}
                              </textPath>
                            </text>
                        </svg>
                        <span class="text-8xl font-display1">{psalm.title}</span>
                    </a>
                {/each}
            </div>
        <!-- </div> -->
    </div>
    <div class="absolute bottom-4 left-8 flex">
        <span class="mr-2">Scroll down</span>
        <svg width="61" height="27" viewBox="0 0 61 27" fill="none" xmlns="http://www.w3.org/2000/svg"
        class="min-w-[61px] stroke-on-tinted-bg">
            <line y1="13.5" x2="46" y2="13.5" stroke-width="3"/>
            <path d="M60 13.5C55.8333 12.8333 47 9.4 45 1" stroke-width="3"/>
            <path d="M60 14C55.8333 14.6667 47 18.1 45 26.5" stroke-width="3"/>
        </svg>
    </div>
</div>

<style>
    .shift-up {
        /* transform: translateY(-25%); */
        margin-top: -5%;
    }
    .shift-down {
        /* transform: translateY(25%); */
        margin-bottom: -5%;
    }
</style>