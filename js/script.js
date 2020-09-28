// Dark mode :)

function darkMode() {
const btnSwitch = document.getElementById("switch");
btnSwitch.addEventListener("click", function dark() {
    document.body.classList.toggle("dark");
});
}
darkMode();

//LLAMAR API

let searchInput = document.getElementById('search'); //lo ingresado en el input
let search = document.getElementById('search'); // input
let hugeListLine = document.getElementById('hugeListLine') // línea de separación de la barra de búsqueda
let btnSearch = document.getElementById('btnSearch');
let btnClose = document.getElementById('btn-close');
let huge_list = document.getElementById('huge_list');
let searchTitle = document.getElementById('searchTitle');
let gridResults = document.getElementById('grid-search');
let btnMoreSearch = document.getElementById('btn-more-search');
let count = 0; // Indice de los gifs ('ver más')


//Variables API
let apiKey = 'PlzoJMPs7k0ixQrxRj53HDBKPN2s0zqT';


// Botones búsqueda

function lookingForInput(btnSearch, searchInput) {
    btnSearch.addEventListener('click', () => {
        //Visualizar resultado
        searchTitle.innerHTML = searchInput.value;
        searchByApiKey(searchInput.value, 0).then((arrayGifs) =>
            showGifs(arrayGifs)
        );
    });
    searchInput.addEventListener('keyup', () => {
        if (event.which === 13 || event.keyCode == 13){
            //Visualizar resultado
            searchTitle.innerHTML = searchInput.value;
            searchByApiKey(searchInput.value).then((arrayGifs)=>
            showGifs(arrayGifs)
        );
        } else{
            autocompleteByApiKey(searchInput.value).then((arraySugestions)=>{
                console.log('AUTOCOMPLETE');
                processingResults(arraySugestions);
        })}
    })
}

lookingForInput(btnSearch, searchInput);

// Barra de búsqueda - Autocompletar
    //`https://api.giphy.com/v1/trending/searches?api_key=${apiKey}`;
    //https://api.giphy.com/v1/gifs/search/tags?api_key=PlzoJMPs7k0ixQrxRj53HDBKPN2s0zqT&q=korea :)
    //api.giphy.com/v1/gifs/search/tags
    async function autocompleteByApiKey(searchInput){
        let url = `https://api.giphy.com/v1/gifs/search/tags?api_key=${apiKey}&q=${searchInput}&limit=4&rating=g&lang=es`;
        let respA = await fetch(url);
        let infoA = await respA.json();
        console.log(infoA);
        return infoA.data;
    }    
    //llamar al input debe ser el parámetro
    function processingResults(suggestionArray) { //agregué el for
        for (let i=0; i < suggestionArray.length; i++ ) {
        huge_list.innerHTML = "";
        huge_list.classList.add('inputOpen');
        
        //Modificar estilo barra de búsqueda
        search.classList.add('srcOpen');
        hugeListLine.style.display = 'block';

        //console.log('hola');
        suggestionArray.forEach((item) => {
        console.log('Element: ', item.name);
        
        //Modificar ubicación del botón de búsqueda al desplegar lista con opciones
        btnSearch.style.top = '-235px';
        
        // Crear e imprimir en pantalla nueva opción
        let option = document.createElement('li');
        option.value = item.name;
        option.innerHTML = "<img src='assets/icon-search-mod-grey.svg'> " + item.name;
        
        //Modificar ícono de lupa por 'x'   //////// ELIMINAR SI FUNCIONA FUERA DE LA FUNCIÓN
        /*function openClose (searchInput) {
            if(searchInput !== ''){
                btnSearch.style.display = 'none';
                btnClose.style.display = 'inline';
            } else {
                btnSearch.style.display = 'inline';
                btnClose.style.display = 'none';
            }
        }
        openClose(searchInput);*/
        //NO FUNCIONA CORRECTAMENTE - aparece nuevamente el X
        /*btnClose.addEventListener('click', () => {
            searchInput.value == '';
            huge_list.style.display = 'none';
            search.classList.remove('srcOpen');
            btnClose.style.display = 'none';
            btnSearch.style.display = 'inline';
            btnSearch.style.top = '-35px';
        });
        
        openClose(searchInput);*/
        
        //Seleccionar sugerencia, abrirla e imprimirla en pantalla
        option.addEventListener ('click', () => {
            searchByApiKey(item.name).then((arrayGifs)=>
            showGifs(arrayGifs));
            //Reemplazar texto mostrado
            option.style.cursor = 'pointer';
            searchTitle.innerHTML = item.name;
            //Cerrar lista
            huge_list.style.display = 'none';
            hugeListLine.style.display = 'none';
            //Reestablecer bordes del input
            search.classList.remove('srcOpen');
            search.classList.add('src');
            //Mover botón search
            btnSearch.style.top = '-36px';
        })
        
        // Agregar nueva opción
        huge_list.appendChild(option);
        });
        }
    };
    

    //Botón cerrar
    /* function openClose(){  TRABAR EN ELLO
        // Si está abierta cerrarla, si no abierta
        btnClose.addEventListener('click', () => {
            if(searchInput !== ''){
                btnSearch.style.display = 'inline';
                btnClose.style.display = 'none';
                huge_list.style.height = '0px';
            } else {
                btnSearch.style.display = 'none';
                btnClose.style.display = 'inline';
            }
        });
    }; */

