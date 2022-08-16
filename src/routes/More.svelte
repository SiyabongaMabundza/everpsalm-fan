<script>
    import TopNav from '../lib/TopNav.svelte';
    import Button from '../lib/Button.svelte';
    import Footer from '../lib/Footer.svelte';
    import familyAtTheTableImage from '../assets/images/family-at-the-table.png';
    import handsAtThePianoImage from '../assets/images/hands-at-the-piano.png';
    import { gsap } from "gsap";
    import { ScrollTrigger } from "gsap/ScrollTrigger";
    gsap.registerPlugin(ScrollTrigger);

    let listenLinks = [
        {
            iconName: 'icons8-amazon-music-50.svg',
            name: 'Amazon Music',
            href: 'https://music.amazon.com/artists/B00KJLQN3S/poor-bishop-hooper?marketplaceId=ATVPDKIKX0DER&musicTerritory=US'
        },
        {
            iconName: 'icons8-spotify-50.svg',
            name: 'Spotify',
            href: 'https://open.spotify.com/artist/7AgYdpiGbObyY3WVJXxhi0?si=cPMqY-aIQ0mjJARwZdXSfg'
        },
        {
            iconName: 'icons8-apple-music-50.svg',
            name: 'Apple Music',
            href: 'https://open.spotify.com/artist/7AgYdpiGbObyY3WVJXxhi0?si=cPMqY-aIQ0mjJARwZdXSfg'
        },
        {
            iconName: 'icons8-youtube-50.svg',
            name: 'YouTube',
            href: 'https://open.spotify.com/artist/7AgYdpiGbObyY3WVJXxhi0?si=cPMqY-aIQ0mjJARwZdXSfg'
        },
    ];

    let artworkPrintImages = [
        'confidence','kingship','lament','praise','rememberance','thanksgiving','wisdom'
    ];

    gsap.to('#artwork-prints',{ //TODO: make this work
            scrollTrigger: {
                trigger: '#artwork-prints',
                start: 'bottom bottom',
                end: 'bottom top',
                scrub: 1,
                // markers: true
            },
            xPercent: -100,
        });
</script>
<div class="bg-white-light-bg font-body">
    <TopNav />
    <section class="container mx-auto max-w-4xl pt-24 pb-16 text-on-light-bg px-4">
        <h1 class="h2">More</h1>
        <div class="relative">
            <h2 class="font-display2 text-center text-on-light-outline-primary text-4xl md:text-8xl lg:text-9xl uppercase whitespace-nowrap absolute top-0 left-[50%] translate-x-[-50%] z-0">This website</h2>
            <div class="md:flex bg-gradient-to-t from-on-tinted-bg to-on-tinted-bg-translucent relative z-10 pt-8 sm:pt-8 md:pt-16">
                <p class="flex-grow basis-0">This website is a fan website made by Siya Mabundza. Its purpose is to emphasise the artistic brilliance and scriptural weight of each individual song from the project.</p>
                <p class="mt-8 md:mt-0 flex-grow basis-0"><a href="https://www.everypsalm.com/" class="font-bold hover:underline">Visit the official EveryPsalms website</a> for a complete view of the project. <br><br>
    
                    <a href="https://www.poorbishophooper.com/" class="font-bold hover:underline">Visit Poor Bishop Hoopers’ official website</a> to learn more about the duet behind EveryPsalms.<br><br>
                    
                    God bless you!</p>
            </div>
        </div>
    </section>
    <section class="container mx-auto max-w-4xl text-on-light-bg my-16 px-4 flex flex-col items-center">
        <h2 class="h1 text-center">The EveryPsalms Project</h2>

        <ul class="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-[600px] mt-16 mb-8">
            {#each listenLinks as link}
            <li class="transition-transform hover:-translate-y-1"><a class="flex flex-col items-center" href={link.href}>
                <div class="w-10 h-10">
                    <img class="w-full max-w-full" src={'/icons-on-light/'+link.iconName} alt={link.name+' icon'}>
                </div>
                <span>
                    {link.name}
                </span>
            </a></li>
            {/each}
        </ul>

        <div class="md:flex justify-between items-center my-16">
                <div class="md:order-2 max-w-md md:ml-8 mb-4 md:mb-0 mx-auto">
                    <img src={familyAtTheTableImage} alt="Poor Bishop Hooper family at the table">
                </div>
            <div>
                <div class="mb-4">
                    <h3 class="h2 mb-2">Support the Project</h3>
                    <p>Poor Bishop Hooper is on a mission to sing all 150 Psalms and release that music for free. Support the EveryPsalms project from as little as $5 to make sure they succeed! Visit the EveryPsalms official website to learn more and make your contribution.</p>
                </div>
                <Button label="Give" href="https://www.everypsalm.com/give" />
            </div>
        </div>

        <div class="md:flex justify-between items-center my-16">
            <div class="max-w-md md:mr-8 mb-4 md:mb-0 mx-auto">
                <img src={handsAtThePianoImage} alt="Poor Bishop Hooper family at the table">
            </div>
            <div>
                <div class="mb-4">
                    <h3 class="h2 mb-2">Subscribe to the Newsletter</h3>
                    <p>Subscribe on the official EveryPsalms website, to be the first to know when a new Psalm is released. Subscribers also get special content like videos, early releases, and more!</p>
                </div>
                <Button label="Subscribe" href="https://www.everypsalm.com/give" />
            </div>
        </div>
    </section>
    <section class="text-on-light-bg my-16">
        <div id="artwork-prints" class="flex">
            {#each artworkPrintImages as image}
            <div class="min-w-[200px]">
                <img src={`/site-assets/art-prints/${image}.jpeg`} alt={`psalm of ${image} art print`}
                class="w-full">
            </div>
            {/each}
        </div>

        <div class="container mx-auto max-w-4xl px-4">
            <div class="flex justify-center my-4">
                <img src="/site-assets/images/lauren-stevens-artist-profile.jpeg" alt="Lauren Stevens artist profile" class="rounded-full h-16 w-16">
            </div>
            <div class="hidden md:flex my-8">
                <p class="flex-grow basis-0 md:mr-4">KC based Lauren Stevens created the album art for EveryPsalm. She crafted original copper etchings for each major Psalm category. Skillfully and thoughtfully crafted, these works </p>
                <p class="flex-grow basis-0">highlight the intricacies, movement, and historical detail of the foundational text, and add another aspect of God’s beauty to the project. Original prints by the artist are available to buy on the EveryPsalms official website!</p>
            </div>
            <div class="md:hidden my-8">
                KC based Lauren Stevens created the album art for EveryPsalm. She crafted original copper etchings for each major Psalm category. Skillfully and thoughtfully crafted, these works highlight the intricacies, movement, and historical detail of the foundational text, and add another aspect of God’s beauty to the project. Original prints by the artist are available to buy on the EveryPsalms official website!
            </div>
            <div class="flex justify-center">
                <div class="mr-2">
                    <Button label="Learn More" type="primary-outline" href="https://www.everypsalm.com/artwork"></Button>
                </div>
                <Button label="Buy the prints" href="https://www.everypsalm.com/prints"></Button>
            </div>
        </div>
    </section>

    <Footer/>
</div>