import './global.js';
import { paramMap, openDataSearch } from './module/fetchOpenData.js';
import Localisation from './Components/Localisation.js';
import { AdvanceSearchButton } from './Components/AdvancedSearch.js';
import MapCreator from './Components/mapCreator.js';

switch (paramMap()) {
    case "stationService":
        const pdcFetchJSON = await openDataSearch("prix-des-carburants-j-1", "records?limit=100");
        /* API doc : https://public.opendatasoft.com/explore/dataset/prix-des-carburants-j-1 */
        console.dir(pdcFetchJSON.results);
        console.dir(pdcFetchJSON.results[0].geo_point.lat);
        console.dir(pdcFetchJSON.results[0].geo_point.lon);
        MapCreator(pdcFetchJSON.results[0].geo_point.lat, pdcFetchJSON.results[0].geo_point.lon);
        break;
    case "parking":
        const ofpaFetchJSON = await openDataSearch("osm-france-parking-area", "records?limit=100");
        /* API doc : https://public.opendatasoft.com/explore/dataset/osm-france-parking-area */
        console.dir(ofpaFetchJSON.results);
        console.dir(ofpaFetchJSON.results[0].meta_geo_point.lat);
        console.dir(ofpaFetchJSON.results[0].meta_geo_point.lon);
        MapCreator(ofpaFetchJSON.results[0].meta_geo_point.lat, ofpaFetchJSON.results[0].meta_geo_point.lon);
        break;
    case "instSport":
        const ofsfFetchJSON = await openDataSearch("osm-france-sport-facility", "records?limit=100");
        /* API doc : https://public.opendatasoft.com/explore/dataset/osm-france-sport-facility */
        console.dir(ofsfFetchJSON.results);
        console.dir(ofsfFetchJSON.results[0].meta_geo_point.lat);
        console.dir(ofsfFetchJSON.results[0].meta_geo_point.lon);
        MapCreator(ofsfFetchJSON.results[0].meta_geo_point.lat, ofsfFetchJSON.results[0].meta_geo_point.lon);
        break;
    case "histoire":
        const ofhFetchJSON = await openDataSearch("osm-france-historic", "records?limit=100");
        /* API doc : https://public.opendatasoft.com/explore/dataset/osm-france-historic */
        console.dir(ofhFetchJSON.results);
        console.dir(ofhFetchJSON.results[0].meta_geo_point.lat);
        console.dir(ofhFetchJSON.results[0].meta_geo_point.lon);
        MapCreator(ofhFetchJSON.results[0].meta_geo_point.lat, ofhFetchJSON.results[0].meta_geo_point.lon);
        break;
    case "commerce":
        const ofscoFetchJSON = await openDataSearch("osm-france-shop-craft-office", "records?limit=100");
        /* API doc : https://public.opendatasoft.com/explore/dataset/osm-france-shop-craft-office */
        console.dir(ofscoFetchJSON.results);
        console.dir(ofscoFetchJSON.results[0].meta_geo_point.lat);
        console.dir(ofscoFetchJSON.results[0].meta_geo_point.lon);
        MapCreator(ofscoFetchJSON.results[0].meta_geo_point.lat, ofscoFetchJSON.results[0].meta_geo_point.lon);
        break;
    case "restaurant":
        const offsFetchJSON = await openDataSearch("osm-france-food-service", "records?limit=100");
        /* API doc : https://public.opendatasoft.com/explore/dataset/osm-france-food-service */
        console.dir(offsFetchJSON.results);
        console.dir(offsFetchJSON.results[0].meta_geo_point.lat);
        console.dir(offsFetchJSON.results[0].meta_geo_point.lon);
        MapCreator(offsFetchJSON.results[0].meta_geo_point.lat, offsFetchJSON.results[0].meta_geo_point.lon);
        break;
    case "servicePublic":
        const ofpsFetchJSON = await openDataSearch("osm-france-public-service", "records?limit=100");
        /* API doc : https://public.opendatasoft.com/explore/dataset/osm-france-public-service */
        console.dir(ofpsFetchJSON.results);
        console.dir(ofpsFetchJSON.results[0].meta_geo_point.lat);
        console.dir(ofpsFetchJSON.results[0].meta_geo_point.lon);
        MapCreator(ofpsFetchJSON.results[0].meta_geo_point.lat, ofpsFetchJSON.results[0].meta_geo_point.lon);
        break;
    case "banque":
        const ofbFetchJSON = await openDataSearch("osm-france-bank", "records?limit=100");
        /* API doc : https://public.opendatasoft.com/explore/dataset/osm-france-bank */
        console.dir(ofbFetchJSON.results);
        console.dir(ofbFetchJSON.results[0].meta_geo_point.lat);
        console.dir(ofbFetchJSON.results[0].meta_geo_point.lon);
        MapCreator(ofbFetchJSON.results[0].meta_geo_point.lat, ofbFetchJSON.results[0].meta_geo_point.lon);
        break;
    case "bibliotheque":
        const oflFetchJSON = await openDataSearch("osm-france-library", "records?limit=100");
        /* API doc : https://public.opendatasoft.com/explore/dataset/osm-france-library */
        console.dir(oflFetchJSON.results);
        console.dir(oflFetchJSON.results[0].meta_geo_point.lat);
        console.dir(oflFetchJSON.results[0].meta_geo_point.lon);
        MapCreator(oflFetchJSON.results[0].meta_geo_point.lat, oflFetchJSON.results[0].meta_geo_point.lon);
        break;
    case "cinema":
        const ofcFetchJSON = await openDataSearch("osm-france-cinema", "records?limit=100");
        /* API doc : https://public.opendatasoft.com/explore/dataset/osm-france-cinema */
        console.dir(ofcFetchJSON.results);
        console.dir(ofcFetchJSON.results[0].meta_geo_point.lat);
        console.dir(ofcFetchJSON.results[0].meta_geo_point.lon);
        MapCreator(ofcFetchJSON.results[0].meta_geo_point.lat, ofcFetchJSON.results[0].meta_geo_point.lon);
        break;
    case "hopital":
        const ofheFetchJSON = await openDataSearch("osm-france-healthcare", "records?limit=100");
        /* API doc : https://public.opendatasoft.com/explore/dataset/osm-france-healthcare */
        console.dir(ofheFetchJSON.results);
        console.dir(ofheFetchJSON.results[0].meta_geo_point.lat);
        console.dir(ofheFetchJSON.results[0].meta_geo_point.lon);
        MapCreator(ofheFetchJSON.results[0].meta_geo_point.lat, ofheFetchJSON.results[0].meta_geo_point.lon);
        break;
    case null:
        Localisation();
        break;
}

AdvanceSearchButton();