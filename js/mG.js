//INICIALIZAR LOCALSTORAGE MYGIFOS
if(localStorage.getItem("NuevosGifos") == undefined ) {
    localStorage.setItem("NuevosGifos", "fvMyDds5Bc6ufJHdLs");
  }

//Crear la sección de partMyGifos
let partMyGifos = document.getElementById("partMyGifos");

let gridMyGifos = document.getElementById("gridMyGifos");

let misGIFOS;

let gifos12 = [];

let clickCon = 0;

//Declaración de variable global para segmentar los gifs fav en 12
let clickG;

//Declaración del contador
let con = 0;

function showGIFOS(array) {
    if (array == null || array.length == 0 || array == undefined) {
        resultNoGIFOS();
    } else if (array.length > 0) {
        resultGIFOS(array);
    }
}


//PARAMETROS
let ids = localStorage.getItem("NuevosGifos");

fetch(`https://api.giphy.com/v1/gifs?${APIKEY}&ids=${ids}`).then(response => response.json())
    .then(json => {

        let arrayMyG = json.data;
        

        arrayMyG.forEach((value, index, array) => {            
            mygifos_localStorage(value.username, value.title, value.images.fixed_height.url, value.slug);
        });

        
        misGIFOS = JSON.parse(window.localStorage.getItem("mygifos"));
        

        if (misGIFOS == null || misGIFOS == undefined || misGIFOS.length == 0) {
            clickG = 0;
        } else {
            clickG = Math.round(misGIFOS.length / 12);
        }

        showGIFOS(misGIFOS);
    });



///////////noMine
/*function resultNoGIFOS() {
    //GIFOS sin Resultados
    let gridGifsNOResults = document.createElement("div");
    gridGifsNOResults.id = "gridGifsNOResults";
    gridGifsNOResults.classList.add("gridGifsNOResults");
    partMyGifos.appendChild(gridGifsNOResults);

    let sinContenidoGifos = document.createElement("img");
    sinContenidoGifos.alt = "sinContenidoGifos";
    sinContenidoGifos.src = "img/icon-mis-gifos-sin-contenido.svg";
    sinContenidoGifos.classList.add("sinContenidoGifos");
    gridGifsNOResults.appendChild(sinContenidoGifos);

    let pGIFOS = document.createElement("p");
    pGIFOS.id = "pGIFOS";
    pGIFOS.innerHTML = "¡Anímate a crear tu primer GIFO!";
    gridGifsNOResults.appendChild(pGIFOS);
}*/

function resultGIFOS(array) {
    //trae los estilos de grid
    let gridMyGifos = document.getElementById("gridMyGifos");

    //si no está creado , se genera el grid con el id
    if (gridMyGifos == undefined) {
        //Se crea el div de resultados favoritos
        gridMyGifos = document.createElement("div");
        gridMyGifos.classList.add("gridMyGifos");
        gridMyGifos.id = "gridMyGifos";
        //Se adjudica la ubicación a su padre partfav
        partMyGifos.appendChild(gridMyGifos);
    }

    let cota1 = clickCon * 12;
    
    let cota2 = () => {
        if (clickCon == 0) {
            return 12;
        } else {
            return (clickCon + 1) * 12;
        }
    };

    gifos12 = misGIFOS.slice(cota1, cota2());
 


    gifos12.forEach((value, index, array) => {
        //se crean los tags
        let principalDiv = document.createElement("div");
        principalDiv.id = "gridMyGifos_R";
        principalDiv.style.position = "relative";
        let imgGifo = document.createElement("img");

        //OJO: Probablemente los atributos de value cambien con el nuevo array
        imgGifo.src = value.urlgif;
        imgGifo.alt = "mygifo";
        imgGifo.id = "gifos";

        principalDiv.appendChild(imgGifo);
        //se agrega la funcionalidad del purlple tag a los tags de los gifs.

        let indice = index;
        if (con > 0) {
            indice += con * 12;
        }

        //OJO: Probablemente los atributos de value cambien con el nuevo array        
        principalDiv.onmouseenter = (event) => { principalDiv.appendChild(createPurpleGIFOS(value.usergif, value.titlegif, value.urlgif, indice, value.slug)) };
        principalDiv.onmouseleave = (event) => { principalDiv.removeChild(document.getElementById("cardGIFOS")) };
        //se agrega el tag que acabamos de crear al gridFav
        gridMyGifos.appendChild(principalDiv);
    });

    //Creación del btn dinámico
    let btnMyGifos = document.getElementById("btnMyGifos");
    if (misGIFOS.length > 12 && btnMyGifos == undefined) {
        btnMyGifos = document.createElement("button");
        btnMyGifos.id = "btnMyGifos";
        btnMyGifos.innerHTML = "VER MÁS";
        btnMyGifos.classList.add("btnVM");
        partMyGifos.appendChild(btnMyGifos);

        btnMyGifos.onclick = () => {
            clickCon += 1;
            resultGIFOS(array);

            if (clickG == clickCon) {
                btnMyGifos.remove();
            }
        }
    }

}

