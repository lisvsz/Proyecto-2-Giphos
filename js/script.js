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
//let search = document.getElementById('search'); // input duplicado
let hugeListLine = document.getElementById('hugeListLine') // línea de separación de la barra de búsqueda
let btnSearch = document.getElementById('btnSearch');
let btnClose = document.getElementById('btnClose');
let huge_list = document.getElementById('huge_list');
let noResults = document.getElementById('noResults');
let searchTitle = document.getElementById('searchTitle');
let btnMoreSearch = document.getElementById('btn-more-search');
let count = 0; // Indice de los gifs ('ver más')
let trackSlider = document.getElementById('track'); // Carrusel Trending Gifs
//Variables Modal
let overlay = document.getElementById('overlay');
let slideshow = document.getElementsByClassName('slideshow');
let gifMax = document.getElementById('gifMax');
let btnCloseMax = document.getElementById('btnCloseMax');
let btnLeftMax = document.getElementsByClassName('btnLeftMax');
let btnRightMax = document.getElementsByClassName('btnRightMax');
let userMax = document.getElementById('userMax');
let titleMax = document.getElementById('titleMax');
let btnDownloadMax = document.getElementById('btnDownloadMax');


//Variables API
let apiKey = 'PlzoJMPs7k0ixQrxRj53HDBKPN2s0zqT';


