import L from "leaflet"

console.log("Hello from map.js");

fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        console.log("My public IP address is: ", data.ip);

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