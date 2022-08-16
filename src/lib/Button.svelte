<script>
    export let label = 'Button';

    export let type = 'primary';

    export let href = null;
    $: showArrowOutIcon = href!=null && /\./gm.test(href);

    $: elementClass = (type=='primary'?'bg-primary text-on-tinted-bg':
        (type=='primary-outline'?'border-primary border-2 text-primary':''))+' flex items-center w-fit px-4 py-2 mt-1 transition-transform hover:-translate-y-1';
    
    $: iconType = type=='primary'?'on-dark':(type=='primary-outline'?'primary':'');
</script>

{#if href!=null}
<a {href} class={elementClass}>
    {label}
    {#if showArrowOutIcon}<img class="w-4 md:w-8 h-4 md:h-8" src={`/site-assets/icons/${iconType}/arrow_outward.svg`} alt="arrow outward icon">{/if}
</a>
{:else}
<button class={elementClass}>
    {label}
</button>
{/if}