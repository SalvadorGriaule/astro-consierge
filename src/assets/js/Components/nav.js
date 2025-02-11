import MapCreator from "./MapCreator";

function navGPS(pos) {
    const crd = pos.coords;

    const lat = crd.latitude; // On récupère la lattitude de l'utilisateur
    const long = crd.longitude; // Pareil pour la longitude
    
    MapCreator(lat, long);
}

function navIP() {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {

            return fetch(`http://ip-api.com/json/${data.ip}`);
        })
        .then(response => response.json())
        .then(data => {
            const lat = data.lat; // On récupère la lattitude de l'utilisateur
            const long = data.lon; // Pareil pour la longitude

            MapCreator(lat, long);
        })
        .catch(error => console.error('Erreur:', error));
}

export { navGPS, navIP };