/**
 * Funcion que nos sirve para hacer el llamado a la API KEY
 * @param {*} searchInput este parámetro es proporcionado por el usuario
 */
async function searchByApiKey(searchInput, offset){
    //Parámetros para el request
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchInput}&limit=12&offset=${offset}&rating=g&lang=es`;
    let resp = await fetch(url);
    let info = await resp.json();
    console.log(info.data);
    return info.data;
}

//Cuarto intento para mostrar resultados de la búsqueda de Gif's

function showGifs(gifsArray){ 
    for (let i=0; i < gifsArray.length; i++ ) {
        console.log('Element');
        let imgGif = gifsArray[i].images.downsized.url;
        //Título del Gif
        let searchGifTitle = gifsArray[i].title;
        console.log(searchGifTitle);
        //Nombre del usuario del Gif
        let searchGifUser = gifsArray[i].username;
        console.log(searchGifUser);
        //Crear la img, div y contenedor de Gif
        let searchGif = document.createElement('img');    
        searchGif.src = imgGif;
        let cardSGif = document.createElement('div');
        cardSGif.className = 'cardSGif';
        cardSGif.append(searchGif);
        let searchResults = document.getElementById('grid-search');
        searchResults.appendChild(cardSGif);

        //Modificar tamaño gif
            if (window.matchMedia("(min-width: 1366px)").matches) {
                searchGif.style.height = "200px";
                searchGif.style.width = "260px";
                cardSGif.style.height = "200px";
                cardSGif.style.width = "260px";
                //25/08/20 Pintar gif del search input ////falllaaa
                searchGif.addEventListener('mouseover', () => {
                cardSGif.appendChild(hoverSearchedGifs(searchGifUser,searchGifTitle));
                })
            } else {
                searchGif.style.height = "120px";
                searchGif.style.width = "156px";
            }
    }

        //Visualizar área de resultados
        let activeSearch = document.getElementById('activeSearch');
        activeSearch.style.display = "block";     
        
        //Visualizar categoría de búsqueda
        autocompleteByApiKey(searchInput.value);

        //Eliminar resultados de búsquedas ////// NO FUNCIONA
        /*if (gridResults.firstChild !== ''){
            gridResults.removeChild(gridResults.lastChild);
        }*/
};

        //Botón 'Ver más' /////// Nota: reiniciar en función buscador el contador , así como el título
        
        btnMoreSearch.addEventListener('click', () => {
        count += 12;
        searchTitle.innerHTML = searchInput.value;
        searchByApiKey(searchInput.value, count).then((arrayGifs) =>
            showGifs(arrayGifs)
        );
        });

    //PRUEBA MAXIMIZAR TAMAÑO GIF
    /*var x = window.matchMedia("(min-width: 1366px)")
    function myFunction(x) {
        if (x.matches) { // If media query matches
        document.body.style.backgroundColor = "yellow";
        } else {
            document.body.style.backgroundColor = "pink";
        }
    }
      myFunction(x) // Call listener function at run time
      x.addListener(myFunction) // Attach listener function on state changes*/

/*
// Tercer intento obtener imagenes
let info = searchByApiKey(searchInput.value);
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
searchByApiKey(searchInput); */

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
        for(let i= 0; i< 1; i++){ 
            let trendingList = infoT.data;
            trendingList.length = 5;
            console.log(trendingList);
            let trendingSection = document.getElementById('trendingSection');
            //trendingSection.innerHTML = (trendingTopic + ',');
            trendingList.forEach((topic) => {
                console.log(topic);
                let trendingTopic = document.createElement('li');
                trendingTopic.innerHTML = topic + ' ' + ',';
                trendingSection.appendChild(trendingTopic);
                

                //Visualizar resultado del gif en grid
                trendingTopic.addEventListener('click', () => {
                    //Visualizar en barra de búsqueda, buscar gif y visualizarlo
                    console.log(topic);
                    searchTitle.innerHTML = topic;
                    searchByApiKey(topic).then((arrayGifs) =>
                    showGifs(arrayGifs));
                    ///Se debe visualizar en el search input autocompleteByApiKey(searchInput.value);
                })
            })
        }

    });

    //Reflejar 'trending gifs' en HTML

    async function trendingGifByApiKey(){
        let url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=20&rating=g`;
        let respTGif = await fetch(url);
        let infoTGif = await respTGif.json();
        console.log(infoTGif);
        return infoTGif;
    }
    trendingGifByApiKey().then(infoTGif =>{
        for(let i= 0; i<20; i++){ 
            var trendingGif = infoTGif.data[i].images.downsized.url;
            console.log(trendingGif);
            let userTGif = infoTGif.data[i].username;
            let titleTGif = infoTGif.data[i].title;
            let imgGif = document.createElement('img');
            imgGif.src = trendingGif;
            let cardTGif = document.createElement('div');
            cardTGif.className = 'cardTGif';
            //cardTGif.classList.add = 'modalContainer'; //se añade clase para el contenedor modal container 
            cardTGif.style.height = '275px';
            trackSlider.appendChild(cardTGif);
            cardTGif.appendChild(imgGif);

            // Expandir la imagen PRUEBA  220920
            /*imgGif.forEach(el => {
                el.addEventListener('click', function(ev){
                    ev.stopPropagation();
                    this.parentNode.classList.add('active');
                })
            })

            imgGif.forEach(el=> {
                el.addEventListener('click', function(ev){
                    this.classList.remove('active');
                })
            })*/
            ///
            //Agregar diseño mouse over & mouseout  /// AGREGAR EN EL ADD EVENT LISTENER LA FUNCION QUE CREA TODA LA CAPA DE HOVER MOUSE OVER
            
            if (window.matchMedia("(min-width: 1366px)").matches) {
                imgGif.addEventListener('mouseover', () => {
                cardTGif.appendChild(hoverTrendingGifs(userTGif, titleTGif));
                //alert('hola');
                }) 
                //imgGif.addEventListener('mouseout', () => {
                imgGif.removeEventListener('mouseout', () => {
                //document.getElementsByClassName('gifTcard').style.display = 'none';
                //this.removeEventListener(hoverTrendingGifs(userTGif, titleTGif));
                //document.getElementsByClassName('gifTcard').remove;
                //this.classList.remove('gifTcard');
                cardTGif.removeChild(hoverTrendingGifs(userTGif, titleTGif));
                //cardTGif.classList.remove('gifTcard');
                //alert('adios');
                });
            }
        }

        /*CORRECTO OPCION 2
            infoTGif.data.forEach(element => {
            let trendingGif = element.images.downsized.url;
            console.log(trendingGif);
            let liGif = document.createElement('li');
            liGif.setAttribute("class","liGif");
            let imgGif = document.createElement('img');
            imgGif.src = trendingGif;
            liGif.appendChild(imgGif);
            ulGif.appendChild(liGif);
        }); */
});

    // Hover en 'trending gifs'
        function hoverTrendingGifs(userTGif, titleTGif){
            //Crear los elementos que componen el hover
            //Diseño tarjeta hover
            let purpleCard = document.createElement('div');
            purpleCard.classList.add('gifTcard');
            purpleCard.style.bottom = '280px';
            purpleCard.style.position = 'relative';
            purpleCard.style.zIndex = '3';
    
            //Diseño botón favorito
            let btnFav  = document.createElement('button');
            btnFav.classList.add('btnHover');
            btnFav.style.cursor = 'pointer';
            btnFav.style.left = '95px';
            let imgFav = document.createElement('img');
            imgFav.src = 'assets/icon-fav-hover.svg';
            imgFav.style.height = '15.9px';
            imgFav.style.width = '18px';
            imgFav.style.margin = 'auto';
            btnFav.appendChild(imgFav);
            
            //Diseño botón descargar
            let btnDownload = document.createElement('button');
            btnDownload.classList.add('btnHover');
            btnDownload.style.cursor = 'pointer';
            btnDownload.style.left = '105px';
            let imgDown = document.createElement('img');
            imgDown.src = 'assets/icon-download.svg';
            imgDown.style.height = '15.9px';
            imgDown.style.width = '18px';
            imgDown.style.margin = 'auto';
            btnDownload.appendChild(imgDown);
            //funcionalidad botón Download 
            /*let downloadAction = downloadGif(tagIcon, url);
            btnDownload.appendChild(downloadAction);*/
    
            //Diseño botón expandir
            let btnMax = document.createElement('button');
            btnMax.classList.add('btnHover');
            btnMax.style.cursor = 'pointer';
            btnMax.style.left = '115px';
            let imgMax = document.createElement('img');
            imgMax.src = 'assets/icon-max.svg';
            imgMax.style.height = '15.9px';
            imgMax.style.width = '18px';
            imgMax.style.margin = 'auto';
            btnMax.appendChild(imgMax);

            //Diseño Usuario
            //let userTitle = infoTGif.data[i].user.username;
            let userTitle = document.createElement('p');
            userTitle.classList.add('userName');
            userTitle.innerHTML = userTGif; 
    
            //Diseño Título Gif
            //let gifTitle = infoTGif.data[i].tags.title;
            let gifTitle = document.createElement('p');
            gifTitle.classList.add('gifTitle');
            gifTitle.innerHTML = titleTGif;

            //Se inserta todo en el div principal
            purpleCard.appendChild(btnFav);
            purpleCard.appendChild(btnDownload);
            purpleCard.appendChild(btnMax);
            purpleCard.appendChild(userTitle);
            purpleCard.appendChild(gifTitle);
            return purpleCard;
        }

    // Hover en 'resultados de búsqueda'
    function hoverSearchedGifs(searchGU, searchGT){
        //Crear los elementos que componen el hover
        //Diseño tarjeta hover
        let purpleCardS = document.createElement('div');
        purpleCardS.classList.add('gifScard');

        //Diseño botón favorito
        let btnFav  = document.createElement('button');
        btnFav.classList.add('btnHover');
        btnFav.style.cursor = 'pointer';
        //btnFav.style.position = 'relative';
        btnFav.style.left = '50px';
        let imgFav = document.createElement('img');
        imgFav.src = 'assets/icon-fav-hover.svg';
        imgFav.style.height = '15.9px';
        imgFav.style.width = '18px';
        imgFav.style.margin = 'auto';
        btnFav.appendChild(imgFav);

        //Diseño botón descargar
        let btnDownload = document.createElement('button');
        btnDownload.classList.add('btnHover');
        btnDownload.style.cursor = 'pointer';
        //btnDownload.style.position = 'relative';
        btnDownload.style.left = '61px';
        let imgDown = document.createElement('img');
        imgDown.src = 'assets/icon-download.svg';
        imgDown.style.height = '15.9px';
        imgDown.style.width = '18px';
        imgDown.style.margin = 'auto';
        btnDownload.appendChild(imgDown);

        //Diseño botón expandir
        let btnMax = document.createElement('button');
        btnMax.classList.add('btnHover');
        btnMax.style.cursor = 'pointer';
        //btnMax.style.position = 'relative';
        btnMax.style.left = '72px';
        let imgMax = document.createElement('img');
        imgMax.src = 'assets/icon-max.svg';
        imgMax.style.height = '15.9px';
        imgMax.style.width = '18px';
        imgMax.style.margin = 'auto';
        btnMax.appendChild(imgMax);

        //Diseño Usuario
        //let userTitle = infoTGif.data[i].user.username;
        let searchGifUser = document.createElement('p');
        searchGifUser.classList.add('userSName');
        searchGifUser.innerHTML = searchGU; 

        //Diseño Título Gif
        //let gifTitle = infoTGif.data[i].tags.title;
        let searchGifTitle = document.createElement('p');
        searchGifTitle.classList.add('gifSTitle');
        searchGifTitle.innerHTML = searchGT;

        //Se inserta todo en el div principal
        purpleCardS.appendChild(btnFav);
        purpleCardS.appendChild(btnDownload);
        purpleCardS.appendChild(btnMax);
        purpleCardS.appendChild(searchGifUser);
        purpleCardS.appendChild(searchGifTitle);
        return purpleCardS;
    }

    //Función para guardar en Favoritos
        /*function addGifFav () {
            
        }*/
    
    //Función para descargar Gif
        function downloadGif(tagIcon, url) {
            let linkdown = document.createElement("a");
            linkdown.id = "linkdown";
    
            fetch(url)
            .then(response => response.blob())
            .then(blob => {

            const url = URL.createObjectURL(blob);
            linkdown.href = url;
            linkdown.download = "myGiphy.gif";
            linkdown.appendChild(tagIcon);

            }).catch(console.error);
            return linkdown;
        }

    //Funcionalidad de carrusel 'Trending gifs'
    //Variables 
        const btnLeft = document.getElementById('btn-slider-left');
        const btnRight = document.getElementById('btn-slider-right');
        let trendingSlider = document.getElementById('trending-slider').offsetWidth;
        let trackSlider = document.getElementById('track');
        let index = 0;

        btnRight.addEventListener('click', () => {
            index++;
            trackSlider.style.transform = `translateX(-${index*trendingSlider}px)`;
            trackSlider.style.transition = '1s ease';
        })
        btnLeft.addEventListener('click', () => {
            index--;
            trackSlider.style.transform = `translateX(-${index*trendingSlider}px)`;
            trackSlider.style.transition = '1s ease';
        })