function createPurpleGIFOS(user, titleGif, url, index, slug) {
   
    // se crean los tags que componen al tag purple.
    let principalDiv = document.createElement("div");
    let imgHover = document.createElement("img");
    let downDiv = document.createElement("div");
    let imgDown = document.createElement("img");
    let maxDiv = document.createElement("div");
    let maxImg = document.createElement("img");
    let paragraph = document.createElement("p");
    let title = document.createElement("h4");

    // se agregan los atributos de los tags.
    principalDiv.classList.add("cardGIFOS");
    principalDiv.id = "cardGIFOS";

    imgHover.src = "img/icon_trash.svg";
    imgHover.alt = "iconTrashCG";
    imgHover.id = "trashCG";
    imgHover.classList.add("trashCG");
    //se agrega el evento para el corazon. Pero debe mantenerse activo e inactivo
    imgHover.onclick = () => { eraseGifo(user, titleGif, url, slug) };

    downDiv.classList.add("downCG");
    downDiv.id = "downCG";

    imgDown.src = "img/icon-download.svg";
    imgDown.alt = "iconDownCG";
    imgDown.id = "iconDownCG";
    imgDown.classList.add("iconDownCG");
    let downloadLink = createDownloadLink(imgDown, url);

    maxDiv.classList.add("maxCG");
    maxImg.src = "img/icon-max.svg";
    maxImg.alt = "iconMaxCG";
    maxImg.classList.add("iconMaxCG");
    maxImg.onclick = () => {
        expanMyG(url, user, titleGif, slug);
        sliderIndexExpGIFO = index;
    }
    paragraph.innerHTML = user;
    paragraph.classList.add("pCG");
    title.innerHTML = titleGif;
    title.classList.add("titleCG");

    // se hace append child para relacionar los tags
    downDiv.appendChild(downloadLink);
    maxDiv.appendChild(maxImg);

    principalDiv.appendChild(imgHover);
    principalDiv.appendChild(downDiv);
    principalDiv.appendChild(maxDiv);
    principalDiv.appendChild(paragraph);
    principalDiv.appendChild(title);
    return principalDiv;
}



//Función para borrar gifo del localstorage
function eraseGifo(user, titleGif, url, slug) {
    let misGIFOS = JSON.parse(window.localStorage.getItem("mygifos"));

    let gifIndex;
    misGIFOS.forEach((value, index) => {

        console.log("if de erase= ");
        console.log(value.slug == slug);
        console.log("VALUE SLUG");
        console.log(value.slug);
        console.log("SLUG");
        console.log(slug);
        if (value.slug == slug) {
            gifIndex = index;
        }
    });

    misGIFOS.splice(gifIndex, 1);
    localStorage.setItem("mygifos", JSON.stringify(misGIFOS));

    let arrayNG = localStorage.getItem("NuevosGifos").split(",");
    console.log(arrayNG);
    let newArrayNG = arrayNG.findIndex((id) => id == slug);
    arrayNG.splice(newArrayNG, 1);
    localStorage.setItem("NuevosGifos", arrayNG.join(","));
}

