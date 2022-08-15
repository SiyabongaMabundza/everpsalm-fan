<script>
    let listenLinks = [
        {
            iconName: 'icons8-amazon-music-50.svg',
            altText: 'Amazon Music logo',
            href: 'https://music.amazon.com/artists/B00KJLQN3S/poor-bishop-hooper?marketplaceId=ATVPDKIKX0DER&musicTerritory=US'
        },
        {
            iconName: 'icons8-spotify-50.svg',
            altText: 'Spotify logo',
            href: 'https://open.spotify.com/artist/7AgYdpiGbObyY3WVJXxhi0?si=cPMqY-aIQ0mjJARwZdXSfg'
        },
        {
            iconName: 'icons8-apple-music-50.svg',
            altText: 'Apple Music logo',
            href: 'https://open.spotify.com/artist/7AgYdpiGbObyY3WVJXxhi0?si=cPMqY-aIQ0mjJARwZdXSfg'
        },
        {
            iconName: 'icons8-youtube-50.svg',
            altText: 'YouTube logo',
            href: 'https://open.spotify.com/artist/7AgYdpiGbObyY3WVJXxhi0?si=cPMqY-aIQ0mjJARwZdXSfg'
        },
    ];

    let socialLinks = [
        {
            iconName: 'icons8-instagram-50.svg',
            altText: 'Instagram logo',
            href: 'https://www.instagram.com/poorbishophooper/'
        },
        {
            iconName: 'icons8-facebook-50.svg',
            altText: 'Facebook logo',
            href: 'https://www.facebook.com/poorbishophooper/'
        },
    ]
</script>

<footer class="text-on-tinted-bg bg-[#623B5A] p-10">
    <div class="md:flex justify-center text-on-tinted-bg">
        <p class="max-w-sm md:mr-8">This website is only a fan website. As such, it is not affiliated, associated, authorised, endorsed by, or in any way officially connected with Poor Bishop Hooper or the EveryPsalms project. <br><br>
            Poor Bishop Hooper reserves complete copyright for all music content presented on this website. Visit the official EveryPsalms project website at
            <a href="https://www.everypsalm.com/" class="font-bold hover:underline">https://www.everypsalm.com/</a></p>
        <div class="mt-8 md:mt-0">
            <div class="mb-4">
                Listen on your favourite platform
                <ul class="flex">
                    {#each listenLinks as link}
                    <li class="transition-transform hover:-translate-y-1"><a class="w-6 h-6" href={link.href}><img class="w-full max-w-full" src={'/icons-on-dark/'+link.iconName} alt={link.altText}></a></li>
                    {/each}
                </ul>
            </div>
            <div class="mb-4">
                Follow PoorBishopHooper
                <ul class="flex">
                    {#each socialLinks as link}
                    <li class="transition-transform hover:-translate-y-1"><a class="w-6 h-6" href={link.href}><img class="w-full max-w-full" src={'/icons-on-dark/'+link.iconName} alt={link.altText}></a></li>
                    {/each}
                </ul>
            </div>
        </div>
    </div>
    <div class="text-center mt-8">Copyright &copy; <a href="https://www.oksiya.net/" class="font-bold hover:underline">Siya Mabundza</a></div>
</footer>