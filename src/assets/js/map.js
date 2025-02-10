import mapCreator from "./Components/mapCreator";

console.log("Hello from map.js");

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};

function success(pos) {
    const crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    const lat = crd.latitude; // On récupère la lattitude de l'utilisateur
    const long = crd.longitude; // Pareil pour la longitude

    mapCreator(lat, long);
}

function error(geolocError) {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            // console.log("My public IP address is: ", data.ip);

            return fetch(`http://ip-api.com/json/${data.ip}`);
        })
        .then(response => response.json())
        .then(data => {
            const lat = data.lat; // On récupère la lattitude de l'utilisateur
            const long = data.lon; // Pareil pour la longitude
            mapCreator(lat, long);
        })
        .catch(error => console.error('Erreur:', error));
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error, options);
} else {
    error();
}