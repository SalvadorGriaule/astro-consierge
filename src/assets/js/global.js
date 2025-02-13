import L from "leaflet";
// import 'leaflet.markercluster';
/* All imports */

/* Init Getter & Setter */
//marker = Position initiale de l'utilisateur
let marker;

export const setMarker = (lat, long, map, greenIcon) => {
    marker = L.marker([lat, long], { icon: greenIcon }).addTo(map);
};

export const getMarker = () => marker;

/* Init globalThis */
globalThis.lat = 0;
globalThis.long = 0;
globalThis.map = {};
globalThis.markers = [];

/* Global Icons for Leaflet */
globalThis.blueIcon = new L.Icon({
    iconUrl: './marker-icon-blue.png',
    shadowUrl: './marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

globalThis.greenIcon = new L.Icon({
    iconUrl: './marker-icon-green.png',
    shadowUrl: './marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

globalThis.igorIcon = new L.Icon({
    iconUrl: /* Ajouter la route relative d'une icone sympa de butler ici */'',
    shadowUrl: './marker-shadow.png',
    iconSize: [32, 32],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Verif
console.log("Hello from global.js");
