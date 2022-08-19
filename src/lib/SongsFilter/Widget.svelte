<script>
  import FilterButton from "./FilterButton.svelte";
  import {get} from 'svelte/store';
  import {push, pop, replace, location, querystring} from 'svelte-spa-router';

  let categories = [
    {
      name: "praise",
      description:
        "Songs of pure praise to God. These songs are sung when our orientation and relationship with God is stable, calm, and untroubled. Psalms of Praise can be general calls to worship, address God’s rule as creator, or exist as an author’s personal moments of adoration.",
    },
    {
      name: "lament",
      description:
        "Songs and prayers given to God in times of pain. These psalms are presented when our relationship with God is troubled - when we feel distant from him, hurting, or abandoned. Though every Psalm of Lament begins in a generally negative place or position, each one turns back to God in trust and thanksgiving by its end (excluding Psalm 88). Psalms of Lament can be cries of desperation, petitions for aid, or pleas for justice.",
    },
    {
      name: "thanksgiving",
      description:
        "Similar to Psalms of Praise, in that they celebrate God. In doing so however, they share narratives of God’s goodness and typically honor specific things that He has done. This can include heard and answered prayers, stories of deliverance, and God-given victories.",
    },
    {
      name: "confidence",
      description:
        "Describe the author’s trust and faith in God, typically with a central image or theme. Psalm 23 is the primary example, where David compares God to his shepherd.",
    },
    {
      name: "kingship",
      description:
        "Present a king as the major focus. This can be directed at a humanly king, or God as the heavenly King of all creation.",
    },
    {
      name: "remembrance",
      description:
        "Retell the history of God’s presence in humanity,  focusing on acts of salvation and redemption in the past. These psalms turn our hearts toward gratitude as we remember God’s grace in his specific actions, the miraculous, and major historical events.",
    },
    {
      name: "wisdom",
      description:
        "Similar to the ‘Wisdom’ books of the Old Testament (think Proverbs or Ecclesiastes). These psalms provide instruction, both specifically and broadly, on how to live life and exist in relationship with God.",
    },
  ];

  let occasions = [
    {
      name: "gathered-worship",
      description:
        "Whether you are gathering in your living room or leading your church on Sunday, these songs are communal in nature and easy to learn.",
    },
    {
      name: "rest",
      description:
        "The most calm, relaxing and tranquil songs from the project. For when you're getting ready for bed, or just needing a moment to quiet your soul during the day.",
    },
    {
      name: "dancing",
      description:
        "The most upbeat, spirited and snappy songs from the project. Get your day going, have a dance party in the kitchen, or turn up the fun in the car with these uptempo settings of scripture to song.",
    },
  ];

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
