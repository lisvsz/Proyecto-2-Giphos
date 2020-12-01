//Variables 'Mis Gifos'

let noMine = document.getElementById('noMine');
let gridMyGif = document.getElementById('grid-mine');
let ids = localStorage.getItem("NewGifs");

import {createBtnDownloadModal} from './script.js';
//Local storage 'Mis Gifos'
export function readMyGifos() {
    let ids = localStorage.getItem("NewGifs");
    let myGifosArray = JSON.parse(ids);
    gridMyGif.innerHTML = " ";
    myGifosArray.forEach(element => {
        console.log('Getting mine', element);
        addGifMine(element);
    });
}

export function arrayMyGifos (id) {
    let ids = localStorage.getItem("NewGifs");
    let myGifosArray = [];

    if ( ids == undefined || ids == null){
        myGifosArray.push(id);
    } else{
        myGifosArray = JSON.parse(ids);
        console.log(ids);
        console.log(myGifosArray);
        let sameId = myGifosArray.find( fav => fav == id );
        if (sameId == undefined || sameId == null){
            myGifosArray.push(id);
        }
    }
    localStorage.setItem("NewGifs", JSON.stringify(myGifosArray)); 
}

function removeMyGifos (id) {
    let myGifosArray = [];
    let gif = myGifosArray.indexOf(id);
    myGifosArray.splice(gif, 1);
    localStorage.setItem("NewGifs", JSON.stringify(myGifosArray));

    return gif;
}

export function addGifMine(ids) {
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

        let myGifId = arrayMyG[i].id;
        console.log(myGifId);

        //Guardar en local storage
        arrayMyGifos(myGifId);

        let myGifImg = document.createElement('img');
        myGifImg.alt = 'gif';    
        myGifImg.src = imgMyGif;

        let cardMGif = document.createElement('div');
        cardMGif.append(myGifImg);
        gridMyGif.className = 'gridFormat'; 
        gridMyGif.appendChild(cardMGif);
        
        if (window.matchMedia("(min-width: 1080px)").matches) {
            cardMGif.style.height = '180px';
            cardMGif.style.width = '240px';
            myGifImg.style.height = '180px';
            myGifImg.style.width = '240px';
            cardMGif.appendChild(hoverMyGifs (imgMyGif, myGifUser, myGifTitle, myGifId));
            
            let mGHoverCard = cardMGif.querySelector('.gifScard');
            mGHoverCard.style.visibility = 'hidden';
            
            cardMGif.addEventListener('mouseover', () => {
                mGHoverCard.style.visibility = 'visible';
            });

            cardMGif.addEventListener('mouseout', () => {
                mGHoverCard.style.visibility = 'hidden';
            })
        } else if (window.matchMedia("(max-width: 800px)").matches) {
            cardMGif.addEventListener('click', () => {
            gifMax.src = imgMyGif;
            userMax.innerHTML = myGifUser;
            overlay.style.visibility = 'visible';
            titleMax.innerHTML = myGifTitle;
            // Funcionalidad botón de descarga en Modal en Treding Gif
            let btnTrashMax = createBtnTrash();
            iconsMax.appendChild(btnTrashMax);
            btnTrashMax.addEventListener('click', (e)=> {
                e.stopImmediatePropagation();
                removeMyGifos (id);
            })
            // Funcionalidad botón de descarga en Modal en Treding Gif
            let btnDownloadMax = createBtnDownloadModal();
            iconsMax.appendChild(btnDownloadMax);
            btnDownloadMax.addEventListener('click', (e)=> {
                e.stopImmediatePropagation();
                downloadMyGif(gridMyGif, gifMax.src);
            });
            btnCloseMax.addEventListener('click', () => {
                overlay.style.visibility = 'hidden';
                let btnTrashMax = document.getElementsByClassName('btnTrashMax');
                btnTrashMax[0].remove();
                let btnDownloadMax = document.getElementsByClassName('btnDownloadMax');
                btnDownloadMax[0].remove();
            })
        })
    }
    }
    });
}
addGifMine(ids);

//Función de hover morado con iconos
function hoverMyGifs (imgMyGif, myGifUser, myGifTitle, id){
    //Diseño de tarjeta morada
    let purpleCardM = document.createElement('div');
    purpleCardM.classList.add('gifScard');

    //Diseño de botón borrar
    let btnTrash = document.createElement('button');
    btnTrash.classList.add('btnHover');
    btnTrash.style.cursor = 'pointer';
    btnTrash.style.left = '40px';
    btnTrash.style.top = '5px';
    let imgTrash = document.createElement('img');
    imgTrash.alt = 'icon-trash';
    imgTrash.src = 'assets/icon_trash.svg';
    imgTrash.style.height = '18.3px';
    imgTrash.style.width = '16.7px';
    imgTrash.style.margin = 'auto';
    btnTrash.appendChild(imgTrash);
    btnTrash.addEventListener('click', () => {
        removeMyGifos(id);
        alert('Se ha eliminado el Gif, actualiza la página para ver los cambios')
    })

    //Diseño botón descargar
    let btnDownload = document.createElement('button');
    btnDownload.classList.add('btnHover');
    btnDownload.style.cursor = 'pointer';
    btnDownload.style.left = '51px';
    btnDownload.style.top = '5px';
    let imgDown = document.createElement('img');
    imgDown.alt = 'icon-download';
    imgDown.src = 'assets/icon-download.svg';
    imgDown.style.height = '18.3px';
    imgDown.style.width = '16.7px';
    imgDown.style.margin = 'auto';
    btnDownload.appendChild(imgDown);
    //Funcionalidad del botón descargar
    btnDownload.addEventListener('click', () => {
        downloadMyGif(gridMyGif, imgMyGif)
    })
    
    //Diseño botón expandir
    let btnMax = document.createElement('button');
    btnMax.classList.add('btnHover');
    btnMax.style.cursor = 'pointer';
    btnMax.style.left = '62px';
    btnMax.style.top = '5px';
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

        // Funcionalidad botón de descarga en Modal en Treding Gif
        let btnTrashMax = createBtnTrash();
        iconsMax.appendChild(btnTrashMax);
        btnTrashMax.addEventListener('click', (e)=> {
            e.stopImmediatePropagation();
            removeMyGifos (id);
        })
        // Funcionalidad botón de descarga en Modal en Treding Gif
        let btnDownloadMax = createBtnDownloadModal();
        iconsMax.appendChild(btnDownloadMax);
        btnDownloadMax.addEventListener('click', (e)=> {
            e.stopImmediatePropagation();
            downloadMyGif(gridMyGif, gifMax.src);
        })

        let btnCloseMax = document.getElementById('btnCloseMax');
        btnCloseMax.addEventListener('click', () => {
            overlay.style.visibility = 'hidden';
            let btnTrashMax = document.getElementsByClassName('btnTrashMax');
            btnTrashMax[0].remove();
            let btnDownloadMax = document.getElementsByClassName('btnDownloadMax');
            btnDownloadMax[0].remove();
        })
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

//Botón Trash OVERLAY
function createBtnTrash() {
    let btnTrashMax = document.createElement('button');
    btnTrashMax.classList.add('btnTrashMax');
    let imgTrash = document.createElement('img');
    imgTrash.alt = 'icon-fav';
    imgTrash.src = 'assets/icon_trash.svg';
    imgTrash.style.height = '15.9px';
    imgTrash.style.width = '18px';
    
    btnTrashMax.appendChild(imgTrash);
    return btnTrashMax;
}