'use strict';

const lat = document.getElementById("lat");
const lng = document.getElementById("lng");
const dir = document.getElementById("dir");

const map = L.map('map').setView([34.8780131, 135.5766528], 17);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Leaflet.Controlをmapに追加
const options = {
    setView: 'always',
    showCompass: false,
    drawCircle: true,
    drawMarker: true
};
const lc = L.control.locate(options).addTo(map);
lc.start();

// Leaflet.Control.Compassを追加
// map.addControl( new L.Control.Compass( {autoActive: true, showDigit:true} ) );

function onLocationFound(e) {
    const radius = e.accuracy / 2;
    console.log(`lat: ${e.latlng.lat}, lng: ${e.latlng.lng}, accuracy: ${radius}`);
    lat.innerText = `緯度: ${e.latlng.lat}`;
    lng.innerText = `経度: ${e.latlng.lng}`;
}

function onLocationError(e) {
    alert(e.message);
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

function compassHeading(alpha, beta, gamma) {
    const degtorad = Math.PI / 180; // Degree-to-Radian conversion
  
    const _x = beta ? beta * degtorad : 0; // beta value
    const _y = gamma ? gamma * degtorad : 0; // gamma value
    const _z = alpha ? alpha * degtorad : 0; // alpha value
  
    const cX = Math.cos(_x);
    const cY = Math.cos(_y);
    const cZ = Math.cos(_z);
    const sX = Math.sin(_x);
    const sY = Math.sin(_y);
    const sZ = Math.sin(_z);
  
    // Calculate Vx and Vy components
    const Vx = -cZ * sY - sZ * sX * cY;
    const Vy = -sZ * sY + cZ * sX * cY;
  
    // Calculate compass heading
    let compassHeading = Math.atan(Vx / Vy);
  
    // Convert compass heading to use whole unit circle
    if (Vy < 0) {
      compassHeading += Math.PI;
    } else if (Vx < 0) {
      compassHeading += 2 * Math.PI;
    }
  
    return compassHeading * ( 180 / Math.PI ); // Compass Heading (in degrees)
}

window.addEventListener('deviceorientation', event => {
    const heading = compassHeading(event.alpha, event.beta, event.gamma);
    dir.innerText = `方位: ${heading}`;
});
