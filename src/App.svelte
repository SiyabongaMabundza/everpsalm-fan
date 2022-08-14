<script>
  import Router from 'svelte-spa-router';
  import routes from './router';
</script>

<main class="w-full overflow-x-hidden">
  <Router {routes}/>
</main>