// Funcionalidad de la sección 'Crear tu Gif'

    //Variable botones
    let btnStart = document.getElementById('btn-start');
    let btnRecord = document.getElementById('btn-record'); ////= capturar = record
    let btnFinish = document.getElementById('btn-finish');
    let btnRepeat = document.getElementById('btn-repeat');
    let btnUpload = document.getElementById('btn-upload');
    let btn1 = document.getElementById('btn1');
    let btn2 = document.getElementById('btn2');
    let btn3 = document.getElementById('btn3');
        //Variable para manejar el timer
    let recording = false;
        //Variables visualización y video
    let timeStamp = document.getElementById('timeStamp')
    let video = document.getElementById('video');
    let videoCover = document.getElementById('videoCover');
    let videoStep1 = document.getElementById('videoStep1');
    let videoStepUpload = document.getElementById('videoStepUpload');
    
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
    });
    
    //Funcionalidad del botón 'finalizar'
    btnFinish.addEventListener('click', () => {
        btnRepeat.style.display = 'inline';
        btnFinish.style.display = 'none';
        btnUpload.style.display = 'inline';
        btnUpload.style.left = '54px';
        timeStamp.style.display = 'none';
        stopRecord();
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
        //uploadGif(form); subir GIF
    })
    
    //Obtener video y grabación
    async function getStream() {
        return await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                height: { max: 280}
            }
        });
    }
    
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

//Función para subir gif

function uploadGif(gif) {
    fetch("https://upload.giphy.com/v1/gifs?api_key=PlzoJMPs7k0ixQrxRj53HDBKPN2s0zqT", {
      method: "POST",
      body: gif    
    }).then(res => {
      if(res.ok) {
        res.json().then(res => { 
             cardSuccessGif(res.data.id); //////CAMBIAR
           });
      } else {
        console.log("Hubo un error. Vuelve a intentarlo más tarde.");
      }
    });
  }