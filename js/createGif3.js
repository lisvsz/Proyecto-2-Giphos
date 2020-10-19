// Funcionalidad de la sección 'Crear tu Gif'
    ////INICIALIZAR LOCALSTORAGE MYGIFOS /// REVISAR
    if(localStorage.getItem("NuevosGifos") == undefined ) {
    localStorage.setItem("NuevosGifos", "fvMyDds5Bc6ufJHdLs");
    }

    //Variables botones
    let btnStart = document.getElementById('btn-start');
    let btnRecord = document.getElementById('btn-record'); ////= capturar = record
    let btnFinish = document.getElementById('btn-finish');
    let btnRepeat = document.getElementById('btn-repeat');
    let btnUpload = document.getElementById('btn-upload');
    let btn1 = document.getElementById('btn1');
    let btn2 = document.getElementById('btn2');
    let btn3 = document.getElementById('btn3');
        //Variable para manejar el timer
    let recording = true;
        //Variables visualización y video
    let timeStamp = document.getElementById('timeStamp')
    let video = document.getElementById('video');
    let videoCover = document.getElementById('videoCover');
    let videoStep1 = document.getElementById('videoStep1');
    let videoStepUpload = document.getElementById('videoStepUpload');
    let videoSuccessUpload = document.getElementById('videoSuccessUpload');
        //Variable Video
    let constraints = { audio: false, video: { width: 480, height: 320 } };

    //Objeto recorder
    let recorder;
    let form;
    
    //Funcionalidad del botón 'Comenzar'
    btnStart.addEventListener('click', () => { 
        btnStart.style.display = 'none';
        videoCover.style.display = 'none';
        btn1.style.backgroundColor = '#572EE5';
        btn1.style.color = '#FFFFFF';
        videoStep1.style.display = 'block';
    });
    
    //Funcionalidad del botón 2
    btn2.addEventListener('click', () => {
        //Visualización de botones
        btnRecord.style.display = 'inline';
        btn1.style.backgroundColor = '#FFFFFF';
        btn1.style.color = '#572EE5';
        btn2.style.backgroundColor = '#572EE5';
        btn2.style.color = '#FFFFFF';
        cameraS();
    });
    
    //Funcionalidad del botón 'grabar'
    btnRecord.addEventListener('click', () => {
        btnRecord.style.display = 'none';
        btnFinish.style.display = 'inline';
        timeStamp.style.display = 'inline';
        getRecord(recorder);
        getDuration();
    });
    
    //Funcionalidad del botón 'finalizar'
    btnFinish.addEventListener('click', () => {
        btnRepeat.style.display = 'inline';
        btnFinish.style.display = 'none';
        btnUpload.style.display = 'inline';
        btnUpload.style.left = '54px';
        timeStamp.style.display = 'none';
        stopRecord(recorder);
    });
    
    //Funcionalidad del botón 'repetir captura'
    btnRepeat.addEventListener('click', () => {
        location.reload();
    })

    //Funcionalidad de botón 'Subir'
    btnUpload.addEventListener('click', ()=> {
        btnUpload.style.display = 'none';
        timeStamp.style.display = 'none';
        btn2.style.backgroundColor = '#ffffff';
        btn2.style.color = '#572EE5';
        btn3.style.backgroundColor = '#572EE5';
        btn3.style.color = '#ffffff';
        //Crear div morado para sobreponer a video
        //let divPurpleScreen = document.createElement('div');
        //divPurpleScreen.classList.add('videoPurpleScreen');
        //divPurpleScreen.appendChild(video);
        video.classList.add('videoPurpleScreen');
        //Borrar contenido de pantalla de video y ajustar video
        videoCover.style.display = 'none';
        videoStep1.style.display = 'none';
        videoStepUpload.style.display = 'inline';
        document.getElementById('frame3').style.top = '-172px';
        document.getElementById('frame4').style.top = '-214px';
        //document.getElementById('loader').style.transform="rotate(180deg)"
        video.style.bottom = '134px';
        //Agregar Texto

        //cardUPGif(); FORMATO PANTALLA MORADA
        uploadGif(form);
    })
    
    //Obtener video y grabación
    /*async function getStream() {
        return await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                height: { max: 280}
            }
        });
    }*/
    
    //Función de la grabación
    async function getRecord(recorder) {
        recorder.startRecording();
        };
    
    async function stopRecord(recorder) {
        await recorder.stopRecording();
        let blob = await recorder.getBlob();
        //invokeSaveAsDialog(blob);
        form = new FormData();
        form.append("file", blob, "myGif.gif");
        
        console.log(form.get("file"));
    }