// Botones búsqueda
function lookingForInput(btnSearch, searchInput) {
    btnSearch.addEventListener('click', () => {
        //Modificar botones barra de búsqueda
        btnSearch.style.display = 'none';
        btnClose.style.left = '294px';
        btnClose.style.top = '-233px';
        btnClose.style.display = 'block';
        //Visualizar resultado
        searchTitle.innerHTML = searchInput.value;
        searchByApiKey(searchInput.value, 0).then((arrayGifs) =>
            showGifs(arrayGifs)
        );
    });
    searchInput.addEventListener('keyup', () => {
        if (event.which === 13 || event.keyCode == 13 && searchInput != ""){
            //Intentos cambiar visualización VERIFICAAAAAAAAAAAAAR
            btnClose.style.display = 'none';
            huge_list.style.display = 'none';
            btnSearch.style.left = '294px';
            btnSearch.style.top = '-33px';
            btnSearch.style.display = 'block';
            hugeListLine.style.display = 'none';
            searchInput.classList.remove('srcOpen');
            //Visualizar resultado
            searchTitle.innerHTML = searchInput.value;
            searchByApiKey(searchInput.value).then((arrayGifs)=>
            showGifs(arrayGifs)
        );
        } else{
            autocompleteByApiKey(searchInput.value).then((arraySugestions)=>{
                //console.log('AUTOCOMPLETE');
                processingResults(arraySugestions);
                //Mostrar la lista de sugerencias
                huge_list.classList.add('inputOpen');
                huge_list.style.display = 'flex';
                //Modificar botones barra de búsqueda
                btnSearch.style.display = 'none';
                btnClose.style.left = '294px';
                btnClose.style.top = '-233px';
                btnClose.style.display = 'block';
                
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
        //huge_list.classList.add('inputOpen');
        
        //Modificar estilo barra de búsqueda // INTENTO PONERLO ARRIBA
        searchInput.classList.add('srcOpen');
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

        //Seleccionar sugerencia, abrirla e imprimirla en pantalla
        option.addEventListener ('click', () => {
            searchByApiKey(item.name).then((arrayGifs)=>
            showGifs(arrayGifs));
            //Reemplazar texto mostrado
            option.style.cursor = 'pointer';
            searchTitle.innerHTML = item.name;
            ////////////////////////////////////////Cómo pintar el input cuando doy click al trending topic
            //searchInput.value = item.name;
            searchInput.innerHTML = item.name;

            //Cerrar lista
            huge_list.style.display = 'none';
            hugeListLine.style.display = 'none';
            //Reestablecer bordes del input
            searchInput.classList.remove('srcOpen');
            searchInput.classList.add('boxsearch');
            //Mover botón search
            btnClose.style.top = '-31px';

            ////////Intento 2 221020
            /*btnMoreSearch.addEventListener('click', () => {
                count += 12;
                searchTitle.innerHTML = searchInput.value;
                searchByApiKey(searchInput.value, count).then((arrayGifs) =>
                    showGifs(arrayGifs)
                );
        
                autocompleteByApiKey(searchInput.value, count).then((arraySugestions)=>{
                    processingResults(arraySugestions);
                });
                
                /*searchByApiKey(item.name, count).then((arrayGifs) =>
                        showGifs(arrayGifs));*/
                //});

        })

        //171020  Botón 'Ver más' para option
        /*btnMoreSearch.addEventListener('click', () => {
            count += 12;
            searchByApiKey(item.name).then((arrayGifs)=>
            showGifs(arrayGifs));
            console.log(item.name)
        });*/

        // Agregar nueva opción
        huge_list.appendChild(option);
        });
        }

        ///Intento 221020
        /*btnMoreSearch.addEventListener('click', () => {
            alert(':D');
            //count += 12;
            //searchTitle.innerHTML = searchInput.value;
            //searchTitle.innerHTML = item.name;
            //console.log(item.name);
            /*searchByApiKey(searchInput.value, count).then((arrayGifs) =>
                showGifs(arrayGifs)*/
            //searchByApiKey(option.value, count).then((arrayGifs)=>
            //    showGifs(arrayGifs))*/
        //})
    };

    //Botón cerrar searching bar
        btnClose.addEventListener('click', () => {
        //Cambiar botones 
        btnClose.style.display = 'none';
        btnSearch.style.display = 'block';
        btnSearch.style.left = '294px';
        btnSearch.style.top = '-35px';
        //Borrar contenido y cerrar lista
        searchInput.value = '';
        huge_list.style.display = 'none';
        hugeListLine.style.display = 'none';
        //Reestablecer bordes del input
        searchInput.classList.remove('srcOpen');
        searchInput.classList.add('boxsearch');
        })

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
        let imgGif = gifsArray[i].images.downsized.url;
        console.log(imgGif);
        //Título del Gif
        let searchGifTitle = gifsArray[i].title;
        console.log(searchGifTitle);
        //Nombre del usuario del Gif
        let searchGifUser = gifsArray[i].username;
        console.log(searchGifUser);
        //Crear la img, div y contenedor de Gif
        let searchGif = document.createElement('img');
        searchGif.alt = 'gif';    
        searchGif.src = imgGif;
        let cardSGif = document.createElement('div');
        cardSGif.className = 'cardSGif';
        cardSGif.append(searchGif);
        let searchResults = document.getElementById('grid-search');
        searchResults.className = 'gridFormat';
        searchResults.appendChild(cardSGif);
        //Si está vacio, mostrar pantalla de no hay resultados          /////////////NO FUNCIONA
        /*if (gifsArray == '' || gifsArray == null) {
            noResults.style.display = 'inline';
        } else {
            noResults.style.display = 'none';
        }*/

        //Modificar tamaño gif
            if (window.matchMedia("(min-width: 1366px)").matches) {
                searchGif.style.height = "200px";
                searchGif.style.width = "260px";
                cardSGif.style.height = "200px";
                cardSGif.style.width = "260px";
                
                //Agregar diseño mouse over & mouseout  /////// MODIFICAR matchMedia
                cardSGif.appendChild(hoverSearchedGifs(imgGif, searchGifUser, searchGifTitle));
                let Scard = cardSGif.querySelector('.gifScard');
                Scard.style.visibility = 'hidden';

                cardSGif.addEventListener('mouseover', () => {
                    //let Scard = cardSGif.querySelector('.gifScard');
                    Scard.style.visibility = 'visible';
                })
            
                cardSGif.addEventListener('mouseout', () => {
                    //let Scard = cardSGif.querySelector('.gifScard');
                    Scard.style.visibility = 'hidden';
                });
            } else if (window.matchMedia("(max-width: 800px)").matches) {
                cardSGif.addEventListener('click', () => {
                //console.log(gifMax);
                gifMax.src = searchGif.src;
                userMax.innerHTML = searchGifUser;
                overlay.style.visibility = 'visible';
                titleMax.innerHTML = searchGifTitle;
                //Funcionalidad botón descarga en Modal      ///////////// AL ACTIVARLO, VA AUMENTANDO +1 LA VENTANA PARA DESCARGAR EL GIF
                /*btnDownloadMax.addEventListener('click', ()=> {
                    downloadGif(trackSlider, imgGif);
                })*/
                btnCloseMax.addEventListener('click', () => {
                    overlay.style.visibility = 'hidden';
                })

                searchGif.style.height = "120px";
                searchGif.style.width = "156px";
            }) }
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

    //Botón 'Ver más' /////// Nota: reiniciar en función buscador el contador , así como el título NO FUNCIONA EN TRENDING TOPICS
        btnMoreSearch.addEventListener('click', () => {
        count += 12;
        searchTitle.innerHTML = searchInput.value;
        searchByApiKey(searchInput.value, count).then((arrayGifs) =>
            showGifs(arrayGifs)
        );

        autocompleteByApiKey(searchInput.value, count).then((arraySugestions)=>{
            processingResults(arraySugestions);
        });
        
        /*searchByApiKey(item.name, count).then((arrayGifs) =>
                showGifs(arrayGifs));*/
        });


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
            //console.log(trendingGif);
            let userTGif = infoTGif.data[i].username;
            let titleTGif = infoTGif.data[i].title;
            let imgGif = document.createElement('img');
            imgGif.alt = 'gif';
            imgGif.src = trendingGif;
            let cardTGif = document.createElement('div');
            cardTGif.className = 'cardTGif';
            //cardTGif.classList.add = 'modalContainer'; //se añade clase para el contenedor modal container 
            cardTGif.style.height = '275px';
            trackSlider.appendChild(cardTGif);
            cardTGif.appendChild(imgGif);

            //Agregar diseño mouse over & mouseout

            if (window.matchMedia("(min-width: 1366px)").matches) {
            cardTGif.appendChild(hoverTrendingGifs(trendingGif, userTGif, titleTGif));

            let Tcard = cardTGif.querySelector('.gifTcard');
            Tcard.style.visibility = 'hidden';

            cardTGif.addEventListener('mouseover', () => {
                //let Tcard = cardTGif.querySelector('.gifTcard');
                Tcard.style.visibility = 'visible';
            }) 
            
            cardTGif.addEventListener('mouseout', () => {
                //let Tcard = cardTGif.querySelector('.gifTcard');
                Tcard.style.visibility = 'hidden';
            })
            } else if (window.matchMedia("(max-width: 800px)").matches) {
                cardTGif.addEventListener('click', () => {
                //console.log(gifMax);
                gifMax.src = imgGif.src;
                userMax.innerHTML = userTGif;
                overlay.style.visibility = 'visible';
                titleMax.innerHTML = titleTGif;
                /*btnDownloadMax.addEventListener('click', ()=> {  ///////////// AL ACTIVARLO, VA AUMENTANDO +1 LA VENTANA PARA DESCARGAR EL GIF
                    downloadGif(trackSlider, trendingGif);
                })*/
                btnCloseMax.addEventListener('click', () => {
                    overlay.style.visibility = 'hidden';
                })
            });
            }

            //Funcionalidad del botón download ////// SE ABRE UNA Y OTRA VEEEZ
            /*btnDownloadMax.addEventListener('click', () => {
                downloadGif(trackSlider, trendingGif);
                });*/
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
        function hoverTrendingGifs(trendingGif, userTGif, titleTGif){
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
            btnFav.style.top = '10px';
            let imgFav = document.createElement('img');
            imgFav.alt = 'icon-fav';
            imgFav.src = 'assets/icon-fav-hover.svg';
            imgFav.style.height = '15.9px';
            imgFav.style.width = '18px';
            imgFav.style.margin = 'auto';
            btnFav.appendChild(imgFav);
            //Funcionalidad del botón favoritos
            btnFav.addEventListener('click', () => {
                alert(':D');
            })
            
            //Diseño botón descargar
            let btnDownload = document.createElement('button');
            btnDownload.classList.add('btnHover');
            btnDownload.style.cursor = 'pointer';
            btnDownload.style.left = '105px';
            btnDownload.style.top = '10px';
            let imgDown = document.createElement('img');
            imgDown.alt = 'icon-download';
            imgDown.src = 'assets/icon-download.svg';
            imgDown.style.height = '15.9px';
            imgDown.style.width = '18px';
            imgDown.style.margin = 'auto';
            btnDownload.appendChild(imgDown);
            //Funcionalidad del botón download
            btnDownload.addEventListener('click', () => {
                downloadGif(trackSlider, trendingGif);
            })
            //imgDown.onclick = () => {(downloadGif(btnDownload, trendingGif))};
    
            //Diseño botón expandir
            let btnMax = document.createElement('button');
            btnMax.classList.add('btnHover');
            btnMax.style.cursor = 'pointer';
            btnMax.style.left = '115px';
            btnMax.style.top = '10px';
            let imgMax = document.createElement('img');
            imgMax.alt = 'icon-max';
            imgMax.src = 'assets/icon-max.svg';
            imgMax.style.height = '15.9px';
            imgMax.style.width = '18px';
            imgMax.style.margin = 'auto';
            btnMax.appendChild(imgMax);
            //Funcionalidad botón Maximizar GIF
            /*tomar el array.for each (cada imagen =>{
                agregar a cada img un addeventlistener (click, event(asi accedemos al data-atribute) => {
                    variable img seleccionada = +event.target.dataset.imgMostrar (string)  esto da la imagen
                    etiqueta que mostrará slideshow (id=gifMax).src = arrayimg[imagenseleccionada].img
                    contador = imagen seleccionada
                    mostrar overlay
                })
            })*/
            btnMax.addEventListener ('click', () => {
                gifMax.src = trendingGif;
                userMax.innerHTML = userTGif;
                titleMax.innerHTML = titleTGif;
                overlay.style.visibility = 'visible';
                // Funcionalidad botones de Descarga en Modal en Treding Gif
                btnDownloadMax.style.cursor = 'pointer';
                btnDownloadMax.addEventListener('click', () => {
                    downloadGif(trackSlider, trendingGif);
                })
            });

            btnCloseMax.addEventListener('click', () => {
                overlay.style.visibility = 'hidden';
            })

            //Diseño Usuario
            let userTitle = document.createElement('p');
            userTitle.classList.add('userName');
            userTitle.innerHTML = userTGif; 
    
            //Diseño Título Gif
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
    function hoverSearchedGifs(imgGif, searchGU, searchGT){
        //Crear los elementos que componen el hover
        //Diseño tarjeta hover
        let purpleCardS = document.createElement('div');
        purpleCardS.classList.add('gifScard');

        //Diseño botón favorito
        let btnFavS  = document.createElement('button');
        btnFavS.classList.add('btnHover');
        btnFavS.style.cursor = 'pointer';
        btnFavS.style.left = '50px';
        btnFavS.style.top = '10px';
        let imgFavS = document.createElement('img');
        imgFavS.alt = 'icon-fav';
        imgFavS.src = 'assets/icon-fav-hover.svg';
        imgFavS.style.height = '15.9px';
        imgFavS.style.width = '18px';
        imgFavS.style.margin = 'auto';
        btnFavS.appendChild(imgFavS);
        /*btnFavS.addEventListener('click', () => {         ///////////////////////SEGUNDO INTENTO FAV
            //addGifFav();
            fetch(imgGif).then(response => response.json())
            .then(json => {
            let arrayFavGif = json.data;
            console.log(arrayFavGif);

            for( let i=0; i < arrayFavGif.length; i++) {
            noFav.style.display = 'none';

            let myFavsrc = arrayMyFav[i].images.downsized.url;
            console.log(imgMyFav);

            let myFavTitle = arrayMyFav[i].title;
            console.log(myFavTitle);
        
            let myFavUser = arrayMyFav[i].username;
            console.log(myFavUser);

            let imgFavGif = document.createElement('img');
            imgFavGif.alt = 'gif';    
            imgFavGif.src = myFavsrc;

            let cardFGif = document.createElement('div');
            cardFGif.append(imgFavGif);
            gridFav.className = 'gridFormat'; 
            gridFav.appendChild(cardFGif);
            }
            })
        })*/

        //Diseño botón descargar
        let btnDownloadS = document.createElement('button');
        btnDownloadS.classList.add('btnHover');
        btnDownloadS.style.cursor = 'pointer';
        btnDownloadS.style.left = '61px';
        btnDownloadS.style.top = '10px';
        let imgDownS = document.createElement('img');
        imgDownS.alt = 'icon-download';
        imgDownS.src = 'assets/icon-download.svg';
        imgDownS.style.height = '15.9px';
        imgDownS.style.width = '18px';
        imgDownS.style.margin = 'auto';
        btnDownloadS.appendChild(imgDownS);
        //Funcionalidad del botón descargar
        btnDownloadS.addEventListener('click', () => {
            //console.log(trendingGif);
            downloadGif(trackSlider, imgGif);
        })

        //Diseño botón expandir
        let btnMaxS = document.createElement('button');
        btnMaxS.classList.add('btnHover');
        btnMaxS.style.cursor = 'pointer';
        btnMaxS.style.left = '72px';
        btnMaxS.style.top = '10px';
        let imgMaxS = document.createElement('img');
        imgMaxS.alt = 'icon-max';
        imgMaxS.src = 'assets/icon-max.svg';
        imgMaxS.style.height = '15.9px';
        imgMaxS.style.width = '18px';
        imgMaxS.style.margin = 'auto';
        btnMaxS.appendChild(imgMaxS);
        //Funcionalidad botón expandir SEARCHED GIF
        btnMaxS.addEventListener ('click', () => {
            gifMax.src = imgGif;
            userMax.innerHTML = searchGU;
            titleMax.innerHTML = searchGT;
            overlay.style.visibility = 'visible';
            // Funcionalidad botones de Descarga en Modal en Searched Gif
            btnDownloadMax.style.cursor = 'pointer';
            btnDownloadMax.addEventListener('click', () => {
                downloadGif(trackSlider, imgGif);
            })
        });

        btnCloseMax.addEventListener('click', () => {
            overlay.style.visibility = 'hidden';
        })

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
        purpleCardS.appendChild(btnFavS);
        purpleCardS.appendChild(btnDownloadS);
        purpleCardS.appendChild(btnMaxS);
        purpleCardS.appendChild(searchGifUser);
        purpleCardS.appendChild(searchGifTitle);
        return purpleCardS;
    }

    //Función para guardar en Favoritos
    let noFav = document.getElementById('noFav');
    let gridFav = document.getElementById('grid-fav');


        /*function addGifFav() {
            let localStorageFav = JSON.parse(localStorage.getItem('favStorage'));
            if (localStorageFav == undefined || localStorageFav == null || localStorageFav == ""){
                localStorageFav = [];
                noFav.style.display = 'inline';
            } 
            
        }*/

        //addGifFav();

        /// 2° Intento
        
        //Leemos los favoritos del local storage
        /*function addGifFav ()
        let favStorage = localStorage.getItem("favGifs")
        favStorage = JSON.parse(favStorage);
        console.log(favStorage);*/

        //Guardamos la lista de favoritos
        //localStorage.setItem("favoritos", JSON.stringify(favStorage));

        // 3° INTENTO
        //HACER UNA FUNCION CON imgGif para ligarla con el fav
    /*function addGifFav() {
        fetch(imgGif).then(response => response.json())
        .then(json => {
        let arrayFavGif = json.data;
        console.log(arrayFavGif);

        for( let i=0; i < arrayFavGif.length; i++) {
        noFav.style.display = 'none';

        let myFavsrc = arrayMyFav[i].images.downsized.url;
        console.log(imgMyFav);

        let myFavTitle = arrayMyFav[i].title;
        console.log(myFavTitle);
        
        let myFavUser = arrayMyFav[i].username;
        console.log(myFavUser);

        let imgFavGif = document.createElement('img');
        imgFavGif.alt = 'gif';    
        imgFavGif.src = myFavsrc;

        let cardFGif = document.createElement('div');
        cardFGif.append(imgFavGif);
        gridFav.className = 'gridFormat'; 
        gridFav.appendChild(cardFGif);
        
        if (window.matchMedia("(min-width: 1366px)").matches) {
            cardFGif.style.height = '200px';
            cardFGif.style.width = '260px';
            /*cardFGif.appendChild(hoverMyGifs (imgMyGif, myGifUser, myGifTitle));
            
            let mGHoverCard = cardMGif.querySelector('.gifScard');
            mGHoverCard.style.visibility = 'hidden';
            
            cardMGif.addEventListener('mouseover', () => {
                mGHoverCard.style.visibility = 'visible';
            });

            cardMGif.addEventListener('mouseout', () => {
                mGHoverCard.style.visibility = 'hidden';
            })*/
        //}
    
        //}
        //});
    //}
    

    //Función para descargar Gif
        function downloadGif(trackSlider, urlremote) {
            //Se genera anchor 
            let downloadLink = document.createElement("a");
            //Se genera blob
            fetch(urlremote)
                .then(response => response.blob())
                .then(blob => {
                    const urlremote = URL.createObjectURL(blob);
                    downloadLink.href = urlremote;
                    downloadLink.download = "myGif.gif";
                    trackSlider.appendChild(downloadLink);
                    downloadLink.click();
                    downloadLink.remove();
            }).catch(console.error);
        }

    //Funcionalidad de carrusel 'Trending gifs'
    //Variables 
        const btnLeft = document.getElementById('btn-slider-left');
        const btnRight = document.getElementById('btn-slider-right');
        let trendingSlider = document.getElementById('trending-slider').offsetWidth;
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
    
