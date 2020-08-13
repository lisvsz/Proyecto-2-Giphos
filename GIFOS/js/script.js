// Dark mode :)

const btnSwitch = document.getElementById("switch");

btnSwitch.addEventListener("click", function dark() {
    document.body.classList.toggle("dark");
});

//Cambiar icono búsqueda a dark
    /*let iconsearch = document.getElementById("iconsearch");
    function searchcolor(iconsearch){
    if(dark){
        iconsearch.src="assets/icon-search-mod-noc.svg";
    } else{
        iconsearch.src="assets/icon-search.svg";
    }
}*/

// Mostrar secciones :|

const navfav = document.getElementById("favorites");

navfav.addEventListener('click', function favorites(){
    const favsection = document.getElementById("fav");
    const minesection = document.getElementById("mine");
    const searchsection = document.getElementById("search");

    if(favsection.style.display === "none"){
        favsection.style.display = "block";
        minesection.style.display = "none";
        searchsection.style.display = "none";
    }
    else{
        favsection.style.display = "none";
    }
})

const navmine =document.getElementById("mygifos");

navmine.addEventListener('click', function mygifos(){
    const favsection = document.getElementById("fav");
    const minesection = document.getElementById("mine");
    const searchsection = document.getElementById("search");

    if(minesection.style.display === "none"){
        favsection.style.display = "none";
        minesection.style.display = "block";
        searchsection.style.display = "none";
    }
    else{
        minesection.style.display = "none";
    }
})

/*let searchsection = document.getElementById("search");

let favsection = document.getElementById("fav");
let navfav = document.getElementById("favorites");

let minesection = document.getElementById("mine");
let navmine = document.getElementById("mygifos");

navfav.addEventListener('click', function(){
    searchsection.style.display = "none";
    minesection.style.display = "none";
})

navmine.addEventListener('click', function(){
    searchsection.style.display = "none";
    favsection.style.display = "none";
})*/


//Llamar API

let apiKey = 'PlzoJMPs7k0ixQrxRj53HDBKPN2s0zqT';
let searchInput = document.getElementById('search');
let btnSearch = document.getElementById('btnsearch')


// Botones búsqueda

btnSearch.addEventListener('click', () => {
    searchByApiKey();
});
searchInput.addEventListener('keyup', () => {
    if (event.which === 13 || event.keyCode == 13){
        searchByApiKey();
    }
})

/**
 * Funcion que nos sirve para hacer el llamado a la API KEY
 * @param {*} searchInput este parámetro es proporcionado por el usuario
 */
async function searchByApiKey(searchInput){
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchInput}&limit=12&offset=0&rating=g&lang=es`;
    let resp = await fetch(url);
    let info = await resp.json();
    console.log(info);
    return info;
}
let info = searchByApiKey(searchInput.value);
// Tercer intento obtener imagenes
    // For para obtener imagenes
    searchByApiKey(searchInput).then(info =>{
        for(let i=0; i<12; i++){   
    //Obtener imagenes
        let imgGif = info.data[i].images.downsized.url;
        let searchGif = document.createElement('img');    
        searchGif.src = imgGif;
        let searchResults = document.getElementById('container-search');
        searchResults.appendChild(searchGif);
        searchGif.style.height = "120px";
        searchGif.style.width = "156px";
    }
});
searchByApiKey(searchInput);

/* segundo intento let gifResult = searchByApiKey();

gifResult.then(info => {
    let gifImg = document.createElement('img');
    gifImg.setAttribute('src', info.data[1].images);
    gifImg.style.width= '156px';
    gifImg.style.height = '120px';
    results.appendChild(gifImg);
    console.log(info);
}).catch(err =>{
    console.error('Error', err);
}) */



/*function showResultApi(){
    //console.log(':D');
    let information = searchByApiKey(searchInput.value);
    information.then(response => {
        console.log(response.data);
        //imprimir en pantalla
        let fig = document.createElement('figure');
        let gifsearch = document.createElement('img');
        gifsearch.src = response.data[0].images.downsized.url;
        results.appendChild(img);
        let results = document.getElementsById('container-search');
        results.inserAdjacentElement('afterbegin', fig);
    }) .catch(error => {
    console.log(error);
        alert('No se encontraron resultados');
    });
}*/

// Sección trendings

async function trendingByApiKey(){
    let url = `https://api.giphy.com/v1/trending/searches?api_key=${apiKey}`;
    let respT = await fetch(url);
    let infoT = await respT.json();
    console.log(infoT);
    return infoT;
}
    //Reflejar 'trending topics' en HTML

    trendingByApiKey().then(infoT =>{
        for(let i= 0; i<5; i++){ 
            let trendingTopic = infoT.data;
            trendingTopic.length = 5;
            console.log(trendingTopic);
            let trendingSection = document.getElementById('trendingSection');
            trendingSection.innerHTML = (trendingTopic + ',');
        }
    });

    //Reflejar 'trending gifs' en HTML

    /*async function trendingGifByApiKey(){
        let url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=12&rating=g`;
        let respTGif = await fetch(url);
        let infoTGif = await respTGif.json();
        console.log(infoTGif);
        return infoTGif;
    }
    trendingGifByApiKey().then(infoTGif =>{
        for(let i= 0; i<8; i++){ 
            let trendingSlider = document.getElementById('trending-slider');

        }
    });*/