//Función para expandir MYGIFO
function expanMyG(url, user, titleGif, slug) {
    let main = document.getElementById("main");
    let section = document.createElement("section");
    section.id = "ctnGifMax";
    section.classList.add("ctnGifMax");
    main.insertBefore(section, main.childNodes[1]);

    let ctnArrowLeft = document.createElement("div");
    ctnArrowLeft.id = "IzqMax";
    ctnArrowLeft.classList.add("IzqMax");
    ctnArrowLeft.onclick = () => { flechaIzqMaxGIFO(url, user, titleGif, slug) };
    section.appendChild(ctnArrowLeft);

    let imgArrowLeft = document.createElement("img");
    imgArrowLeft.src = "img/button-left.svg";
    imgArrowLeft.id = "flechaIzqMax";
    imgArrowLeft.alt = "flechaIzqMax";
    ctnArrowLeft.appendChild(imgArrowLeft);

    let imgCloseMax = document.createElement("img");
    imgCloseMax.src = closeColor(imgCloseMax);
    imgCloseMax.id = "closeMax";
    imgCloseMax.alt = "close";    
    imgCloseMax.classList.add("closeMax");
    imgCloseMax.onclick = () => { removeGifoMax(); }
    section.appendChild(imgCloseMax);


    let gifMax = document.createElement("img");
    gifMax.classList.add("gifMax");
    gifMax.src = url; //URL DEL GIF SELECCIONADO
    gifMax.id = "gifMax";
    section.appendChild(gifMax);

    let pUser = document.createElement("p");
    pUser.id = "pUser";
    pUser.innerHTML = user; //EL USERNAME DEL GIF
    section.appendChild(pUser);

    let titleGIFO = document.createElement("h3");
    titleGIFO.id = "titleGIFO";
    titleGIFO.innerHTML = titleGif; //EL TÍTULO DEL GIF
    section.appendChild(titleGIFO);

    let imgFavMax = document.createElement("img");
    imgFavMax.src = "img/icon_trash.svg";
    imgFavMax.alt = "iconTrashCG";
    imgFavMax.id = "trashCG";
    imgFavMax.classList.add("iconFavMax");
    imgFavMax.onclick = () => { eraseGifo(user, titleGif, url, slug) };
    section.appendChild(imgFavMax);

    let imgDownMax = document.createElement("img");
    imgDownMax.src = "img/icon-download.svg";
    imgDownMax.alt = "iconDownMax";
    imgDownMax.id = "iconDownMax";
    imgDownMax.classList.add("iconDownMax");
    let downloadMax = createDownloadLink(imgDownMax, url);
    downloadMax.id = "downloadMax";
    downloadMax.appendChild(imgDownMax);
    section.appendChild(downloadMax);

    let ctnArrowRight = document.createElement("div");
    ctnArrowRight.id = "DerMax";
    ctnArrowRight.classList.add("DerMax");
    ctnArrowRight.onclick = () => { flechaDerMaxGIFO(url, user, titleGif, slug) };
    section.appendChild(ctnArrowRight);

    let imgArrowRight = document.createElement("img");
    imgArrowRight.src = "img/button-right.svg";
    imgArrowRight.id = "flechaDerMax";
    imgArrowRight.alt = "flechaDerMax";
    ctnArrowRight.appendChild(imgArrowRight);

    createCSS();

}

//Declaración de funciones para flechas izquierda y derecha de gif expandido de misgifos
let sliderIndexExpGIFO = 0;

function flechaIzqMaxGIFO(url, user, titleGifo, slug) {
    let maxArray = misGIFOS.length;

    sliderIndexExpGIFO -= 1;
    
    if (sliderIndexExpGIFO == - 1) {
        sliderIndexExpGIFO = maxArray - 1;
    }

    gifCarruGIFOS(sliderIndexExpGIFO, url, user, titleGifo, slug)
}

function flechaDerMaxGIFO(url, user, titleGifo, slug) {
    let maxArray = misGIFOS.length;

    sliderIndexExpGIFO += 1;

    if (sliderIndexExpGIFO == maxArray) {
        sliderIndexExpGIFO = 0;
    }

    gifCarruGIFOS(sliderIndexExpGIFO, url, user, titleGifo, slug);
}

