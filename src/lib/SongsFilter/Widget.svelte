<script>
  import FilterButton from "./FilterButton.svelte";
  import {get} from 'svelte/store';
  import {push, pop, replace, location, querystring} from 'svelte-spa-router';
  import {CATEGORIES, OCCASIONS} from './filter';

  let categories = CATEGORIES;
  let occasions = OCCASIONS;

  // set the starting values from the query params
  const searchParams = new URLSearchParams(get(querystring));
  let selectedCategoryIndex, selectedOccasionIndex;
  selectedCategoryIndex = selectedOccasionIndex = -1;

  if(searchParams.has('category'))
    selectedCategoryIndex = categories.findIndex(cat=>cat.name==searchParams.get('category'));
  if(searchParams.has('occasion'))
    selectedOccasionIndex = occasions.findIndex(cat=>cat.name==searchParams.get('occasion'));

  // functions 
  
  function updatePageQuery(obj){
    const searchParams = new URLSearchParams(get(querystring));

    for(const [key, value] of Object.entries(obj)){
      if(searchParams.has(key) && value==null) searchParams.delete(key);
      else if(searchParams.has(key)) searchParams.set(key,value);
      else searchParams.append(key,value);
    }

    replace(get(location)+'?'+searchParams.toString());
  }

  function filterByCategory(event){
    const index = event.detail;
    if(index>-1) updatePageQuery({category: categories[index].name});
    else updatePageQuery({category: null});
  }
  
  function filterByOccasion(event){
    const index = event.detail;
    if(index>-1) updatePageQuery({occasion: occasions[index].name});
    else updatePageQuery({occasion: null});
  }
</script>

<div class="flex items-center">
  <FilterButton on:select={filterByCategory} startingOptionIndex={selectedCategoryIndex} options={categories} defaultOption={{name: "All", description: "(Choose an option below to filter by Psalm Category.)"}} />
  <span class="mx-2">Psalms</span>
  <FilterButton on:select={filterByOccasion} startingOptionIndex={selectedOccasionIndex} options={occasions} defaultOption={{name: "anything", description: "(Choose an option below to filter by occasion.)"}} prefix="for " />
</div>
