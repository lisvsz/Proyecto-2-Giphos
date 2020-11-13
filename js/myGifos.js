//Variables 'Mis Gifos'

/*let misGifos; //DEFINIDA ABAJO
let gifos12 = [];
let clickCon = 0;
let clickG; //Gif fav 12
let con = 0;*/

let noMine = document.getElementById('noMine');
let gridMyGif = document.getElementById('grid-mine');
let ids = localStorage.getItem("NewGifs");
//Local storage 'Mis Gifos'
function arrayMyGifos (id) {
    //let ids = localStorage.getItem("NewGifs");
    let myGifosArray = [];

    if ( ids == undefined || ids == null){
        myGifosArray.push(id);
    } else{
        //myGifosArray = JSON.parse(ids);
        console.log(ids);
        console.log(myGifosArray);
        let sameId = myGifosArray.find( fav => fav == id );
        if (sameId == undefined || sameId == null){
            myGifosArray.push(id);
        }
    }
    localStorage.setItem("NewGifs", JSON.stringify(myGifosArray)); 
}

/*if(localStorage.getItem("NewGifs") == undefined ) {
    localStorage.setItem("NewGifs", "ys0TZuRXUbbDD7tZzM, KgOBWvi4oSC7heYKn0");
}*/

/*function showMyGifos(array) {
if(array == null || array.length == 0 || array == undefined) {
    noMine.style.display = 'inline'; //noMine(); función resultNoGIFOS
    } else if (array.length > 0) {
        resultGifos(array); //funcion resultGIFOS(array)
    }
}*/


/*async function getMyGif (ids){
    //Parámetros para el request
    let url = `https://api.giphy.com/v1/gifs?api_key=PlzoJMPs7k0ixQrxRj53HDBKPN2s0zqT&ids=${ids}`;
    let resp = await fetch(url);
    let gif = await resp.json();
    console.log(gif);
    return gif;
}*/

function addGifMine(ids) {
    fetch(`https://api.giphy.com/v1/gifs?api_key=PlzoJMPs7k0ixQrxRj53HDBKPN2s0zqT&ids=${ids}`).then(response => response.json())
    .then(json => {
        let arrayMyG = json.data;
        console.log(arrayMyG);

        for( let i=0; i < arrayMyG.length; i++) {
        noMine.style.display = 'none';

        let imgMyGif = arrayMyG[i].images.downsized.url;
        console.log(imgMyGif);

        let myGifTitle = arrayMyG[i].title;
        console.log(myGifTitle);
        
        let myGifUser = arrayMyG[i].username;
        console.log(myGifUser);

        let myGifIndex = arrayMyG[i];

        //Guardar en local storage
        arrayMyGifos(arrayMyG[i].id)

        let myGifImg = document.createElement('img');
        myGifImg.alt = 'gif';    
        myGifImg.src = imgMyGif;

        let cardMGif = document.createElement('div');
        cardMGif.append(myGifImg);
        gridMyGif.className = 'gridFormat'; 
        gridMyGif.appendChild(cardMGif);
        
        if (window.matchMedia("(min-width: 1366px)").matches) {
            cardMGif.style.height = '200px';
            cardMGif.style.width = '260px';
            cardMGif.appendChild(hoverMyGifs (imgMyGif, myGifUser, myGifTitle,myGifIndex));
            
            let mGHoverCard = cardMGif.querySelector('.gifScard');
            mGHoverCard.style.visibility = 'hidden';
            
            cardMGif.addEventListener('mouseover', () => {
                mGHoverCard.style.visibility = 'visible';
            });

            cardMGif.addEventListener('mouseout', () => {
                mGHoverCard.style.visibility = 'hidden';
            })
        }
    }
    });
}

addGifMine(ids);
//Función para mostrar los resultados (grid, mouse enter, mouse out, botón dinámico)

//Función de hover morado con iconos

