import { openDataSearch } from "../module/fetchOpenData";
import DisplaySearch from "./displaySearch";

const searchVille = async (marker, ville) => {
    /* La doc de l'API se trouve ici
    https://public.opendatasoft.com/explore/dataset/georef-france-commune-millesime */
    const fetchJSON = await openDataSearch("georef-france-commune-millesime", `records?where=%22${ville}%22&limit=10`);
    if(fetchJSON && fetchJSON.total_count != 0) {
        DisplaySearch(marker, fetchJSON.results);
    } else {
        alert("Aucun résultat trouvé");
    }
};

export { searchVille };

/* Idées :
- Vérifier les doublons des résultats sortis, en checkant leurs "epci_code" par ex afin de virer les identiques */