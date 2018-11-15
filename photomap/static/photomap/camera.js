'use strict';

const videoElement = document.querySelector('video');
const videoSelect = document.querySelector('select#videoSource');
const selectors = [videoSelect];
let imageCapture;
const button_send = document.querySelector("#button_send");
const button_capture = document.querySelector("#button_capture");
const button_recap = document.querySelector("#button_recap");

function gotDevices(deviceInfos) {
    // Handles being called several times to update labels. Preserve values.
    const values = selectors.map(select => select.value);
    selectors.forEach(select => {
        while (select.firstChild) {
            select.removeChild(select.firstChild);
        }
    });

    // 空要素を追加
    videoSelect.appendChild(document.createElement('option'));

    for (let i = 0; i !== deviceInfos.length; ++i) {
        const deviceInfo = deviceInfos[i];
        const option = document.createElement('option');
        option.value = deviceInfo.deviceId;
        if (deviceInfo.kind == 'videoinput') {
            option.text = deviceInfo.label || `camera ${videoSelect.length + 1}`;
            videoSelect.appendChild(option);
        } else {
            console.log(' Some other kind of source/device: ', deviceInfo);
        }
    }
    selectors.forEach((select, selectorIndex) => {
        if (Array.prototype.slice.call(select.childNodes).some(n => n.value == values[selectorIndex])) {
            select.value = values[selectorIndex];
        }
    });
}

navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);

function gotStream(stream) {
    window.stream = stream; // make stream available to console
    videoElement.srcObject = stream;
    
    const track = stream.getVideoTracks()[0];
    imageCapture = new ImageCapture(track);
    // Refresh button list in case labels have become available
    return navigator.mediaDevices.enumerateDevices();
}

function handleError(error) {
    console.log('navigator.getUserMedia error: ', error);
}

function start() {
    if (window.stream) {
        window.stream.getTracks().forEach(track => {
            track.stop();
        });
    }
    const videoSource = videoSelect.value;
    const constrains = {
        video: {
            deviceId: videoSource ? {exact: videoSource} : undefined,
            facingMode: { ideal: 'environment' }
        }
    };
    navigator.mediaDevices.getUserMedia(constrains).then(gotStream).then(gotDevices).catch(handleError);
}

function capture() {
    imageCapture.takePhoto()
        .then(blob => createImageBitmap(blob))
        .then(imageBitmap => {
            const canvas = document.querySelector("#camera_canvas")
            drawCanvas(canvas, imageBitmap);
        })
        .catch(error => console.error(error));
    
    button_send.style.visibility = "visible";
    button_capture.style.visibility = "hidden";
    button_recap.style.visibility = "visible";
}

function drawCanvas(canvas, img) {
    canvas.width  = getComputedStyle(canvas).width.split('px')[0];
    canvas.height = getComputedStyle(canvas).height.split('px')[0];
    let ratio = Math.min(canvas.width / img.width, canvas.height / img.height);
    let x = (canvas.width - img.width * ratio) / 2;
    let y = (canvas.height - img.height * ratio) / 2;
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height,
        x, y, img.width * ratio, img.height * ratio);
}

function recap() {
    const canvas = document.querySelector("#camera_canvas");

    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    button_send.style.visibility = "hidden";
    button_capture.style.visibility = "visible";
    button_recap.style.visibility = "hidden";
}

videoSelect.onchange = start;

start();