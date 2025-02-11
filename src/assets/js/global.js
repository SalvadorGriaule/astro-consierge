import L from "leaflet";
import { navGPS, navIP } from "./Components/nav.js";
import AdvanceSearch from "./Components/AdvancedSearch.js";
/* All imports */

/* Init Getter & Setter */
//marker = Position initiale de l'utilisateur
let marker;

export const setMarker = (lat, long, map, greenIcon) => {
    marker = L.marker([lat, long], { icon: greenIcon }).addTo(map);
};

export const getMarker = () => marker;

//radius = taille de recherche autour de l'utilisateur
let radius;

export const setRadius = () => {
    let searchRadius = '';
    let radios = document.getElementsByName('search-radius');
    for (i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            searchRadius = radios[i].value; // Récupérer la valeur du radio sélectionné
            radios[i].checked = false;
            break;
        }
    }

    // Si aucune option radio n'est sélectionnée, vérifier si l'utilisateur a entré un rayon personnalisé
    if (!searchRadius) {
        let radiusFree = document.getElementById('radius-free');
        searchRadius = radiusFree.value; // Récupérer la valeur du champ texte
        radiusFree.value = '';
    }

    radius = searchRadius.replace(/[^0-9\.]/g, '');
};

export const getRadius = () => radius;

/* Init globalThis */
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

// Verif
console.log("Hello from global.js");


const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};

export const Localisation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(navGPS, navIP, options);
        /* navGPS permet la localisation par l'api navigator.geolocation
        En cas de problème quelconque on bascule sur une API moins précise geolocalisant par l'adresse IP de l'utilisateur (voir navIP) */
    } else {
        navIP();
    }
};

Localisation();
AdvanceSearch();