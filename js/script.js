//Variables generales
let searchInput = document.getElementById('search'); //lo ingresado en el input
let activeSearch = document.getElementById('activeSearch');
let hugeListLine = document.getElementById('hugeListLine') // línea de separación de la barra de búsqueda
let btnSearch = document.getElementById('btnSearch');
let btnClose = document.getElementById('btnClose');
let huge_list = document.getElementById('huge_list');
let searchTitle = document.getElementById('searchTitle');
let searchResults = document.getElementById('grid-search');
let btnMoreSearch = document.getElementById('btn-more-search');
let trackSlider = document.getElementById('track'); // Carrusel Trending Gifs
let count = 0; // Indice de los gifs ('ver más')
//Variables favoritos
let noFav = document.getElementById('noFav');
let gridFav = document.getElementById('grid-fav');
//Variables Modal
let overlay = document.getElementById('overlay');
let gifMax = document.getElementById('gifMax');
let btnCloseMax = document.getElementById('btnCloseMax');
let userMax = document.getElementById('userMax');
let titleMax = document.getElementById('titleMax');
let iconsMax = document.getElementById('iconsMax');
//Variables API
let apiKey = 'PlzoJMPs7k0ixQrxRj53HDBKPN2s0zqT';

//Local Storage 'Mis favoritos'
export function readFavs() {
    let idsFav = localStorage.getItem("MyFavorites");
    let favArray = JSON.parse(idsFav);
    gridFav.innerHTML = " ";
    favArray.forEach(element => {
        console.log('Getting favs', element);
        addGifCard(element);
    });
}

function arrayFav (id) {
    let idsFav = localStorage.getItem("MyFavorites"); 
    let favArray = [];

    if ( idsFav == undefined || idsFav == null){
        favArray.push(id);
        noFav.style.display = 'block';
    } else{
        noFav.style.display = 'none';
        favArray = JSON.parse(idsFav); 
        console.log(favArray);
        let sameId = favArray.find( fav => fav == id );
        if (sameId == undefined || sameId == null){
            favArray.push(id);
        }
    }
    localStorage.setItem("MyFavorites", JSON.stringify(favArray));
}

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
    searchInput.addEventListener('keyup', (event) => {
        if (event.which === 13 || event.keyCode == 13 || searchInput.value == ""){
            activeSearch.style.display = 'none';
            btnClose.style.display = 'none';
            huge_list.style.display = 'none';
            hugeListLine.style.display = 'none';
            btnSearch.style.display = 'block';
            if (window.matchMedia("(min-width: 1366px)").matches) {
                btnSearch.style.left = '510px';
                btnSearch.style.top = '-33px';
            } else if(window.matchMedia("(max-width: 800px)").matches) {
                btnSearch.style.left = '294px';
                btnSearch.style.top = '-35px';
            }
            searchInput.classList.remove('srcOpen');
            //Visualizar resultado
            searchTitle.innerHTML = searchInput.value;
            searchByApiKey(searchInput.value).then((arrayGifs)=>
            showGifs(arrayGifs)
        );
        } else{
            autocompleteByApiKey(searchInput.value).then((arraySugestions)=>{
                processingResults(arraySugestions);
                //Mostrar la lista de sugerencias
                huge_list.classList.add('inputOpen');
                huge_list.style.display = 'flex';
                //Modificar botones barra de búsqueda
                btnSearch.style.display = 'none';
                btnClose.style.left = '515px';
                btnClose.style.top = '-233px';
                btnClose.style.display = 'block';
        }   )}
    })
}

lookingForInput(btnSearch, searchInput);

// Barra de búsqueda - Autocompletar
    async function autocompleteByApiKey(searchInput){
        let url = `https://api.giphy.com/v1/gifs/search/tags?api_key=${apiKey}&q=${searchInput}&limit=4&rating=g&lang=es`;
        let respA = await fetch(url);
        let infoA = await respA.json();
        console.log(infoA);
        return infoA.data;
    }    
    //llamar al input debe ser el parámetro
    function processingResults(suggestionArray) {
        for (let i=0; i < suggestionArray.length; i++ ) {
        huge_list.innerHTML = "";
        
        //Modificar estilo barra de búsqueda
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
            searchInput.innerHTML = item.name;

            //Cerrar lista
            huge_list.style.display = 'none';
            hugeListLine.style.display = 'none';
            //Reestablecer bordes del input
            searchInput.classList.remove('srcOpen');
            searchInput.classList.add('boxsearch');
            //Mover botón search
            btnClose.style.top = '-31px';
        })
        // Agregar nueva opción
        huge_list.appendChild(option);
        });
        }
    };