function gifCarruGIFOS(index, url, user, titleGif, slug) {
    let gifo = document.getElementById("gifMax");
    let pUser = document.getElementById("pUser");
    let titleGIFO = document.getElementById("titleGIFO");
    let imgFavMax = document.getElementById("trashCG");

    gifo.src = misGIFOS[index].urlgif;
    pUser.innerHTML = misGIFOS[index].usergif;
    titleGIFO.innerHTML = misGIFOS[index].titlegif;
        
    imgFavMax.onclick = () => { eraseGifo(user, titleGif, url, slug) };
    
    fetch(misGIFOS[index].urlgif)
        .then(response => response.blob())
        .then(blob => {
            let linkdown = document.getElementById("downloadMax");
            const url = URL.createObjectURL(blob);
            linkdown.href = url;
            linkdown.download = "myGiphy.gif";

        }).catch(console.error);
}



//LOCALSTORAGE DE MYGIFOS
function mygifos_localStorage(user, titleGifo, url, slug) {

    let gif = {
        usergif: user,
        urlgif: url,
        titlegif: titleGifo,
        slug: slug
    };

    let localStorage_mygifos = JSON.parse(localStorage.getItem("mygifos"));

    if (localStorage_mygifos == undefined || localStorage_mygifos == null || localStorage_mygifos == "") {
        localStorage_mygifos = [];
    }

    let repetidoMyG = false;
    localStorage_mygifos.forEach(value => {

        //Si son iguales nos regresa un 0
        if (value.slug.localeCompare(gif.slug) == 0) {
            repetidoMyG = true;
        }
    });

    if (!repetidoMyG) {
        localStorage_mygifos.push(gif);
    }   

    localStorage.setItem("mygifos", JSON.stringify(localStorage_mygifos));
}


//////////////////////////////////////////////////////////////////// NO TIENE EL BOTON DE TRASH, SÓLO EL DE FAV Y ESE NO SE UTILIZA EN MIS GIFOS


const btnNavMyGifos = document.getElementById('btn-nav-myGifos')
const logoGIFOHome = document.getElementById('logo-img')
const containerResults = document.getElementById('search-results')

const gifoSectionContainer = document.getElementById('create-GIFO-section')
const trenGIFOcover = document.getElementById('trendingGIFOS')

const principalCoverSection = document.getElementById('cover-page')
const favoritosCover = document.getElementById('favoritos-cover')
const mygifoEmptyContainer = document.getElementById('myGifo-empty-container')
const myGifoContainer = document.getElementById('MyGifos-container')
const myGifosGIFOSContainerSection = document.getElementById('MisGifos-cover')


btnNavMyGifos.addEventListener('click', () => { // MOSTRAR LA PANTALLA DE MIS GIFOS
    containerResults.style.display = 'none'
    principalCoverSection.style.display = 'none'
    favoritosCover.style.display = 'none'
    gifoSectionContainer.style.display = 'none'
    myGifosGIFOSContainerSection.style.display = 'block'

    let myGifs = JSON.parse(localStorage.getItem("myGIFs")) /// Variable de los gifs de local storage
    console.log(myGifs)
    if (myGifs != null) {   // si hay gifs
        if (myGifs.length === 0) { // si es igual a 0 se muestra que no hay gifos
            mygifoEmptyContainer.style.display = 'block'
            myGifoContainer.style.display = 'none'

        } else {            // de otra forma se despliga el grid y se llama la función createCardsMisGifos()
            mygifoEmptyContainer.style.display = 'none'
            myGifoContainer.innerHTML = ''
            createCardsMisGifos()
            myGifoContainer.style.display = 'grid'
        }
    } else {   /// de otra forma si no hay gifs, se despliega la pantalla de vació
        mygifoEmptyContainer.style.display = 'block'
        myGifoContainer.style.display = 'none'

    }
})



