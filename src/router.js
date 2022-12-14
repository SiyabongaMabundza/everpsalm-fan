import Home from './routes/Home.svelte'
import More from './routes/More.svelte';
import Explore from './routes/Explore.svelte';
// import Author from './routes/Author.svelte'
// import Book from './routes/Book.svelte'
// import NotFound from './routes/NotFound.svelte'

const routes = {
    // Exact path
    '/': Home,
    '/more': More,
    '/explore': Explore,

    // Using named parameters, with last being optional
    // '/author/:first/:last?': Author,

    // // Wildcard parameter
    // '/book/*': Book,

    // // Catch-all
    // // This is optional, but if present it must be the last
    // '*': NotFound,
}

export default routes;