import Cookies from 'universal-cookie';
import MapCreator from '../Components/mapCreator';

const cookies = new Cookies(null, { path: '/' })

function returnGPS(pos, cookie = true) {
    const crd = pos.coords;

    const lat = crd.latitude; // On récupère la lattitude de l'utilisateur
    const long = crd.longitude; // Pareil pour la longitude

    if (cookie) cookies.set("position", { lat: lat, long: long });
    return { lat, long };
}

async function returnIP(cookie = true) {
    const pos = await fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {

            return fetch(`http://ip-api.com/json/${data.ip}`);
        })
        .then(response => response.json())
        .then(data => {
            const lat = data.lat; // On récupère la lattitude de l'utilisateur
            const long = data.lon; // Pareil pour la longitude

            return { lat, long };
        })
        .catch(error => console.error('Erreur:', error));

    if (cookie) cookies.set("position", pos)
    return pos
}



export const localisation = () => {
    if (navigator.geolocation) {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        };
        navigator.geolocation.getCurrentPosition(returnGPS, returnIP, options);
        /* navGPS permet la localisation par l'api navigator.geolocation
        En cas de problème quelconque on bascule sur une API moins précise geolocalisant par l'adresse IP de l'utilisateur (voir navIP) */
    } else {
        return returnIP();
    }
};
