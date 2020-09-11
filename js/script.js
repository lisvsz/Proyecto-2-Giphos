// Dark mode :)

function darkMode() {
const btnSwitch = document.getElementById("switch");
btnSwitch.addEventListener("click", function dark() {
    document.body.classList.toggle("dark");
});
}
darkMode();

//LLAMAR API

let searchInput = document.getElementById('search');
let btnSearch = document.getElementById('btnSearch');
let btnClose = document.getElementById('btn-close');
let huge_list = document.getElementById('huge_list');

//Variables API
let apiKey = 'PlzoJMPs7k0ixQrxRj53HDBKPN2s0zqT';

// Botones búsqueda

btnSearch.addEventListener('click', () => {
    searchByApiKey(searchInput.value).then((arrayGifs) =>
        showGifs(arrayGifs)
    );
});
searchInput.addEventListener('keyup', () => {
    if (event.which === 13 || event.keyCode == 13){
        searchByApiKey(searchInput.value).then((arrayGifs)=>
        showGifs(arrayGifs)
        );
    } else{
        autocompleteByApiKey(searchInput.value).then((arraySugestions)=>{
            console.log('AUTOCOMPLETE');
            processingResults(arraySugestions);
    })}
})


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
    function processingResults(suggestionArray) {
        huge_list.innerHTML = "";
        huge_list.classList.add('inputOpen');
        
        //Modificar estilo barra de búsqueda
        let search = document.getElementById('search');
        search.classList.add('srcOpen');
        //console.log('hola');
        suggestionArray.forEach((item) => {
        console.log('Element: ', item.name);
        
        //Modificar ubicación del botón de búsqueda
        btnSearch.style.top = '-235px';
        
        // Crear e imprimir en pantalla nueva opción
        let option = document.createElement('li');
        option.value = item.name;
        option.innerHTML = "<img src='assets/icon-search-mod-grey.svg'> " + item.name;
        
        //Modificar ícono de lupa por 'x'
        function openClose (searchInput) {
            if(searchInput !== ''){
                btnSearch.style.display = 'none';
                btnClose.style.display = 'inline';
            } false
        }
        //NO FUNCIONA CORRECTAMENTE - aparece nuevamente el X
        btnClose.addEventListener('click', () => {
            searchInput.value == '';
            huge_list.style.display = 'none';
            search.classList.remove('srcOpen');
            btnClose.style.display = 'none';
            btnSearch.style.display = 'inline';
            btnSearch.style.top = '-35px';
        });
        
        openClose();
        
        //Seleccionar sugerencia, abrirla e imprimirla en pantalla
        option.addEventListener ('click', () => {
            searchByApiKey(item.name).then((arrayGifs)=>
            showGifs(arrayGifs));
            //Reemplazar texto mostrado
            let searchTitle = document.getElementById('searchTitle');
            searchTitle.innerHTML = item.name;
        })
        option.style.cursor = 'pointer';
        
        // Agregar nueva opción
        huge_list.appendChild(option);
        });
    };
    
/**
 * Funcion que nos sirve para hacer el llamado a la API KEY
 * @param {*} searchInput este parámetro es proporcionado por el usuario
 */
async function searchByApiKey(searchInput, offset){
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
        let searchGif = document.createElement('img');    
        searchGif.src = imgGif;
        let searchResults = document.getElementById('grid-search');
        searchResults.appendChild(searchGif);

        //Modificar tamaño gif
            if (window.matchMedia("(min-width: 1366px)").matches) {
                searchGif.style.height = "200px";
                searchGif.style.width = "260px";
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
    };
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
;

//Botón 'Ver más'

    let btnMoreSearch = document.getElementById('btn-more-search');
    btnMoreSearch.addEventListener('click', () => {
        searchByApiKey(searchInput, offset);
        showGifs(gifsArray);
    });


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

                trendingTopic.addEventListener('click', () => {
                    //Visualizar en barra de búsqueda, buscar gif y visualizarlo
                    console.log(topic);
                    searchByApiKey(topic);

                    //Intentos
                        //console.log(showGifs(topic));
                        //console.log(autocompleteByApiKey(topic));
                        //searchByApiKey(topic);
                        //showGifs(topic);
                        //console.log(topic.images.downsized.url);
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
            let imgGif = document.createElement('img');
            imgGif.src = trendingGif;
            trackSlider.appendChild(imgGif);
            //Agregar diseño mouse over & mouseout  /// AGREGAR EN EL ADD EVENT LISTENER LA FUNCION QUE CREA TODA LA CAPA DE HOVER MOUSE OVER
            imgGif.addEventListener('mouseover', () => {
                imgGif.classList.add('gifcard');
            }) 
            imgGif.addEventListener('mouseout', () => {
                imgGif.classList.remove('gifcard');
            })
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

    function hoverTrendingGifs (user, titleGifo, url, index){

        //Crear los elementos que componen el hover
        let purpleCard = document.createElement('div');
        let favBtn = document.createElement('img');
    }

    //function trendingGifHover

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

