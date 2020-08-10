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
let btnSearch = document.getElementById('btnsearch');
let results = document.getElementsByClassName('container-search');

async function search(){
    //console.log(':D');
    async function newSearch(thing){
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURI(thing)}&limit=12&offset=0&rating=g&lang=en`;
        const resp = await fetch(url);
        const info = resp.json;
        return info;
    }
    let info = newSearch(searchInput.data);
    info.then(response => {
        console.log(response.data);
}) .catch(error => {
    console.log(error);
});
}
btnSearch.addEventListener('click', () => {
    search();
});
searchInput.addEventListener('keyup', () => {
    if (event.which === 13 || event.keyCode == 13){
        search();
    }
})
