<script>
    import { fly } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let options = [];
    export let defaultOption = {name:'(None)',description: ''};
    export let prefix='';
    export let startingOptionIndex = -1;

    let selectedName = defaultOption.name;
    const DEFAULT_OPTION_INDEX = 0;
    let showSelectedIndex = DEFAULT_OPTION_INDEX;

    $: displayOptions = [defaultOption, ...options];

    $: {
        if(startingOptionIndex>=0 && startingOptionIndex < options.length){
            selectedName = options[startingOptionIndex].name;
            showSelectedIndex = startingOptionIndex+1;
        }
    }

    let showOptions = false;

    function openOptions(){
        showOptions = true;
    }
    function closeOptions(){
        showOptions = false;
    }

    function selectOption(index) {        
        // -1 because the index choices get shifted up to fit in the default choice
        dispatch('select',index - 1);
        
        showSelectedIndex = index;
        selectedName = displayOptions[index].name;
        closeOptions();
    }

    function shortenStr(text){
        const MAX_LENGTH = 160;
        if(text.length>MAX_LENGTH) return text.substring(0,MAX_LENGTH)+'...';
        return text;
    }

    function selectDefaultOption(){
        selectOption(0);
    }
</script>
{#if showOptions}
<!--invisible backdrop overlay-->
<div on:click={closeOptions} class="absolute top-0 bottom-0 left-0 right-0 z-40"></div>
{/if}

<div class="relative">
    <button on:click={openOptions} class="text-on-light-bg rounded pl-4 pr-2 py-2 flex items-center"
    style={(showSelectedIndex==DEFAULT_OPTION_INDEX)?'background-color: #FEE2D6; color: rgba(0,0,0,.4) ':'background-color: #F3C4B0;'}>
        {prefix}{selectedName}
        <div class="h-6 w-6 mx-1"><img src="/site-assets/icons/on-light/expand_more.svg" alt="close icon"></div>
        {#if showSelectedIndex!=0}
        <button on:click|stopPropagation={selectDefaultOption} class="hover:-translate-y-1 transition-transform">
            <div class="h-6 w-6 mx-1"><img src="/site-assets/icons/on-light/close.svg" alt="close icon"></div>
        </button>
        {/if}
    </button>
    {#if showOptions}
    <div transition:fly={{ y: -10, duration: 500 }} class="bg-[rgba(255,247,232,.9)] text-on-light-bg absolute z-50 max-h-[400px] overflow-y-scroll mt-2 rounded">
        <ul>
            {#each displayOptions as option,index}
            <li>
                <button on:click={()=>selectOption(index)} class="hover:bg-white-light-bg w-[300px] p-4" style={showSelectedIndex==index?'background-color: #FFF7E8':''}>
                    <div class="flex flex-col items-start">
                        <span class="font-bold capitalize">
                            {#if showSelectedIndex==index}
                                &rarr;
                            {/if}
                            {option.name}
                        </span>
                        <span class="text-sm text-left">{shortenStr(option.description)}</span>
                    </div>
                </button>
            </li>
            {/each}
        </ul>
    </div>
    {/if}
</div>