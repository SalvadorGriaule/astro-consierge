import L from "leaflet"

console.log("Hello from map.js");

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};

function success(pos) {
    // console.log("non c'est bon tout est sous contrôle");
    const crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);


    const lat = crd.latitude; // On récupère la lattitude de l'utilisateur
    const long = crd.longitude; // Pareil pour la longitude
    let map = L.map('macarte').setView([lat, long], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    let marker = L.marker([lat, long]).addTo(map);
}

function error(geolocError) {
    // console.log("Ah bah y a une erreur lol");
    switch(geolocError.code) {
        case geolocError.PERMISSION_DENIED:
          alert("L'utilisateur a refusé la demande de géolocalisation.");
          break;
        case geolocError.POSITION_UNAVAILABLE:
          alert("L'information sur la position est indisponible.");
          break;
        case geolocError.TIMEOUT:
          alert("La demande de géolocalisation a expiré.");
          break;
        case geolocError.UNKNOWN_ERROR:
          alert("Une erreur inconnue est survenue.");
          break;
      }

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
            let map = L.map('macarte').setView([lat, long], 13);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);

            let marker = L.marker([lat, long]).addTo(map);
        })
        .catch(error => console.error('Erreur:', error));
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error, options);
} else {
    error();
} 