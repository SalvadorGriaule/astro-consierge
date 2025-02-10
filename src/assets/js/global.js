import { navGPS, navIP } from "./Components/nav";
import AdvanceSearch from "./AdvancedSearch";

globalThis.lat = 0;
globalThis.long = 0;
globalThis.map = {};
globalThis.markers = [];

/* Global Icons for Leaflet */
globalThis.greenIcon = new L.Icon({
    iconUrl: './src/assets/img/marker-icon-green.png',
    shadowUrl: './src/assets/img/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

console.log("Hello from global.js");


const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(navGPS, navIP, options);
    /* navGPS permet la localisation par l'api navigator.geolocation
    En cas de problème quelconque on bascule sur une API moins précise geolocalisant par l'adresse IP de l'utilisateur (voir navIP) */
} else {
    navIP();
}
AdvanceSearch();