<script>

    const navLinks = [
        {
            displayName: "Home",
            href: "#/"
        },
        {
            displayName: "Explore",
            href: "#/"
        },
        {
            displayName: "More",
            href: "#/"
        }
    ]
</script>
<nav class="flex justify-between mx-8 my-4">
    <div>
        <a href={navLinks[0].href}>Brand</a>
    </div>
    <div>
        <ul>
            {#each navLinks as link }
                <li><a href={link.href}>{link.displayName}</a></li>
            {/each}
        </ul>
    </div>
</nav>