function hoverMyGifs (imgMyGif, myGifUser, myGifTitle, myGifIndex){
    //Diseño de tarjeta morada
    let purpleCardM = document.createElement('div');
    purpleCardM.classList.add('gifScard');

    //Diseño de botón borrar
    let btnTrash = document.createElement('button');
    btnTrash.classList.add('btnHover');
    btnTrash.style.cursor = 'pointer';
    btnTrash.style.left = '50px';
    btnTrash.style.top = '10px';
    let imgTrash = document.createElement('img');
    imgTrash.alt = 'icon-trash';
    imgTrash.src = 'assets/icon_trash.svg';
    imgTrash.style.height = '18.3px';
    imgTrash.style.width = '16.7px';
    imgTrash.style.margin = 'auto';
    btnTrash.appendChild(imgTrash);
    btnTrash.addEventListener('click', ()=> {
        //storage.removeItem(imgMygif);
        imgMyGif.remove();      ///////////////////// 011120 ELIMINA el primer gif
        myGifIndex.remove();
        //delete imgMyGif;
    })

    //Diseño botón descargar
    let btnDownload = document.createElement('button');
    btnDownload.classList.add('btnHover');
    btnDownload.style.cursor = 'pointer';
    btnDownload.style.left = '61px';
    btnDownload.style.top = '10px';
    let imgDown = document.createElement('img');
    imgDown.alt = 'icon-download';
    imgDown.src = 'assets/icon-download.svg';
    imgDown.style.height = '18.3px';
    imgDown.style.width = '16.7px';
    imgDown.style.margin = 'auto';
    btnDownload.appendChild(imgDown);
    //Funcionalidad del botón descargar
    btnDownload.addEventListener('click', () => {
        downloadGif(gridMyGif, imgMyGif);
    })
    
    //Diseño botón expandir
    let btnMax = document.createElement('button');
    btnMax.classList.add('btnHover');
    btnMax.style.cursor = 'pointer';
    btnMax.style.left = '72px';
    btnMax.style.top = '10px';
    let imgMax = document.createElement('img');
    imgMax.alt = 'icon-max';
    imgMax.src = 'assets/icon-max.svg';
    imgMax.style.height = '16.7px';
    imgMax.style.width = '16.7px';
    imgMax.style.margin = 'auto';
    btnMax.appendChild(imgMax);
    //Funcionalidad botón expandir MY GIFO
    btnMax.addEventListener ('click', () => {
        overlay.style.visibility = 'visible';
        gifMax.src = imgMyGif;
        userMax.innerHTML = myGifUser;
        userMax.style.right = '635px';
        titleMax.innerHTML = myGifTitle;
        titleMax.style.right = '635px';
    });

    //Diseño Usuario
    let myGUser = document.createElement('p');
    myGUser.classList.add('userSName');
    myGUser.innerHTML = myGifUser;

    //Diseño Título
    let myGTitle = document.createElement('p');
    myGTitle.classList.add('gifSTitle');
    myGTitle.innerHTML = myGifTitle;

    //Se inserta todo en el div principal
    purpleCardM.appendChild(btnTrash);
    purpleCardM.appendChild(btnDownload);
    purpleCardM.appendChild(btnMax);
    purpleCardM.appendChild(myGUser);
    purpleCardM.appendChild(myGTitle);
    return purpleCardM;

}

//Función descargar Mi Gif

function downloadMyGif(gridMyGif, urlmg) {
    //Se genera anchor 
    let downloadLink = document.createElement("a");
    //Se genera blob
    fetch(urlmg)
        .then(response => response.blob())
        .then(blob => {
            const urlmg = URL.createObjectURL(blob);
            downloadLink.href = urlmg;
            downloadLink.download = "myGif.gif";
            gridMyGif.appendChild(downloadLink);
            downloadLink.click();
            downloadLink.remove();
    }).catch(console.error);
}

//Función para borrar gif

//Función carrusel gif expandido


//LOCALSTORAGE DE MYGIFOS
/*function mygifos_localStorage(user, titleGifo, url, slug) {

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
*/

