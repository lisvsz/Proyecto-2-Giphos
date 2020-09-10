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
    //Variables visualización
let timeStamp = document.getElementById('timeStamp')
let video = document.getElementById('video');
let videoCover = document.getElementById('videoCover');
let videoStep1 = document.getElementById('videoStep1');
    // FALTA preview y upload
//Objeto recorder
let recorder;

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
    getStreamandRecord();
});

//Funcionalidad del botón 'grabar'
btnRecord.addEventListener('click', () => {
    btnRecord.style.display = 'none';
    btnFinish.style.display = 'inline';
    timeStamp.style.display = 'inline';

    getDuration();
    getStreamandRecord();
});

//Funcionalidad del botón 'finalizar'
btnFinish.addEventListener('click', () => {
    btnRepeat.style.display = 'inline';
    btnFinish.style.display = 'none';
    btnUpload.style.display = 'inline';
    btnUpload.style.left = '54px';
    timeStamp.style.display = 'none';

    stopRecordingCallback();
});

//Funcionalidad del botón 'repetir captura'
btnRepeat.addEventListener('click', () => {
    location.reload();
    getDuration();
    getStreamandRecord();
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

//Función 'Grabar'
function getStreamandRecord() {
    
    getStream().then(function (stream) {
        
        //Stream de la cámara como source del tag 'video' en el html
        video.srcObject = stream;
        video.play();

        btnRecord.addEventListener('click', () => {
            recording =!recording;
            //document.getElementById('camera-button').src = 'img.svg'
        
            if(recording ===true) {
                this.disabled = true;
                recorder = recordRTC(stream, {
                    type: 'gif',
                    frameRate: 1,
                    quality: 10,
                    width: 360,
                    hidden: 240,
                    onGifRecordingStarted: function () {
                        console.log('start');
                    },
                });

                recorder.startRecording();
                getDuration();

                // Modificamos el dom cuando grabamos

                //recorder.classList.add('button-recording');
                //record.innerHTML = 'Listo';
                //stop.classList.add('button-recording');

                // Cortamos el stream de la cámara
                recorder.camera = stream;
            } else{
                this.disabled = true;
                recorder.stopRecording(stopRecordingCallback);
                recording = false;
            }
        });
    });
}

//Función 'detener'
function stopRecordingCallback(){

    recorder.camera.stop();
    //Formato 'Blob' requerido a la data que vamos a enviar como body del POST request
    let form = new FormData();
    form.append("file", recorder.getBlob(), 'test.gif');

    objectURL = URL.createObjectURL(recorder.getBlob());
    preview.src = objectURL;

    //Modificamos el dom para mostrar el preview, remover el timer  ///////REVISAR CLASES EN HTML
    //*preview.classList.remove('hidden');
    /*video.classList.add('hidden');
    document.getElementById('video-record-buttons').classList.add('hidden');
    document.getElementById('video-upload-buttons').classList.remove('hidden');*/

    recorder.destroy();
    recorder = null;
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