const createCardsMisGifos = () => {
    let searchResult = JSON.parse(localStorage.getItem("myGIFs")) /// ES LA MISMA QUE myGifs

    /** To  get Blob for download*/
    const getImage = async (urlImage) => { /// obtengo el blob del gif
        try {
            let response = await fetch(urlImage)
            let gifBlob = await response.blob()

            return gifBlob

        } catch (error) {
            console.log(error)
        }
    }
    /** */

    searchResult.forEach(gifElement => {   
        const imageURL = "https://media.giphy.com/media/" + gifElement +"/giphy.gif" /// URL DEL GIF
        // const user = gifElement.user
        // const title = gifElement.title

        const figureContainer = document.createElement('figure')  /// creo un contenedor 
        figureContainer.classList.add("figure-myGifos-Container")

        const imgTag = document.createElement('img')   //// CREO UNA IMAGEN Y ASIGNO LA URL DEL GIF
        imgTag.src = imageURL
        imgTag.classList.add("myGifos-results-styles")


        const divModalContainer = document.createElement("div")  /// CREO UN DIV PARA MODAL
        divModalContainer.classList.add("modal-myGifos-class")

        const divIconSection = document.createElement("div")    /// DIV CON CLASE HOVER
        divIconSection.classList.add("icons-section-hoverMyGifos")

        const figureIconLike = document.createElement("figure")  /// CREO UNA FIGURA
        const figureIconDownload = document.createElement("a")  /// CREO UN ANCHOR
        getImage(imageURL).then((blob => {                      /// LLAMO LA FUNCION DEL BLOB Y ASIGNO EL VALOR DE LA URL
            const urlB = URL.createObjectURL(blob)

            figureIconDownload.href = urlB                      /// A LA FIGURA LE ASIGNO LA REFERENCIA DEL BLOB CREADO CON LA URL
            figureIconDownload.download = 'myGiphy.gif'         /// PARA QUE LA BAJO? BUSCAR DOWNLOAD
        })).catch(console.error)
        const figureIconMax = document.createElement("figure")  /// FIGURA QUE CONTIENE LOS BOTONES DE GUSTAR, BAJAR Y MAXIMIZAR
        figureIconLike.classList.add("figure-icons")
        figureIconDownload.classList.add("figure-icons")
        figureIconMax.classList.add("figure-icons")

        const iconLikeImg = document.createElement("img")   // IMG DE LOS BOTONES
        const iconDownLoadImg = document.createElement("img")
        const iconMaxImg = document.createElement("img")

        // let arrayGifos = JSON.parse(localStorage.getItem("arrayGifos"))
        // if (arrayGifos === null) {
        //     arrayGifos = []
        //     localStorage.setItem("arrayGifos", JSON.stringify(arrayGifos))
        // }
        // if (arrayGifos.length === 0) {
        //     iconLikeImg.src = "./images/icon-fav-hover.svg"
        // } else {
        //     if (!arrayGifos.find(element => element.url === imageURL)) {
        //         iconLikeImg.src = "./images/icon-fav-hover.svg"
        //     } else {
        //         iconLikeImg.src = "./images/icon-fav-active.svg"
        //     }
        // }



        iconLikeImg.classList.add('btn-img-iconLike-hover')     /// HOVER BOTONES
        iconDownLoadImg.src = "./images/icon-download.svg"
        iconDownLoadImg.classList.add('btn-img-iconDownload-hover')
        iconMaxImg.src = "./images/icon-max.svg"
        iconMaxImg.classList.add('btn-img-iconMax-hover')

        figureIconLike.appendChild(iconLikeImg)                 /// SE AGREGAN A LA FIGURA LOS BOTONES
        figureIconDownload.appendChild(iconDownLoadImg)
        figureIconMax.appendChild(iconMaxImg)

        divIconSection.appendChild(figureIconLike)              /// SE AGREGAN AL DIV LOS BOTONES
        divIconSection.appendChild(figureIconDownload)
        divIconSection.appendChild(figureIconMax)

        divModalContainer.appendChild(divIconSection)           /// DIV DENTRO DE MODAL


        // const divCaptionSection = document.createElement("div")
        // divCaptionSection.classList.add("caption-section-hoverMygifos")

        // // const pTagUser = document.createElement('p')
        // // pTagUser.classList.add("userCaption-myGifos")
        // // const pTagtitle = document.createElement('p')
        // // pTagtitle.classList.add("tituloCaption-myGifos")
        // // pTagUser.innerHTML = user
        // // pTagtitle.innerHTML = title

        // // divCaptionSection.appendChild(pTagUser)
        // // divCaptionSection.appendChild(pTagtitle)

        // divModalContainer.appendChild(divCaptionSection)


        figureContainer.appendChild(imgTag)
        figureContainer.appendChild(divModalContainer)      /// DIV DENTRO DE FIGURA

        myGifoContainer.appendChild(figureContainer)        /// FIGURA DENTRO DEL CONTENEDOR
    })

    const gifsFromSearchResult = document.querySelectorAll('.myGifos-results-styles') /////////////CLASE DE LA IMAGEN QUE CONTIENE EL GIF
    const gifsFromSearchResultArray = Array.from(gifsFromSearchResult)  /// GENERA UN ARREGLO ITERABLE DEL RESULTADO DE LOS GIFS


    gifsFromSearchResultArray.forEach(gifElement => { // A CADA UNO DE LOS GIFS LES AGREGA UN EVENTO
        gifElement.addEventListener('click', event => {
            const imageToShow = event.target.attributes.src.nodeValue   /// La propiedad Nodo.nodeValue devuelve o actualiza el valor del nodo actual.
            const image = document.getElementById("modal-content-id")   /// EL GIF EN MODAL
            image.src = imageToShow                                     /// LA FUENTE DE LA IMAGEN ES LA MISMA EN EL MODAL ????

            const iconLikeImg = document.querySelector('.like-icon')    /// LLAMO AL ICONO LIKE

            let arrayGifos = JSON.parse(localStorage.getItem("arrayGifos")) /// OBTENGO EL ARREGLO DE GIFOS
            if (arrayGifos === null) {                                      /// SI VALOR NULO
                arrayGifos = []                                             /// ARRAY VACIO
                localStorage.setItem("arrayGifos", JSON.stringify(arrayGifos)) /// CONVERTIR EN STRING NUESTRO ARRAY
            }
            if (arrayGifos.length === 0) {                                  /// SI EL LARGO DE NUESTRO ARREGLO ES 0, ????????
                iconLikeImg.src = "./images/icon-fav-hover.svg"
            } else {
                if (!arrayGifos.find(element => element.url === imageToShow)) {
                    iconLikeImg.src = "./images/icon-fav-hover.svg"
                } else {
                    iconLikeImg.src = "./images/icon-fav-active.svg"
                }
            }

            const indexOfElement = (gifsFromSearchResultArray.indexOf(event.target))  /// El método indexOf() retorna el primer índice en el que se puede encontrar un elemento dado en el array, ó retorna -1 si el elemento no esta presente.
            const userGifo = searchResult[indexOfElement].source_tld        /// USUARIO DEL GIF
            const titleGifo = searchResult[indexOfElement].title            /// TITULO DEL GIF
            const userCaption = document.getElementById("userCaption-id")   /// ID DEL USUARIO EN HTML
            const titleCaption = document.getElementById("tituloCaption-id") /// /// ID DEL TITULO EN HTML
            userCaption.innerHTML = userGifo                                   /// PINTARLOS EN HTML
            titleCaption.innerHTML = titleGifo

            const modal = document.getElementById("myModal")                //TRAER EL MODAL Y VISUALIZARLO CON LOS BOTONES
            modal.style.display = "block"

            const bodyTag = document.querySelector('body')
            bodyTag.style.overflow = 'hidden'

            const closeBtn = document.getElementById("close-btn-modal-id")      
            closeBtn.addEventListener("click", () => {
                modal.style.display = "none"
                bodyTag.style.overflow = 'visible'
            })
        })
        /** */
        gifElement.addEventListener('mouseenter', (event) => {              /// ADD EVENT LISTENER A CADA GIF (VER DIFERENCIAS CON ANTERIOR) MODAL DESKTOP
            const modalElement = event.target.nextElementSibling
            const url = event.target.currentSrc                     
            const iconElement = event.target.nextElementSibling.childNodes[0].childNodes[0].childNodes[0]
            console.log(event)
            let widthScreen = window.innerWidth
            if (widthScreen >= 1025) {
                modalElement.style.display = "block"
            };
            window.addEventListener("resize", () => {
                widthScreen = window.innerWidth
                if (widthScreen < 1025) {
                    modalElement.style.display = "none"
                }
            })

            let arrayGifos = JSON.parse(localStorage.getItem("arrayGifos"))

            if (arrayGifos === null) {
                arrayGifos = []
                //arrayGifos.push({ url: url, user: user, title: title, })
                localStorage.setItem("arrayGifos", JSON.stringify(arrayGifos))
            } else {
                if (!arrayGifos.find(element => element.url === url) || arrayGifos.length === 0) {
                    iconElement.attributes[0].nodeValue = './images/icon-fav-hover.svg'

                } else {
                    const index = arrayGifos.findIndex(element => element.url === url)
                    iconElement.attributes[0].nodeValue = './images/icon-fav-active.svg'

                }
            }
        })
    })

    /** */
    const figuresContainers = document.querySelectorAll(".modal-myGifos-class"); /// llamo a todos?!??! VERIFICAR

    figuresContainers.forEach(x => {
        x.addEventListener('mouseleave', event => {
            const modalElement = event.target

            modalElement.style.display = "none"
        })
    })

    /** Section to add event listeners to the icon buttons in the hover cards */   ///AGREGAR ADDEVENTLISTENERS A LSO BOTONES CUANDO HAY HOVER
    const iconMaxArray = document.querySelectorAll(".btn-img-iconMax-hover")

    iconMaxArray.forEach(icon => {
        icon.addEventListener('click', (event) => {
            const imageToShow = event.srcElement.offsetParent.offsetParent.parentElement.childNodes[0].src
            const image = document.getElementById("modal-content-id")
            image.src = imageToShow
            const iconLikeImg = document.querySelector('.like-icon')

            let arrayGifos = JSON.parse(localStorage.getItem("arrayGifos"))
            if (arrayGifos === null) {
                arrayGifos = []
                localStorage.setItem("arrayGifos", JSON.stringify(arrayGifos))
            }
            if (arrayGifos.length === 0) {
                iconLikeImg.src = "./images/icon-fav-hover.svg"
            } else {
                if (!arrayGifos.find(element => element.url === imageToShow)) {
                    iconLikeImg.src = "./images/icon-fav-hover.svg"
                } else {
                    iconLikeImg.src = "./images/icon-fav-active.svg"
                }
            }

            // const userGifo = event.srcElement.offsetParent.nextSibling.firstChild.textContent
            // const titleGifo = event.srcElement.offsetParent.nextSibling.lastChild.textContent
            // const userCaption = document.getElementById("userCaption-id")
            // const titleCaption = document.getElementById("tituloCaption-id")
            // userCaption.innerHTML = userGifo
            // titleCaption.innerHTML = titleGifo

            const modal = document.getElementById("myModal")
            modal.style.display = "block"

            const bodyTag = document.querySelector('body')
            bodyTag.style.overflow = 'hidden'

            const closeBtn = document.getElementById("close-btn-modal-id")
            closeBtn.addEventListener("click", () => {
                modal.style.display = "none"
                bodyTag.style.overflow = 'visible'
            })
        })
    })

    /** Store GIFOS in LocalStorage*/                       //// ??????????
    let iconLikeArray = document.querySelectorAll('.btn-img-iconLike-hover') //// clase con estilo hover like ESTO ES DE FAVORITOS NO DE MI GIFO...


    iconLikeArray.forEach(icon => {
        icon.addEventListener('click', (event) => {
            const urlToSave = event.srcElement.offsetParent.offsetParent.parentElement.childNodes[0].src
            const user = event.srcElement.offsetParent.nextSibling.firstChild.textContent
            const title = event.srcElement.offsetParent.nextSibling.lastChild.textContent

            let arrayGifos = JSON.parse(localStorage.getItem("arrayGifos"))

            if (arrayGifos === null) {
                arrayGifos = []
                arrayGifos.push({ url: urlToSave, user: user, title: title, })
                localStorage.setItem("arrayGifos", JSON.stringify(arrayGifos))
            } else {
                if (!arrayGifos.find(element => element.url === urlToSave) || arrayGifos.length === 0) {
                    arrayGifos.push({ url: urlToSave, user: user, title: title, })
                    localStorage.setItem("arrayGifos", JSON.stringify(arrayGifos))
                    event.target.src = './images/icon-fav-active.svg'
                } else {
                    const index = arrayGifos.findIndex(element => element.url === urlToSave)
                    arrayGifos.splice(index, 1)
                    localStorage.setItem("arrayGifos", JSON.stringify(arrayGifos))
                    event.target.src = './images/icon-fav-hover.svg'
                }
            }
        })
    })
    /** */

}
