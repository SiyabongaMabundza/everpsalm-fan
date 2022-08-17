<script>
  import siteLogoOnDark from "../assets/images/logo--on-dark.svg";
  import siteLogoOnLight from "../assets/images/logo--on-light.svg";
  import { link, location } from "svelte-spa-router";
  import { fly, fade } from 'svelte/transition';
  import active from "svelte-spa-router/active";
  // import MusicPlayer from "./MusicPlayer.svelte";
  import MusicPlayerWidget from './MusicPlayer/Widget.svelte';
  import {getStore as getScrollEventStore} from './scrollEventStore';
  import { onMount } from "svelte";

  export let onDarkBackground = false;
  export let hideOnScollDown = true;

  let topNavElement = null;
  let topNavHeight = 0; // used to reserve the space this component would've taken if it wasn't position: fixed
  onMount(()=>{
    if(topNavElement) topNavHeight = topNavElement.offsetHeight;
  });
  const navItems = [
    {
      displayName: "Home",
      href: "/",
      activePath: "/",
    },
    {
      displayName: "Explore",
      href: "/explore",
      activePath: "/explore/*",
    },
    {
      displayName: "More",
      href: "/more",
      activePath: "/more",
    },
  ];

  let showMobileMenu = false;
  function openMobileMenu() {
    showMobileMenu = true;
  }
  function closeMobileMenu() {
    showMobileMenu = false;
  }

  let showTopNavBasedOnScrollPosition = true;
  let showTopNavBackground = false;

  if(hideOnScollDown)
  getScrollEventStore().subscribe(val=>{ //TODO: unsubscibe onDestroy
    // console.log('scroll: ', val)
    if(val.includes('isGoingDown') && !val.includes('atTop')) showTopNavBasedOnScrollPosition = false;
    else if(val.includes('isGoingUp')) showTopNavBasedOnScrollPosition = true;

    if(val.includes('atTop')) showTopNavBackground = false;
    else showTopNavBackground = true;
  });

  $: textHightlightColorClass = (showTopNavBackground||!onDarkBackground ? 'text-primary' : 'text-secondary');
  $: onBgColor = (showTopNavBackground||!onDarkBackground ? 'on-light-bg' : 'on-tinted-bg');
  $: onBgColorClass = (showTopNavBackground||!onDarkBackground ? 'text-on-light-bg' : 'text-on-tinted-bg');
  $: bgColorClass = (showTopNavBackground ? 'bg-white-light-bg' : '');
</script>

<div style={`height: ${topNavHeight}px`}></div>

{#if showTopNavBasedOnScrollPosition}
<nav transition:fly={{ y: -20, duration: 500 }} bind:this={topNavElement}  class={"flex justify-between px-4 py-1 items-stretch fixed top-0 left-0 right-0 z-30 "+onBgColorClass+" "+bgColorClass}>
  <div>
    <a href={navItems[0].href}>
      <img
        src={showTopNavBackground||!onDarkBackground? siteLogoOnLight : siteLogoOnDark}
        alt="EveryPsalm: An Unofficial fan website"
        class="max-w-[10rem]"
      />
    </a>
  </div>
  <div class="hidden lg:block">
    <!-- <MusicPlayer compactMode={true} onDarkBackground={showTopNavBackground||!onDarkBackground?false:true} /> -->
    <MusicPlayerWidget compactMode={true} onDarkBackground={(showTopNavBackground||!onDarkBackground)?false:true} />
  </div>
  <div class="hidden lg:block font-body">
    <ul class="h-full flex items-stretch">
      {#each navItems as item}
        <li class="mx-2">
          <a
            class={"h-full px-4 flex items-center uppercase font-bold "+`hover:${textHightlightColorClass}`+($location==item.href ? ` underline ${textHightlightColorClass}`: '')}
            use:link
            href={item.href}>{item.displayName}</a
          >
        </li>
      {/each}
    </ul>
  </div>
  <div class="lg:hidden">
    <button on:click={openMobileMenu}><span class="sr-only">Open menu</span>
      <svg class={`fill-${onBgColor}`} xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M6 36v-3h36v3Zm0-10.5v-3h36v3ZM6 15v-3h36v3Z"/></svg>
    </button>
    {#if showMobileMenu}
      <div transition:fade on:click={closeMobileMenu} class="fixed top-0 bottom-0 left-0 right-0 z-20 bg-[rgba(0,0,0,.3)]"></div>
      <div transition:fly={{ x: 20, duration: 500 }} class="fixed w-[100vw] sm:w-[80vw] md:w-[50vw] right-0 top-0 bottom-0 bg-white-light-bg text-on-light-bg z-30 py-1 px-4">
        <div class="flex justify-end">
          <button on:click={closeMobileMenu}><span class="sr-only">Close menu</span>
            <svg class={"fill-on-light-bg"} xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z"/></svg>
          </button>
        </div>
        <ul class="flex flex-col items-center">
          {#each navItems as item, i}
            <li transition:fly={{ x: 20, duration: 500, delay: 100*(i+1) }}
            class="mx-2">
              <a
                class="h-full px-4 py-2 hover:text-primary flex items-center uppercase font-bold"
                use:link
                use:active={{path: item.activePath, className: 'underline text-primary'}}
                href={item.href}>{item.displayName}</a
              >
            </li>
          {/each}
        </ul>
        <div transition:fly={{ y: 20, duration: 500, delay: 100*(navItems.length+1) }}
        class="w-full my-4 flex justify-center">
          <!-- <MusicPlayer compactMode={true} onDarkBackground={false}/> -->
          <MusicPlayerWidget compactMode={true} onDarkBackground={false}/>
        </div>
      </div>
    {/if}
  </div>
</nav>
{/if}