const fetchData = {
    allPsalms: ()=>{
        return new Promise((resolve,reject)=>{
            fetch('/site-assets/data/everypsalm-songs.json') // TODO: set cache header to cache for a day
            .then((response) => response.json())
            .then(resolve);
        });
    }
};

export default fetchData;