// Funcionalidad de la sección 'Crear tu Gif'
import {arrayMyGifos} from './myGifos.js';
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
    let media_stream;
    
    //Funcionalidad del botón 'Comenzar'
    btnStart.addEventListener('click', () => { 
        btnStart.style.display = 'none';
        videoCover.style.display = 'none';
        btn1.style.backgroundColor = '#572EE5';
        btn1.style.color = '#FFFFFF';
        videoStep1.style.display = 'block';
        alert('Da click en el número 2 para continuar');
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
        //vidOff();
    });
    
    //Funcionalidad del botón 'repetir captura'
    btnRepeat.addEventListener('click', () => {
        location.reload();
        /*recorder = new RecordRTCPromisesHandler(media_stream, {
            type: 'gif',
            frameRate: 60,
            quality: 200,
            width: 360
        });
        btn2.style.backgroundColor = '#572EE5';
        btn2.style.color = '#FFFFFF';
        btn3.style.backgroundColor = '#FFFFFF';
        btn3.style.color = '#572EE5';
        btnRepeat.style.display = 'none';
        btnFinish.style.display = 'none';
        btnUpload.style.display = 'inline';
        timeStamp.style.display = 'inline';
        recorder.startRecording();
        getDuration();*/
        //iluminar el 2 y apagar el 3, reiniciar el timer, cambiar a botón finalizar
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
        video.classList.add('videoPurpleScreen');
        //Borrar contenido de pantalla de video y ajustar video
        videoCover.style.display = 'none';
        videoStep1.style.display = 'none';
        videoStepUpload.style.display = 'inline';
        document.getElementById('frame3').style.top = '-172px';
        document.getElementById('frame4').style.top = '-214px';
        video.style.bottom = '134px';
        uploadGif(form);
        video.srcObject.stop();
    });
    
    //Función de la grabación
    async function getRecord(recorder) {
        recorder.startRecording();
        };
    
    async function stopRecord(recorder) {
        await recorder.stopRecording();
        let blob = await recorder.getBlob();
        form = new FormData();
        form.append("file", blob, "myGif.gif");
        //video.pause();
        console.log(form.get("file"));
    };

function cameraS() {
    navigator.mediaDevices.getUserMedia(constraints)
    .then(function (mediaStream) {
        video.srcObject = mediaStream;
        media_stream = mediaStream;
        video.play();
        /*video.onloadedmetadata = function (e) {
        video.play();
        };*/
        recorder = new RecordRTCPromisesHandler(mediaStream, {
        type: 'gif',
        frameRate: 60,
        quality: 200,
        width: 360
        });
    }).catch(function (err) {
        console.log(err.name + ": " + err.message);
    })
};

function getUrlById(id) {
    return fetch(`https://api.giphy.com/v1/gifs/${id}?api_key=PlzoJMPs7k0ixQrxRj53HDBKPN2s0zqT`)
    .then(response => response.json())
    .then(json => json.data.images.fixed_height.url);
}

//Función de descarga 'Mi Gifo'
function createDownloadL(tagIcon, urlD, container) {
    let linkdown = document.createElement('a');
    console.log('URL FUNCION CREATEDOWN ' + urlD);
    fetch(urlD)
        .then(response => response.blob())
        .then(blob => {
        const urlD = URL.createObjectURL(blob);
        linkdown.href = urlD;
        linkdown.download = 'myGifo.gif';
        linkdown.appendChild(tagIcon);
        container.appendChild(linkdown);
    }).catch(console.error);
}

//Función para crear pantalla morada GIF subido con éxito
function successUpload (id) {
    let successScreen = document.createElement('div');
    successScreen.classList.add('videoPurpleScreen');
    videoStepUpload.style.display = 'none';
    videoSuccessUpload.style.display = 'inline';

    //Botón download 'Mi Gifo'
    let btnDownloadC = document.getElementById('btnDownloadC');
    videoSuccessUpload.appendChild(btnDownloadC);
    getUrlById(id).then(urlD => createDownloadL(btnDownloadC, urlD, videoSuccessUpload));

    //Botón link 'Mi Gifo'
    let btnLinkC = document.getElementById('btnLinkC');    
    btnLinkC.addEventListener('click', () => { 
        alert("Comparte tu gif: " + "https://giphy.com/gifs/" + id)}
    )
}

//Función para subir gif
function uploadGif(gif) {
    fetch("https://upload.giphy.com/v1/gifs?api_key=PlzoJMPs7k0ixQrxRj53HDBKPN2s0zqT", {
        method: "POST",
        body: gif    
    }).then(res => {
        if(res.ok) {
        res.json().then(res => { 
            successUpload(res.data.id);
            arrayMyGifos(res.data.id);
        });
        } else {
        console.log("Hubo un problema al subir tu GIF. Vuelve a intentarlo más tarde.");
    }
    });
}

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

