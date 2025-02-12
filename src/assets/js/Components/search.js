import { openDataSearch } from "../module/fetchOpenData";
import DisplaySearch from "./displaySearch";

async function searchMap(query) {
    const url = `https://geocode.maps.co/search?city=${encodeURIComponent(query)}&api_key=67a5dc081fc93332201545bvsa7175d`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.dir(data);

        if (data && data.length > 0) {
            let loc = data[0].display_name;
            const ville = loc.split(",");
            
            return ville[0];
        } else {
            alert('Aucun résultat trouvé.');
        }
    } catch (error) {
        console.error('Erreur lors de la recherche :', error);
    }
}

const searchVille = async (marker, ville) => {
    // console.log(ville);
    /* La doc de l'API se trouve ici
    https://public.opendatasoft.com/explore/dataset/georef-france-commune-millesime */
    const fetchJSON = await openDataSearch("georef-france-commune-millesime", `records?where=%22${ville}%22&limit=10`);
    /* console.dir(fetchJSON.results);
    console.dir(fetchJSON.results[0].geo_point_2d.lat);
    console.dir(fetchJSON.results[0].geo_point_2d.lon); */
    DisplaySearch(marker, fetchJSON.results);
};

export { searchMap, searchVille };

/* Idées :
- Vérifier les doublons des résultats sortis, en checkant leurs "epci_code" par ex afin de virer les identiques
- Virer l'API Geocode & vérifier si ça fonctionne */