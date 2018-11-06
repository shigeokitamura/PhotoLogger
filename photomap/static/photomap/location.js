'use strict';

const map = L.map('map').setView([34.8780131, 135.5766528], 17);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const lc = L.control.locate().addTo(map);
map.addControl( new L.Control.Compass() );


// function onLocationFound(e) {
//     const radius = e.accuracy / 2;
    
//     L.marker(e.latlng).addTo(map)
//         .bindPopup(`現在地（誤差：${radius}）m`);
//     L.circle(e.latlng, radius).addTo(map);
// }
// function onLocationError(e) {
//     alert(e.message);
// }

// map.on('locationfound', onLocationFound);
// map.on('locationerror', onLocationError);

//map.locate({setView: true, maxZoom: 17});
