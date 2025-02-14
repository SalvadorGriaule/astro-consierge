import './global.js';
import { paramMap, openDataSearch } from './module/fetchOpenData.js';
import Localisation from './Components/Localisation.js';
import { AdvanceSearchButton } from './Components/AdvancedSearch.js';
import MapCreator from './Components/mapCreator.js';
import { getMarker } from './global.js';
import DisplaySearch from './Components/displaySearch.js';

const cPosition = Cookies.get("position");

const reverseSearchVille = async (position) => {
    if (position) {
        const lat = position.lat;
        const long = position.long;
        const url = `https://geocode.maps.co/reverse?lat=${lat}&lon=${long}&api_key=67a5dc081fc93332201545bvsa7175d`;
        try {
            const response = await fetch(url);
            const data = await response.json();    
            if (data) {
                const ville = data.address.municipality;  

                return ville;

            } else {
                alert('Aucun résultat trouvé.');
            }
        } catch (error) {
            console.error('Erreur lors de la recherche :', error);
        }  
    } else {
        alert("Aucune position enregistrée dans les cookies.");
    }    
}

switch (paramMap()) {
    case "stationService":
        // Après la démo il faut décommenter l38 et commenter l39 & 40
        // const ville = await reverseSearchVille(position);
        let ville = "rouen";
        let position = {lat:49.416, lon:1.0656};
        const pdcFetchJSON = await openDataSearch("prix-des-carburants-j-1", `records?where=%22${ville}%22&limit=20`);
        /* API doc : https://public.opendatasoft.com/explore/dataset/prix-des-carburants-j-1 */
        const pdcData = pdcFetchJSON.results;
        MapCreator(position.lat, position.lon);
        let pdcMarker = getMarker();
        DisplaySearch(pdcMarker, pdcData);
        break;
    case "parking":
        const ofpaville = await reverseSearchVille(cPosition);
        const ofpaFetchJSON = await openDataSearch("osm-france-parking-area", `records?where=%22${ofpaville}%22&limit=20`);
        /* API doc : https://public.opendatasoft.com/explore/dataset/osm-france-parking-area */
        const ofpadata = ofpaFetchJSON.results;
        MapCreator(position.lat, position.lon);
        let ofpamarker = getMarker();
        DisplaySearch(ofpamarker, ofpadata);
        break;
    case "restaurant":
        const offsville = await reverseSearchVille(cPosition);
        const offsFetchJSON = await openDataSearch("osm-france-food-service", `records?where=%22${offsville}%22&limit=20`);
        /* API doc : https://public.opendatasoft.com/explore/dataset/osm-france-food-service */
        const offsdata = offsFetchJSON.results;
        MapCreator(position.lat, position.lon);
        let offsmarker = getMarker();
        DisplaySearch(offsmarker, offsdata);
        break;
    case "hopital":
        const ofheville = await reverseSearchVille(cPosition);
        const ofheFetchJSON = await openDataSearch("osm-france-healthcare", `records?where=%22${ofheville}%22&limit=20`);
        /* API doc : https://public.opendatasoft.com/explore/dataset/osm-france-healthcare */
        const ofhedata = ofheFetchJSON.results;
        MapCreator(position.lat, position.lon);
        let ofhemarker = getMarker();
        DisplaySearch(ofhemarker, ofhedata);
        break;
/*  case "instSport":
        const ofsfFetchJSON = await openDataSearch("osm-france-sport-facility", "records?limit=100");
        API doc : https://public.opendatasoft.com/explore/dataset/osm-france-sport-facility 
        console.dir(ofsfFetchJSON.results);
        console.dir(ofsfFetchJSON.results[0].meta_geo_point.lat);
        console.dir(ofsfFetchJSON.results[0].meta_geo_point.lon);
        MapCreator(ofsfFetchJSON.results[0].meta_geo_point.lat, ofsfFetchJSON.results[0].meta_geo_point.lon);
        break;
    case "histoire":
        const ofhFetchJSON = await openDataSearch("osm-france-historic", "records?limit=100");
        API doc : https://public.opendatasoft.com/explore/dataset/osm-france-historic 
        console.dir(ofhFetchJSON.results);
        console.dir(ofhFetchJSON.results[0].meta_geo_point.lat);
        console.dir(ofhFetchJSON.results[0].meta_geo_point.lon);
        MapCreator(ofhFetchJSON.results[0].meta_geo_point.lat, ofhFetchJSON.results[0].meta_geo_point.lon);
        break;
    case "commerce":
        const ofscoFetchJSON = await openDataSearch("osm-france-shop-craft-office", "records?limit=100");
        API doc : https://public.opendatasoft.com/explore/dataset/osm-france-shop-craft-office
        console.dir(ofscoFetchJSON.results);
        console.dir(ofscoFetchJSON.results[0].meta_geo_point.lat);
        console.dir(ofscoFetchJSON.results[0].meta_geo_point.lon);
        MapCreator(ofscoFetchJSON.results[0].meta_geo_point.lat, ofscoFetchJSON.results[0].meta_geo_point.lon);
        break;
    case "servicePublic":
        const ofpsFetchJSON = await openDataSearch("osm-france-public-service", "records?limit=100");
        API doc : https://public.opendatasoft.com/explore/dataset/osm-france-public-service
        console.dir(ofpsFetchJSON.results);
        console.dir(ofpsFetchJSON.results[0].meta_geo_point.lat);
        console.dir(ofpsFetchJSON.results[0].meta_geo_point.lon);
        MapCreator(ofpsFetchJSON.results[0].meta_geo_point.lat, ofpsFetchJSON.results[0].meta_geo_point.lon);
        break;
    case "banque":
        const ofbFetchJSON = await openDataSearch("osm-france-bank", "records?limit=100");
        API doc : https://public.opendatasoft.com/explore/dataset/osm-france-bank
        console.dir(ofbFetchJSON.results);
        console.dir(ofbFetchJSON.results[0].meta_geo_point.lat);
        console.dir(ofbFetchJSON.results[0].meta_geo_point.lon);
        MapCreator(ofbFetchJSON.results[0].meta_geo_point.lat, ofbFetchJSON.results[0].meta_geo_point.lon);
        break;
    case "bibliotheque":
        const oflFetchJSON = await openDataSearch("osm-france-library", "records?limit=100");
        API doc : https://public.opendatasoft.com/explore/dataset/osm-france-library
        console.dir(oflFetchJSON.results);
        console.dir(oflFetchJSON.results[0].meta_geo_point.lat);
        console.dir(oflFetchJSON.results[0].meta_geo_point.lon);
        MapCreator(oflFetchJSON.results[0].meta_geo_point.lat, oflFetchJSON.results[0].meta_geo_point.lon);
        break;
    case "cinema":
        const ofcFetchJSON = await openDataSearch("osm-france-cinema", "records?limit=100");
        API doc : https://public.opendatasoft.com/explore/dataset/osm-france-cinema
        console.dir(ofcFetchJSON.results);
        console.dir(ofcFetchJSON.results[0].meta_geo_point.lat);
        console.dir(ofcFetchJSON.results[0].meta_geo_point.lon);
        MapCreator(ofcFetchJSON.results[0].meta_geo_point.lat, ofcFetchJSON.results[0].meta_geo_point.lon);
        break; */
    case null:
        Localisation();
        break;
}

AdvanceSearchButton();