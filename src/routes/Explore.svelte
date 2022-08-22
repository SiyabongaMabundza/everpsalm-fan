<script>
  import TopNav from "../lib/TopNav.svelte";
  import SongsFilterWidget from "../lib/SongsFilter/Widget.svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { querystring } from "svelte-spa-router";
  import { onMount, onDestroy } from "svelte";
  import fetchData from "../lib/fetchData";
  gsap.registerPlugin(ScrollTrigger);

  let unSubs = [];

  let psalms = [];

  function getBackgroundPosition(category) {
    if (["confidence", "kingship"].includes(category)) return "right";
    else return "center";
  }

  let scrollTweenObject = null;
  var onResize = function (psalmsContainer,options) {

    function destroyTween(){
        // destroy the tween
        console.log("removing horizontal scroll...");
        if(!scrollTweenObject) return;
        scrollTweenObject.scrollTrigger.kill();
        scrollTweenObject.kill();
        scrollTweenObject = null;
    }

    return function () {
      const vw = window.innerWidth;
    
      if(options && options.resetFirst==true){
        destroyTween();
      }

      if (vw >= 640 && !scrollTweenObject) {
        console.log("activating horizontal scroll...");
        scrollTweenObject = gsap.to("#psalms-container", {
          scrollTrigger: {
            trigger: "#page-container",
            start: "top top",
            scrub: true,
            // markers: true,
            end: () => psalmsContainer.offsetWidth,
            pin: true,
            invalidateOnRefresh: true,
          },
          x: () =>
            -(
              psalmsContainer.getBoundingClientRect().right - window.innerWidth
            ),
          ease: "none",
        });
      } else if (vw < 640 && scrollTweenObject) {
        destroyTween();
      }
    };
  };

  let psalmsContainer = null;
  onMount(async () => {
    if (!psalmsContainer) return;
    window.addEventListener("resize", onResize(psalmsContainer));
    unSubs.push(querystring.subscribe((qString) => setupPsalms(qString)));
  });

  onDestroy(()=>{
    unSubs.forEach(unSub=>unSub());
  });

  async function setupPsalms(querystring) {
    const searchParams = new URLSearchParams(querystring);
    let filterObj = {
      category: searchParams.has("category")
        ? searchParams.get("category")
        : undefined,
      occasion: searchParams.has("occasion")
        ? searchParams.get("occasion")
        : undefined,
    };
    psalms = await fetchPsalmsAndFilterBy(filterObj);
    console.log("got psalms: ", psalms);
    // setTimeout to fix: gsap scrolling backwards bug
    setTimeout(() => {
      // setup gsap horizontal scroll
      onResize(psalmsContainer,{resetFirst:true})();
    });
  }

  async function fetchPsalmsAndFilterBy(fieldsObj) {
    const data = await fetchData.allPsalms();
    console.log({ data });
    let filteredData = data.filter((psalm) => {
      let pass = true;

      if (fieldsObj.category) {
        if (psalm.category != fieldsObj.category) pass = false;
      }

      if (fieldsObj.occasion) {
        if (!Array.isArray(psalm.occasions) || !psalm.occasions.includes(fieldsObj.occasion)) pass = false;
      }

      return pass;
    });
    return filteredData;

    //         setTimeout(() => {
    //             resolve([{
    //    "category": "wisdom",
    //    "stream-url": "https://static1.squarespace.com/static/5d828ef0eebdfb083485b0c4/t/5ee7dd3210ad0b75d55b48fd/1592253775320/Psalm001.mp3/original/Psalm001.mp3",
    //    "date-released": "1 Jan 2020",
    //    "name": "Psalm 1",
    //    "psalm-number": 1,
    //    "lyrics": "on your holy mountain you have placed your chosen king\non the throne of zion still you proclaim\n\ni will tell of the decree the lord said to me\nyou are my son today i have begotten you\n\nask of me…\n\nand i will make the nations your heritage \nthe ends of the earth your possession\nyou shall break them with a rod of iron \nand dash them to pieces dash them to pieces\n\non your holy mountain you have placed your chosen king\nso serve with the lord with fear and rejoice with trembling\n\nblessed are all who take refuge in\nblessed are all who take refuge in him\n\nDownload the lyrics/chords\n\noh the joy, the joy, the joy\nof those who delight in the law of the lord\noh the joy, the joy, the joy of those\nwho meditate day and night in the law of the lord\n\nlet all my delight be only in\nyour sweet and right instruction\n\nlike trees along the river with leaves that never wither\n\neverything they do will prosper in you\n\nDownload the lyrics/chords"
    //  },
    //  {
    //    "category": "kingship",
    //    "stream-url": "https://static1.squarespace.com/static/5d828ef0eebdfb083485b0c4/t/5ee7de3c6626e809642c3d49/1592254044102/Psalm002.mp3/original/Psalm002.mp3",
    //    "date-released": "8 Jan 2020",
    //    "name": "Psalm 2",
    //    "psalm-number": 2,
    //    "lyrics": "on your holy mountain you have placed your chosen king\non the throne of zion still you proclaim\n\ni will tell of the decree the lord said to me\nyou are my son today i have begotten you\n\nask of me…\n\nand i will make the nations your heritage \nthe ends of the earth your possession\nyou shall break them with a rod of iron \nand dash them to pieces dash them to pieces\n\non your holy mountain you have placed your chosen king\nso serve with the lord with fear and rejoice with trembling\n\nblessed are all who take refuge in\nblessed are all who take refuge in him\n\nDownload the lyrics/chords"
    //  },
    //  {
    //    "category": "lament",
    //    "stream-url": "https://static1.squarespace.com/static/5d828ef0eebdfb083485b0c4/t/5ee7dea1db3b8842f57b2f39/1592254143260/Psalm003.mp3/original/Psalm003.mp3",
    //    "date-released": "15 Jan 2020",
    //    "name": "Psalm 3",
    //    "psalm-number": 3,
    //    "lyrics": "you oh lord are a shield around me\nyou oh lord are my only glory\ni cried out and you heard my story\nand you answered and you answered\n\ni slept in fear but i woke in safety\nfor you oh lord are always watching over me\nthough ten thousand though ten thousand stand against me\nyou answered oh you answered\n\nsalvation belongs to only you god\narise oh lord arise oh lord"
    //  },
    //  {
    //    "category": "lament",
    //    "stream-url": "https://static1.squarespace.com/static/5d828ef0eebdfb083485b0c4/t/5ee7def0b5e129712dacc801/1592254221520/Psalm004.mp3/original/Psalm004.mp3",
    //    "date-released": "22 Jan 2020",
    //    "name": "Psalm 4",
    //    "psalm-number": 4,
    //    "lyrics": "how long how long will you be absent\nhow long how long will we be troubled\nhow long how long will you be silent\nhow long how long will we be ruined\n\nhow long how long will it be this way\nhow long how long will my honor be turned into shame\nwill my words be all lies and in vain\nhow long how long will i offer up wrong sacrifice\nand expect to walk out in the light\nhow long how long how long\n\nbut i can be sure of this\nthe lord will answer when i call to him\n\nDownload the lyrics/chords"
    //  },
    //  {
    //    "category": "lament",
    //    "stream-url": "https://static1.squarespace.com/static/5d828ef0eebdfb083485b0c4/t/5ee7df4f45a1d73fa27acd85/1592254323424/Psalm005.mp3/original/Psalm005.mp3",
    //    "date-released": "29 Jan 2020",
    //    "name": "Psalm 5",
    //    "psalm-number": 5,
    //    "lyrics": "give ear to my words lord consider my groaning\ngive ear to the sound of my cry oh kind king oh god of mine\n\noh lord in the morning you hear my voice\nin the morning i wake and you see my dawn’s sacrifice\n\nthrough the abundance of your steadfast love\ni’ll enter your house lord bow down toward\nyour holy temple in good fear of you\nlead on oh lord make your way straight before me\n\nlet all who take refuge in you\nrejoice, rejoice, rejoice\n\nlet them ever sing\nlet them ever sing\nlet them ever sing\nfor joy joy joy"
    //  },
    //  {
    //    "category": "lament",
    //    "stream-url": "https://static1.squarespace.com/static/5d828ef0eebdfb083485b0c4/t/5e165d5155e29a4f52beb0f1/1578524003979/Psalm006.mp3/original/Psalm006.mp3",
    //    "date-released": "5 Feb 2020",
    //    "name": "Psalm 6",
    //    "psalm-number": 6,
    //    "lyrics": "lord don’t rebuke me in your anger\ndon’t discipline me in your wrath\nbe gracious lord for i am weak and\nmy bones shake at the thought of it\n i’m sick at heart sick at heart\noh lord how long lord how long\n\nreturn oh lord and rescue\nwon’t you save me for you’re faithful\nwhat dead man can remember you\nwho can lift their praise from sheol\nwhile tears dampen my pillow\nmy beds a lake of sorrows\nmy eyes are swollen shut lord\nfrom the ocean of my cries\n\nbut the lord has heard the sound of my weeping\nthe lord has heard my cry for his help\nthe lord accepts my prayer no matter how its broken\nthe lord will make my enemies turn and run\n\nDownload the lyrics/chords"
    //  }])
    //         }, 1000);
  }

  gsap.utils.toArray(".fade-in-up").forEach((elem) => {
    // TODO: make this work and implement "fade-in-down"
    gsap.fromTo(
      elem,
      {
        y: 20,
        opacity: 0,
      },
      {
        scrollTrigger: elem,
        y: 0,
        opacity: 1,
      }
    );
  });
