import { navGPS, navIP } from "./nav.js";

const Localisation = () => {
    if (navigator.geolocation) {

        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        };
        
        navigator.geolocation.getCurrentPosition(navGPS, navIP, options);
        /* navGPS permet la localisation par l'api navigator.geolocation
        En cas de problème quelconque on bascule sur une API moins précise geolocalisant par l'adresse IP de l'utilisateur (voir navIP) */
    } else {
        navIP();
    }
};

export default Localisation;