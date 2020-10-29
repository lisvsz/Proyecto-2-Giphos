// Visualización de las diferentes secciones

//Exportar variables
//import {myG} from './myGifos';

//Variables secciones

const navfav = document.getElementById("favorites");
const favsection = document.getElementById("fav");
const navmine =document.getElementById("mygifos");
const minesection = document.getElementById("mine");
const navcreate = document.getElementById("createGif");
const createsection = document.getElementById("create");
const searchsection = document.getElementById("container-search");
const gallerysection = document.getElementById("gallery");
const logomain = document.getElementById("principal");

//Mostrar sección 'Favoritos'
navfav.addEventListener('click', () => {
    if(favsection.style.display === "none"){
        favsection.style.display = "block";
        minesection.style.display = "none";
        searchsection.style.display = "none";
        createsection.style.display = "none";
    }
    else{
        favsection.style.display = "block";
        gallerysection.style.display = "block";
    }
})
//Mostrar sección 'Mis Gifos'  ////////DEBO LLAMAR A LA FUNCIÓN QUE TRAE LOS GIFS
navmine.addEventListener('click', () => {
    if(minesection.style.display === "none"){
        favsection.style.display = "none";
        minesection.style.display = "block";
        searchsection.style.display = "none";
        createsection.style.display = "none";
    }
    else{
        minesection.style.display = "block";
        gallerysection.style.display = "block";
    }
    ////// MIS GIFOS
    /*let ids = localStorage.getItem("NuevosGifos");
    fetch(`https://api.giphy.com/v1/gifs?PlzoJMPs7k0ixQrxRj53HDBKPN2s0zqT&ids=${ids}`).then(response => response.json())
    .then(json => {

        let arrayMyG = json.data;

        arrayMyG.forEach(value) => {

        }

    let myGifs = JSON.parse(window.localStorage.getItem("myGifs"));
    console.log(myGifs);*/


})
//Mostrar sección 'Crear mi Gifo'
navcreate.addEventListener('click', () => {
    if(createsection.style.display === "none"){
        favsection.style.display = "none";
        minesection.style.display = "none";
        searchsection.style.display = "none";
        gallerysection.style.display = "none";
        createsection.style.display = "block";
    }
    else{
        createsection.style.display = "block";
    }
})
//Mostrar la pantalla inicial
logomain.addEventListener('click', () => {
    if(searchsection.style.display === "none"){
        favsection.style.display = "none";
        minesection.style.display = "none";
        searchsection.style.display = "block";
        gallerysection.style.display = "block";
        createsection.style.display = "none";
    }
    else{
        searchsection.style.display === "block";
        gallerysection.style.display = "block";
    }
})

// Dark mode

function darkMode() {
    const btnSwitch = document.getElementById("switch");
    btnSwitch.addEventListener("click", function dark() {
        document.body.classList.toggle("dark");
    });
}

darkMode();