<script>
  import siteLogoOnDark from "../assets/logo--on-dark.svg";
  import { link } from "svelte-spa-router";
  import active from "svelte-spa-router/active";

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
</script>

<nav class="flex justify-between mx-8 my-4 text-on-light-bg items-stretch">
  <div>
    <a href={navItems[0].href}>
      <img
        src={siteLogoOnDark}
        alt="EveryPsalm: An Unofficial fan website"
        class="max-w-[10rem]"
      />
    </a>
  </div>
  <div class="font-body">
    <ul class="h-full flex items-stretch">
      {#each navItems as item}
        <li class="mx-2">
          <a
            class="h-full px-4 hover:text-secondary flex items-center"
            use:link
            use:active={{path: item.activePath, className: 'underline text-secondary'}}
            href={item.href}>{item.displayName}</a
          >
        </li>
      {/each}
    </ul>
  </div>
</nav>
