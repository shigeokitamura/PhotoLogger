'use strict';

const lat = document.getElementById("lat");
const lng = document.getElementById("lng");
const dir = document.getElementById("dir");

const map = L.map('map').setView([34.8780131, 135.5766528], 17);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Leaflet.Controlをmapに追加
const lc = L.control.locate().addTo(map);
lc.start();

// Leaflet.Control.Compassを追加
map.addControl( new L.Control.Compass( {autoActive: true, showDigit:true} ) );

function onLocationFound(e) {
    const radius = e.accuracy / 2;
    console.log(`lat: ${e.latlng.lat}, lng: ${e.latlng.lng}, accuracy: ${radius}`);
    lat.innerText = `緯度: ${e.latlng.lat}`;
    lng.innerText = `経度: ${e.latlng.lng}`;
}

function onLocationError(e) {
    alert(e.message);
}

function onRotated(angle) {
    console.log(angle);
    dir.innerText = `方位: ${angle}`;
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);
map.on('compass:rotated', onRotated);