//Botón cerrar searching bar
    btnClose.addEventListener('click', () => {
        //Cambiar botones 
        btnClose.style.display = 'none';
        btnSearch.style.display = 'block';
        if (window.matchMedia("(min-width: 1366px)").matches) {
            btnSearch.style.left = '510px';
            btnSearch.style.top = '-33px';
        } else if(window.matchMedia("(max-width: 800px)").matches) {
            btnSearch.style.left = '294px';
            btnSearch.style.top = '-35px';
        }
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
    searchResults.innerHTML = "";
    for (let i=0; i < gifsArray.length; i++ ) {
        let imgGif = gifsArray[i].images.downsized.url;
        //Título del Gif
        let searchGifTitle = gifsArray[i].title;
        //Nombre del usuario del Gif
        let searchGifUser = gifsArray[i].username;
        // ID del GIF
        let searchGifId = gifsArray[i].id;
        //Crear la img, div y contenedor de Gif
        let searchGif = document.createElement('img');
        searchGif.alt = 'gif';    
        searchGif.src = imgGif;
        let cardSGif = document.createElement('div');
        cardSGif.className = 'cardSGif';
        cardSGif.append(searchGif);
        //Agregar formato grid a los gifs
        searchResults.className = 'gridFormat';
        searchResults.appendChild(cardSGif);
        //Modificar tamaño gif
            if (window.matchMedia("(min-width: 1366px)").matches) {
                searchGif.style.height = "200px";
                searchGif.style.width = "260px";
                cardSGif.style.height = "200px";
                cardSGif.style.width = "260px";
                
                //Agregar diseño mouse over & mouseout  /////// MODIFICAR matchMedia
                cardSGif.appendChild(hoverSearchedGifs(imgGif, searchGifUser, searchGifTitle, searchGifId));
                let Scard = cardSGif.querySelector('.gifScard');
                Scard.style.visibility = 'hidden';

                cardSGif.addEventListener('mouseover', () => {
                    Scard.style.visibility = 'visible';
                })
            
                cardSGif.addEventListener('mouseout', () => {
                    Scard.style.visibility = 'hidden';
                });
            } else if (window.matchMedia("(max-width: 800px)").matches) {
                cardSGif.addEventListener('click', () => {
                gifMax.src = searchGif.src;
                userMax.innerHTML = searchGifUser;
                overlay.style.visibility = 'visible';
                titleMax.innerHTML = searchGifTitle;
                
                // Funcionalidad botón favorito en Modal en Treding Gif
                let btnFavMx = createBtnFavModal();
                iconsMax.appendChild(btnFavMx);
                btnFavMx.addEventListener('click', ()=> {
                    arrayFav (searchGifId);
                    addfavsection(imgGif, searchGifUser, searchGifTitle, searchGifId);
                })
                // Funcionalidad botón de descarga en Modal en Treding Gif
                let btnDownloadMax = createBtnDownloadModal();
                iconsMax.appendChild(btnDownloadMax);
                btnDownloadMax.addEventListener('click', ()=> {
                downloadGif(trackSlider, imgGif); 
                })
                btnCloseMax.addEventListener('click', (e) => {
                    e.stopImmediatePropagation();
                    overlay.style.visibility = 'hidden';
                    let btnFavMax = document.getElementsByClassName('btnFavMax');
                    btnFavMax[0].remove();
                    let btnDownloadMax = document.getElementsByClassName('btnDownloadMax');
                    btnDownloadMax[0].remove();
                })
            }) }
    }
        //Visualizar área de resultados
        activeSearch.style.display = "inline";     
        
        //Visualizar categoría de búsqueda
        autocompleteByApiKey(searchInput.value);
};

//Botón 'Ver más'
btnMoreSearch.addEventListener('click', () => {
        searchInput.classList.remove('srcOpen'); 
        searchInput.classList.add('src');
        count += 12;
        searchByApiKey(searchInput.value, count).then((arrayGifs) =>
            showGifs(arrayGifs)
            );
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
                    searchInput.innerHTML = topic;
                    searchByApiKey(topic).then((arrayGifs) =>
                    showGifs(arrayGifs));
                    btnMoreSearch.addEventListener('click', () => {
                        searchInput.classList.remove('srcOpen');
                        searchInput.classList.add('src');
                        count += 12;
                        searchByApiKey(topic, count).then((arrayGifs) =>
                            showGifs(arrayGifs)
                        );
                    })
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
            //Nombre del usuario del Gif
            let userTGif = infoTGif.data[i].username;
            //Nombre del título del Gif
            let titleTGif = infoTGif.data[i].title;
            // ID del GIF
            let idTGif = infoTGif.data[i].id;
            //console.log(idTGif);
            let imgGif = document.createElement('img');
            imgGif.alt = 'gif';
            imgGif.src = trendingGif;
            let cardTGif = document.createElement('div');
            cardTGif.className = 'cardTGif';
            cardTGif.style.height = '275px';
            trackSlider.appendChild(cardTGif);
            cardTGif.appendChild(imgGif);

            //Agregar diseño mouse over & mouseout
            if (window.matchMedia("(min-width: 1366px)").matches) {
            cardTGif.appendChild(hoverTrendingGifs(trendingGif, userTGif, titleTGif, idTGif));

            let Tcard = cardTGif.querySelector('.gifTcard');
            Tcard.style.visibility = 'hidden';

            cardTGif.addEventListener('mouseover', () => {
                Tcard.style.visibility = 'visible';
            }) 
            
            cardTGif.addEventListener('mouseout', () => {
                Tcard.style.visibility = 'hidden';
            })
            } else if (window.matchMedia("(max-width: 800px)").matches) {
                cardTGif.addEventListener('click', () => {
                gifMax.src = imgGif.src;
                userMax.innerHTML = userTGif;
                overlay.style.visibility = 'visible';
                titleMax.innerHTML = titleTGif;
                // Funcionalidad botón favorito en Modal en Treding Gif
                let btnFavMx = createBtnFavModal();
                iconsMax.appendChild(btnFavMx);
                btnFavMx.addEventListener('click', ()=> {
                    arrayFav (idTGif);
                    addfavsection(trendingGif, userTGif, titleTGif);
                })
                // Funcionalidad botón de descarga en Modal en Treding Gif
                let btnDownloadMax = createBtnDownloadModal();
                iconsMax.appendChild(btnDownloadMax);
                btnDownloadMax.addEventListener('click', ()=> {
                downloadGif(trackSlider, imgGif.src); 
            })
                btnCloseMax.addEventListener('click', (e) => {
                    e.stopImmediatePropagation();
                    overlay.style.visibility = 'hidden';
                    let btnFavMax = document.getElementsByClassName('btnFavMax');
                    btnFavMax[0].remove();
                    let btnDownloadMax = document.getElementsByClassName('btnDownloadMax');
                    btnDownloadMax[0].remove();
                })
            });
            }
        }
});

    // Hover en 'trending gifs'
    function hoverTrendingGifs(trendingGif, userTGif, titleTGif, idsFav){
        //Diseño tarjeta hover
        let purpleCard = document.createElement('div');
        purpleCard.classList.add('gifTcard');
        purpleCard.style.bottom = '280px';
        purpleCard.style.position = 'relative';
        purpleCard.style.zIndex = '3';
    
        //Diseño botón favorito
        let btnFav  = document.createElement('button');
        btnFav.classList.add('btnHover');
        btnFav.style.left = '78px';
        btnFav.style.top = '10px';
        btnFav.id = idsFav;
        let imgFav = document.createElement('img');
        imgFav.alt = 'icon-fav';
        imgFav.src = 'assets/icon-fav-hover.svg';
        imgFav.style.height = '15.9px';
        imgFav.style.width = '18px';
        imgFav.style.margin = 'auto';
        btnFav.appendChild(imgFav);
        btnFav.addEventListener('click', function () { 
            //Agregar al arreglo
            arrayFav (this.id);
            imgFav.src = 'assets/icon-fav-active.svg';
            //Crear tarjeta e insertarla en sección Mis favoritos
            let imgFavGif = document.createElement('img');
            imgFavGif.alt = 'gif';    
            imgFavGif.src = trendingGif;
            let cardFGif = document.createElement('div');
            cardFGif.className = 'cardSGif';
            cardFGif.append(imgFavGif);
            gridFav.className = 'gridFormat'; 
            gridFav.appendChild(cardFGif);
        })
            //Diseño botón descargar
            let btnDownload = document.createElement('button');
            btnDownload.classList.add('btnHover');
            btnDownload.style.left = '89px';
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
    
            //Diseño botón expandir
            let btnMax = document.createElement('button');
            btnMax.classList.add('btnHover');
            //btnMax.style.cursor = 'pointer';
            btnMax.style.left = '100px';
            btnMax.style.top = '10px';
            let imgMax = document.createElement('img');
            imgMax.alt = 'icon-max';
            imgMax.src = 'assets/icon-max.svg';
            imgMax.style.height = '15.9px';
            imgMax.style.width = '18px';
            imgMax.style.margin = 'auto';
            btnMax.appendChild(imgMax);

            //Funcionalidad botón Maximizar GIF
            btnMax.addEventListener ('click', (e) => {
                e.stopImmediatePropagation();
                gifMax.src = trendingGif;
                userMax.innerHTML = userTGif;
                titleMax.innerHTML = titleTGif;
                overlay.style.visibility = 'visible';
                // Funcionalidad botón favorito en Modal en Treding Gif
                let btnFavMx = createBtnFavModal();      
                iconsMax.appendChild(btnFavMx);
                btnFavMx.addEventListener('click', ()=> {
                    //Agregar al arreglo
                    arrayFav (idsFav);
                    addfavsection (trendingGif, userTGif, titleTGif);
                })
                // Funcionalidad botón de descarga en Modal en Treding Gif
                let btnDownloadMax = createBtnDownloadModal();
                iconsMax.appendChild(btnDownloadMax);
                btnDownloadMax.addEventListener('click', ()=> {
                    downloadGif(trackSlider, trendingGif);
                })
                btnCloseMax.addEventListener('click', (e) => {
                    e.stopImmediatePropagation();
                    overlay.style.visibility = 'hidden';
                    let btnFavMax = document.getElementsByClassName('btnFavMax');
                    btnFavMax[0].remove();
                    let btnDownloadMax = document.getElementsByClassName('btnDownloadMax');
                    btnDownloadMax[0].remove();
                })
            });

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
    function hoverSearchedGifs(imgGif, searchGU, searchGT, idsFav){
        //Diseño tarjeta hover
        let purpleCardS = document.createElement('div');
        purpleCardS.classList.add('gifScard');

        //Diseño botón favorito
        let btnFavS  = document.createElement('button');
        btnFavS.classList.add('btnHover');
        btnFavS.style.left = '50px';
        btnFavS.style.top = '10px';
        let imgFavS = document.createElement('img');
        imgFavS.alt = 'icon-fav';
        imgFavS.src = 'assets/icon-fav-hover.svg';
        imgFavS.style.height = '15.9px';
        imgFavS.style.width = '18px';
        imgFavS.style.margin = 'auto';
        btnFavS.appendChild(imgFavS);
        btnFavS.addEventListener('click', () => {
            fetch(`https://api.giphy.com/v1/gifs?api_key=PlzoJMPs7k0ixQrxRj53HDBKPN2s0zqT&ids=${idsFav}`).then(response => response.json())
            .then(json => {
            let arrayMyFavGif = json.data;
            console.log(arrayMyFavGif);
            
            //Pintar el corazón
            imgFavS.src = 'assets/icon-fav-active.svg';

            for( let i=0; i < arrayMyFavGif.length; i++) {
            noFav.style.display = 'none';

            let myFavsrc = arrayMyFavGif[i].images.downsized.url;
            console.log(myFavsrc);

            let myFavTitle = arrayMyFavGif[i].title;
            console.log(myFavTitle);
        
            let myFavUser = arrayMyFavGif[i].username;
            console.log(myFavUser);
            
            //Guardar en local storage
            arrayFav(arrayMyFavGif[i].id)

            let imgFavGif = document.createElement('img');
            imgFavGif.alt = 'gif';    
            imgFavGif.src = myFavsrc;

            let cardFGif = document.createElement('div');
            cardFGif.className = 'cardSGif';
            cardFGif.append(imgFavGif);
            gridFav.className = 'gridFormat'; 
            gridFav.appendChild(cardFGif);
                }
            })
        })
        //Diseño botón descargar
        let btnDownloadS = document.createElement('button');
        btnDownloadS.classList.add('btnHover');
        //btnDownloadS.style.cursor = 'pointer';
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
            downloadGif(trackSlider, imgGif);
        })
        //Diseño botón expandir
        let btnMaxS = document.createElement('button');
        btnMaxS.classList.add('btnHover');
        //btnMaxS.style.cursor = 'pointer';
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
            // Funcionalidad botón favorito en Modal en Searched Gif
            let btnFavMx = createBtnFavModal();      
            iconsMax.appendChild(btnFavMx);
            btnFavMx.addEventListener('click', ()=> {
                //Visualización
                noFav.style.display = 'none';
                //Agregar al arreglo
                arrayFav (idsFav);
                addfavsection (imgGif, searchGU, searchGT)
            })
            // Funcionalidad botón de descarga en Modal en Searched Gif
            let btnDownloadMax = createBtnDownloadModal();
            iconsMax.appendChild(btnDownloadMax);
            btnDownloadMax.addEventListener('click', () => {
                downloadGif(trackSlider, imgGif);
            })
            // Funcionalidad
            btnCloseMax.addEventListener('click', () => {
                overlay.style.visibility = 'hidden';
                let btnFavMax = document.getElementsByClassName('btnFavMax');
                    btnFavMax[0].remove();
                    let btnDownloadMax = document.getElementsByClassName('btnDownloadMax');
                    btnDownloadMax[0].remove();
            })
        });

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

    // Función del hover de mis favoritos
    function hoverFavoriteGifs(imgGif, favGU, favGT ,idsFav){
        //Diseño tarjeta hover
        let purpleCardF = document.createElement('div');
        purpleCardF.classList.add('gifScard');

        //Diseño botón favorito
        let btnFavF  = document.createElement('button');
        btnFavF.classList.add('btnHover');
        btnFavF.style.left = '50px';
        btnFavF.style.top = '10px';
        let imgFavF = document.createElement('img');
        imgFavF.alt = 'icon-fav';
        imgFavF.src = 'assets/icon-fav-active.svg';
        imgFavF.style.height = '15.9px';
        imgFavF.style.width = '18px';
        imgFavF.style.margin = 'auto';
        btnFavF.appendChild(imgFavF);
        //Funcionalidad quitar de favoritos
        btnFavF.addEventListener('click', () => {
            alert('Ya está agregado a tus favoritos!');
        })

        //Diseño botón descargar
        let btnDownloadF = document.createElement('button');
        btnDownloadF.classList.add('btnHover');
        btnDownloadF.style.cursor = 'pointer';
        btnDownloadF.style.left = '61px';
        btnDownloadF.style.top = '10px';
        let imgDownF = document.createElement('img');
        imgDownF.alt = 'icon-download';
        imgDownF.src = 'assets/icon-download.svg';
        imgDownF.style.height = '15.9px';
        imgDownF.style.width = '18px';
        imgDownF.style.margin = 'auto';
        btnDownloadF.appendChild(imgDownF);
        //Funcionalidad del botón descargar
        btnDownloadF.addEventListener('click', () => {
            downloadGif(trackSlider, imgGif);
        })
        //Diseño botón expandir
        let btnMaxF = document.createElement('button');
        btnMaxF.classList.add('btnHover');
        //btnMaxF.style.cursor = 'pointer';
        btnMaxF.style.left = '72px';
        btnMaxF.style.top = '10px';
        let imgMaxF = document.createElement('img');
        imgMaxF.alt = 'icon-max';
        imgMaxF.src = 'assets/icon-max.svg';
        imgMaxF.style.height = '15.9px';
        imgMaxF.style.width = '18px';
        imgMaxF.style.margin = 'auto';
        btnMaxF.appendChild(imgMaxF);

        //Funcionalidad botón Maximizar GIF
        btnMaxF.addEventListener ('click', () => {;
            overlay.style.visibility = 'visible';
            gifMax.src = imgGif;
            userMax.innerHTML = favGU;
            titleMax.innerHTML = favGT;
            // Funcionalidad botón favorito en Modal en Favoritos
            let btnFavMx = createBtnFavModal();      
            iconsMax.appendChild(btnFavMx);
            btnFavMx.addEventListener('click', ()=> {
                alert('Ya está agregado a tus favoritos!');
            })
            // Funcionalidad botón de descarga en Modal en Treding Gif
            let btnDownloadMax = createBtnDownloadModal();
            iconsMax.appendChild(btnDownloadMax);
            btnDownloadMax.addEventListener('click', ()=> {
                downloadGif(trackSlider, imgGif);
            })

            btnCloseMax.addEventListener('click', (e) => {
                e.stopImmediatePropagation();
                overlay.style.visibility = 'hidden';
                let btnFavMax = document.getElementsByClassName('btnFavMax');
                btnFavMax[0].remove();
                let btnDownloadMax = document.getElementsByClassName('btnDownloadMax');
                btnDownloadMax[0].remove();
            })
        });

        //Diseño Usuario
        let favGifUser = document.createElement('p');
        favGifUser.classList.add('userSName');
        favGifUser.innerHTML = favGU; 

        //Diseño Título Gif
        let favGifTitle = document.createElement('p');
        favGifTitle.classList.add('gifSTitle');
        favGifTitle.innerHTML = favGT;

        //Se inserta todo en el div principal
        purpleCardF.appendChild(btnFavF);
        purpleCardF.appendChild(btnDownloadF);
        purpleCardF.appendChild(btnMaxF);
        purpleCardF.appendChild(favGifUser);
        purpleCardF.appendChild(favGifTitle);
        return purpleCardF;
    }

    function addGifCard(idGifFav) {

        fetch(`https://api.giphy.com/v1/gifs?api_key=${apiKey}&ids=${idGifFav}`).then(response => response.json())
        .then(json => {
            let arrayMyFavGif = json.data;
            noFav.style.display = 'none';

            let trendingGif = arrayMyFavGif[0].images.original.url;
            let userTGif = arrayMyFavGif[0].username;
            let titleTGif = arrayMyFavGif[0].title;

            let imgFavGif = document.createElement('img');
            imgFavGif.alt = 'gif';    
            imgFavGif.src = trendingGif;
    
            let cardFGif = document.createElement('div');
            cardFGif.className = 'cardSGif';
            cardFGif.append(imgFavGif);
            gridFav.className = 'gridFormat'; 
            gridFav.appendChild(cardFGif);
            //  Generación de vistas del hover con base en el tamaño de pantalla
            if (window.matchMedia("(min-width: 1366px)").matches) {
                imgFavGif.style.height = "200px";
                imgFavGif.style.width = "260px";
                cardFGif.style.height = "200px";
                cardFGif.style.width = "260px";
    
                cardFGif.appendChild(hoverFavoriteGifs(trendingGif, userTGif, titleTGif));
                let Fcard = cardFGif.querySelector('.gifScard');
                Fcard.style.visibility = 'hidden';
    
                cardFGif.addEventListener('mouseover', () => {
                Fcard.style.visibility = 'visible';
                })
    
                cardFGif.addEventListener('mouseout', () => {
                Fcard.style.visibility = 'hidden';
                });
            } else if (window.matchMedia("(max-width: 800px)").matches) {
                cardFGif.addEventListener('click', () => {
                gifMax.src = imgFavGif.src;
                userMax.innerHTML = userTGif;
                overlay.style.visibility = 'visible';
                titleMax.innerHTML = titleTGif;
                // Funcionalidad botón de descarga en Modal en Treding Gif
                let btnDownloadMax = createBtnDownloadModal();
                iconsMax.appendChild(btnDownloadMax);
                btnDownloadMax.addEventListener('click', ()=> {
                    downloadGif(trackSlider, imgFavGif.src); 
                })
                btnCloseMax.addEventListener('click', (e) => {
                    e.stopImmediatePropagation();
                    overlay.style.visibility = 'hidden';
                    /*let btnFavMax = document.getElementsByClassName('btnFavMax');
                    btnFavMax[0].remove();*/
                    let btnDownloadMax = document.getElementsByClassName('btnDownloadMax');
                    btnDownloadMax[0].remove(); 
                })
    
                imgFavGif.style.height = "120px";
                imgFavGif.style.width = "156px";
                }) 
            }
        })
    }

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

    //Botón DownloadMax OVERLAY
    export function createBtnDownloadModal() {
    let btnDownloadMax = document.createElement('button');
    btnDownloadMax.classList.add('btnDownloadMax');
    btnDownloadMax.style.left = '105px';
    btnDownloadMax.style.top = '40px';
    let imgDownMax = document.createElement('img');
    imgDownMax.alt = 'icon-download';
    imgDownMax.src = 'assets/icon-download.svg';
    imgDownMax.style.height = '21.1px';
    imgDownMax.style.width = '19.2px';
    //imgDown.style.margin = 'auto';
    btnDownloadMax.appendChild(imgDownMax);
    return btnDownloadMax;      
    }

    //Botón FavMax OVERLAY
    function createBtnFavModal(){
    let btnFavMx = document.createElement('button');
    btnFavMx.classList.add('btnFavMax');
    let imgFav = document.createElement('img');
    imgFav.alt = 'icon-fav';
    imgFav.src = 'assets/icon-fav-hover.svg';
    imgFav.style.height = '15.9px';
    imgFav.style.width = '18px';

    btnFavMx.appendChild(imgFav);
    return btnFavMx;
    }

    //Funcionalidad botón Favoritos OVERLAY
    function addfavsection (gifSource, userSource, titleSource) {
        let imgFavGif = document.createElement('img');
        imgFavGif.alt = 'gif';    
        imgFavGif.src = gifSource //trendingGif;

        let cardFGif = document.createElement('div');
        cardFGif.className = 'cardSGif';
        cardFGif.append(imgFavGif);
        gridFav.className = 'gridFormat'; 
        gridFav.appendChild(cardFGif);
            if (window.matchMedia("(min-width: 1366px)").matches) {
                imgFavGif.style.height = "200px";
                imgFavGif.style.width = "260px";
                cardFGif.style.height = "200px";
                cardFGif.style.width = "260px";
    
                cardFGif.appendChild(hoverFavoriteGifs(gifSource, userSource, titleSource));  //trendingGif, userTGif, titleTGif));
                let Fcard = cardFGif.querySelector('.gifScard');
                Fcard.style.visibility = 'hidden';
    
                cardFGif.addEventListener('mouseover', () => {
                Fcard.style.visibility = 'visible';
                })
    
                cardFGif.addEventListener('mouseout', () => {
                Fcard.style.visibility = 'hidden';
                });
                } else if (window.matchMedia("(max-width: 800px)").matches) {
                    cardFGif.addEventListener('click', () => {
                    gifMax.src = gifSource  //imgFavGif.src;
                    userMax.innerHTML = userSource //myFavUser;
                    overlay.style.visibility = 'visible';
                    titleMax.innerHTML = titleSource //myFavTitle;
                    //Funcionalidad botón descarga en Modal    
                    btnDownloadMax.addEventListener('click', (e)=> {
                        e.stopImmediatePropagation();
                        downloadGif(trackSlider, imgGif);
                    })
                    btnCloseMax.addEventListener('click', () => {
                        overlay.style.visibility = 'hidden';
                        let btnDownloadMax = document.getElementsByClassName('btnDownloadMax');
                        btnDownloadMax[0].remove();
                    })
                })
            }
    }