</script>

<div
  id="page-container"
  class="bg-purple-tinted-bg min-h-[100vh] relative text-on-tinted-bg font-body flex flex-col"
>
  <TopNav onDarkBackground={true} hideOnScollDown={false} />

  <div class="container mx-auto max-w-6xl flex flex-col flex-grow px-4">
    <h1 class="font-bold">Explore EveryPsalm</h1>
    <div class="my-2">
      <SongsFilterWidget />
    </div>
    <h1 class="font-display2 text-4xl">Thanksgiving Psalms about Jesus</h1>
    <!-- <div class="w-full overflow-hidden"> -->

    <div
      bind:this={psalmsContainer}
      id="psalms-container"
      class="flex-grow flex flex-col sm:flex-row w-fit items-center"
    >
      {#each psalms as psalm, i}
        <!-- <a href="#/explore" class={"group h-[200px] w-[100px] "+`bg-[url('/site-assets/covers/${psalm.category}.jpg')]`}> -->
        <a
          href={"#/explore/" + psalm.name}
          class={"relative sm:mr-36 items-center group h-[250px] w-[300px] sm:w-[150px] hover:w-[300px] transition-all duration-300 my-8 sm:my-0" +
            (i % 2 == 0
              ? " sm:shift-down fade-in-up"
              : " sm:shift-up fade-in-down")}
        >
          <div
            class="absolute z-10 left-0 h-[250px] w-[150px] bg-cover rounded-full flex flex-col justify-between items-center shadow-lg"
            style={`background-image: url(/site-assets/covers/${
              psalm.category
            }.jpeg); background-position: ${getBackgroundPosition(
              psalm.category
            )}`}
          >
            <svg viewBox="0 0 500 500">
              <path
                class="fill-[rgba(0,0,0,0)]"
                id="curve"
                d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97"
              />
              <text
                class="text-5xl fill-on-tinted-bg stroke-on-tinted-bg"
                width="500"
              >
                <textPath alignment-baseline="top" xlink:href="#curve">
                  {psalm["date-released"]}
                </textPath>
              </text>
            </svg>
            <span class="text-8xl font-display1">{psalm["psalm-number"]}</span>
          </div>
          <div
            class="absolute z-0 top-[50%] translate-y-[-50%] pl-2 right-0 w-[150px] max-h-[150px] overflow-y-clip ml-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <span class="text-3xl font-bold block">{psalm.name}</span>
            <span>{psalm.lyrics}</span>
          </div>
        </a>
      {/each}
    </div>
    <!-- </div> -->
  </div>
  <div class="absolute bottom-4 left-8 hidden sm:flex">
    <span class="mr-2">Scroll down</span>
    <svg
      width="61"
      height="27"
      viewBox="0 0 61 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="min-w-[61px] stroke-on-tinted-bg"
    >
      <line y1="13.5" x2="46" y2="13.5" stroke-width="3" />
      <path d="M60 13.5C55.8333 12.8333 47 9.4 45 1" stroke-width="3" />
      <path d="M60 14C55.8333 14.6667 47 18.1 45 26.5" stroke-width="3" />
    </svg>
  </div>
</div>

<style>
  @media (min-width: 640px) {
    .sm\:shift-up {
      /* transform: translateY(-25%); */
      margin-top: -150px;
    }
    .sm\:shift-down {
      /* transform: translateY(25%); */
      margin-bottom: -150px;
    }
  }
</style>
