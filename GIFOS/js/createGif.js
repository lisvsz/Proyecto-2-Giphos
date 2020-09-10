// Funcionalidad de la sección 'Crear tu Gif'

var constraints = { audio: true, video: { width: 1280, height: 720 } }; 
    //Variables botones
let btnStart = document.getElementById('btn-start');
let btnRecord = document.getElementById('btn-record');
let btnFinish = document.getElementById('btn-finish');
let btnRepeat = document.getElementById('btn-repeat');
let btn1 = document.getElementById('btn1');
let btn2 = document.getElementById('btn2');
let btn3 = document.getElementById('btn3');
    //Variables pantallas
let videoCover = document.getElementById('videoCover');
let videoStep1 = document.getElementById('videoStep1');
    //Variables tiempo
let timeStamp = document.getElementById('timeStamp');
let time = 0, counting = 0;
let verify = false;




//Funcionalidad del botón 2 'Acceso a la cámara'
btn2.addEventListener('click', () => {
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function(mediaStream) {
            var video = document.querySelector('video');
            video.srcObject = mediaStream;
            video.onloadedmetadata = function(e) {
                video.play();
    };

    //Visualización de botones
    btnRecord.style.display = 'inline';
    btn1.style.backgroundColor = '#FFFFFF';
    btn1.style.color = '#572EE5';
    btn2.style.backgroundColor = '#572EE5';
    btn2.style.color = '#FFFFFF';

})
.catch(function(err) { console.log(err.name + ": " + err.message); });
});

//Funcionalidad botón 'Grabar'

btnRecord.addEventListener('click', () => {

    btnRecord.style.display = 'none';
    btnFinish.style.display = 'inline';

    async function getRecord() {
        let stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
        let recorder = new RecordRTCPromisesHandler(stream, {
        type: 'gif',
        frameRate: 60,
        quality: 50,
        width: 360,
        //timeSlice: 30000,
    });
        recorder.startRecording();
    
        const sleep = m => new Promise(r => setTimeout(r, m));
        await sleep(3000);
    
        await recorder.stopRecording();
        let blob = await recorder.getBlob();
        invokeSaveAsDialog(blob);
        let form = new FormData();
        form.append('file', blob, 'myGif.gif');
        console.log(form.get('file'));
    }

    let url = fetch("url", {
        headers: {
            'Content-Type': 'text/xml'
        }
    });

    //getRecord()

    //Función del temporizador

    /*function countingTime(){
        if(verify == false){
            counting = setInterval(() => {
                time += 0.01;
                timeStamp.innerHTML = time.toFixed(2);
            }, 10);
            verify = true;
        } else {
            verify = false;
            clearInterval(counting);
        }
    }*/
    
    /*function countingTime(timeStamp, counting, verify){
        if(verify == false){
            counting += 1.00;
            timeStamp.innerHTML = time;
        } 10;
            verify = true;
        }
    countingTime(timeStamp, counting, verify);*/
    //countingTime();
});
        //2° intento timer

       
        //Intento reset
    /*function resetTime() {
        verify = false;
        time = 0;
        counting.innerHTML = time + '00:00:00';
        clearInterval(counting);
    }*/


//Funcionalidad botón 'Detener'

btnFinish.addEventListener('click', () => {
    getRecord()
});


// UPLOAD GIFO
/*let blob = await recorder.getBlob();
// invokeSaveAsDialog(blob);
    let form = new FormData();
 form.append('file', blob, 'myGif.gif');
 console.log(form.get('file'));
 uploadGif(form);
​
function uploadGif(gif) {
 fetch('https://upload.giphy.com/v1/gifs?api_key=PlzoJMPs7k0ixQrxRj53HDBKPN2s0zqT', {
 method: 'POST',
 body: gif
}).then(res => {
 console.log(res.status);
});
}*/

//Funcionalidad botón 'Detener'

/*btnFinish.addEventListener('click', () => {
    const sleep = m => new Promise(r => setTimeout(r, m));
        await sleep(3000);
    
        await recorder.stopRecording();
        let blob = await recorder.getBlob();
        invokeSaveAsDialog(blob);
        let form = new FormData();
        form.append('file', blob, 'myGif.gif');
        console.log(form.get('file'));

    let url = fetch("url", {
        headers: {
            'Content-Type': 'text/xml'
        }
    });
    
});*/