/////////

function cameraS() {
    navigator.mediaDevices.getUserMedia(constraints)
    .then(function (mediaStream) {
        video.srcObject = mediaStream;
        video.onloadedmetadata = function (e) {
        video.play();
        };
        recorder = new RecordRTCPromisesHandler(mediaStream, {
        type: 'gif',
        frameRate: 60,
        quality: 50,
        width: 360
        });
    }).catch(function (err) {
        console.log(err.name + ": " + err.message);
    })
};

//Función para crear pantalla morada GIF subido con éxito
function successUpload (id) {
    let successScreen = document.createElement('div');
    successScreen.classList.add('videoPurpleScreen');
    videoStepUpload.style.display = 'none';
    videoSuccessUpload.style.display = 'inline';

    //Botón download 'Mi Gifo'
    let btnDownload = document.createElement('button');
    btnDownload.classList.add('btnHover');
    btnDownload.style.cursor = 'pointer';
    btnDownload.style.left = '105px';
    let imgDown = document.createElement('img');
    imgDown.alt = 'icon-download';
    imgDown.src = 'assets/icon-download.svg';
    imgDown.style.height = '15.9px';
    imgDown.style.width = '18px';
    imgDown.style.margin = 'auto';
    btnDownload.appendChild(imgDown);

    getUrlById(id).then(url => createDownloadL(btnDownload, url));

    //Botón link 'Mi Gifo'
    let btnLink = document.createElement('button');
    btnLink.classList.add('btnHover');
    btnLink.style.cursor = 'pointer';
    btnLink.style.left = '105px';
    let imgLink = document.createElement('img');
    imgLink.alt = 'icon-link';
    imgLink.src = 'assets/icon-link.svg';
    imgLink.style.height = '15.9px';
    imgLink.style.width = '18px';
    imgLink.style.margin = 'auto';
    btnLink.appendChild(imgLink);

    btnLink.onclick = () => { alert("Comparte tu gif: " + "https://giphy.com/gifs/" + id) }
}

function getUrlById(id) {
    return fetch(`https://api.giphy.com/v1/gifs/${id}?api_key=PlzoJMPs7k0ixQrxRj53HDBKPN2s0zqT`)
    .then(response => response.json())
    .then(json => json.data.images.fixed_height.url);
}

//Función de descarga 'Mi Gifo'
function createDownloadL(tagIcon, url /*, contenedor*/) {
    let linkdown = document.createElement('a');
    console.log('URL FUNCION CREATEDOWN ' + url);
    fetch(url)
        .then(response => response.blob())
        .then(blob => {

        const url = URL.createObjectURL(blob);
        linkdown.href = url;
        linkdown.download = 'myGiphy.gif';
        linkdown.appendChild(tagIcon);
        //contenedor.appendChild(linkdown);
        
        }).catch(console.error);
    return linkdown;

}

//Función para subir gif

function uploadGif(gif) {
    fetch("https://upload.giphy.com/v1/gifs?api_key=PlzoJMPs7k0ixQrxRj53HDBKPN2s0zqT", {
        method: "POST",
        body: gif    
    }).then(res => {
        if(res.ok) {
        res.json().then(res => { 
            let oldIDS = localStorage.getItem("NuevosGifos");
            oldIDS = oldIDS + "," + res.data.id;
            localStorage.setItem("NuevosGifos", oldIDS);
            successUpload(res.data.id); //////CAMBIAR
        });
        } else {
        console.log("Hubo un problema al subir tu GIF. Vuelve a intentarlo más tarde.");
    }
    });
}

//Función 'detener'
    
    
    //Función 'timer'
    function getDuration() {
        let seconds = 0;
        let minutes = 0;
        let timer = setInterval(() => {
            if(recording) {
                if(seconds < 60) {
                    if (seconds <= 9) {
                        seconds = '0' + seconds;
                    }
                    timeStamp.innerHTML = `00:0${minutes}:${seconds}`;
                    seconds++;
                    } else {
                        minutes++;
                        seconds = 0;
                    }
                }
            else {
                clearInterval(timer);
            }
        }, 1000);
    }