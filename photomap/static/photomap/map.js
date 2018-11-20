'use strict';

let latitude = 34.8780131;
let longitude = 135.5766528;
let direction = -1;
const zoomLevel = 17;

// const form_latitude = document.querySelector("#id_latitude");
// const form_longtitude = document.querySelector("#id_longtitude");
// const form_direction = document.querySelector("#id_direction");
const static_url = document.querySelector("#static").value;

const defaultIcon = new L.Icon.Default;

const arrowIcon1 = L.icon({
    iconUrl: `${static_url}photomap/images/arrow1.png`,
    iconRetinaUrl: `${static_url}photomap/images/arrow1.png`,
    iconSize: [25, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -50],
});

const arrowIcon2 = L.icon({
    iconUrl: `${static_url}photomap/images/arrow2.png`,
    iconRetinaUrl: `${static_url}photomap/images/arrow2.png`,
    iconSize: [25, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -50],
});

const map = L.map('map').setView([latitude, longitude], zoomLevel);
const location_marker = L.marker([latitude, longitude],{ icon: arrowIcon2 }).addTo(map);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// 現在地を取得
function position_success(e) {
    latitude = e.coords.latitude;
    longitude = e.coords.longitude;
    console.log(e.coords);
    map.setView([latitude, longitude], zoomLevel);
    location_marker.setLatLng([latitude, longitude]);
}

function position_error(e) {
    alert('現在地を取得できませんでした．');
    console.error(e);
}

const position_options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
}

navigator.geolocation.watchPosition(position_success, position_error, position_options);

// Leaflet.Control.Compassを追加
//map.addControl( new L.Control.Compass( {autoActive: true, showDigit: false} ) );

// map.on('locationfound', onLocationFound);
// map.on('locationerror', onLocationError);

// ジャイロセンサから端末の方角を算出する関数
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
    if (event.webkitCompassHeading) { // iOSならコンパスの値を使える
        direction = event.webkitCompassHeading
    } else {
        direction = compassHeading(event.alpha, event.beta, event.gamma);
    }
    direction = Math.round(heading);
    location_marker.setRotationAngle(direction);
});

// データベースから写真のデータを取得
function getJSON() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const json = JSON.parse(xhr.responseText);
            //console.log(json);
            for (let item in json) {
                const data = json[item].fields;
                console.log(data);
                const marker = L.marker(
                        [data.latitude, data.longtitude],
                        {
                            rotationAngle: data.direction >= 0 ? data.direction : 0,
                            icon: data.direction >= 0 ? arrowIcon1 : defaultIcon
                        }
                    ).bindPopup(
                        `<img src="/photologger/photomap/media/${data.image}" width= ${window.innerWidth * 0.2} >`
                    ).addTo(map);
            }
        }
    }
    xhr.open('GET', '/photologger/photomap/photos/');
    xhr.send(null);
}

getJSON();