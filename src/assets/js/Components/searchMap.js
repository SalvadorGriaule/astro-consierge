import { AdvanceSearchOptions } from "./AdvancedSearch.js";
import { SearchResult, SearchResultWithDistance } from "./SearchResult.js";

async function searchMap(marker, query) {
    const url = `https://geocode.maps.co/search?city=${encodeURIComponent(query)}&api_key=67a5dc081fc93332201545bvsa7175d`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.dir(data);

        if (data && data.length > 0) {
            // init
            markers.forEach(marker => marker.remove());
            markers = [];
            document.getElementById('resultsList').innerHTML = '';

            // Ajouter un conteneur pour la liste des résultats
            const resultsContainer = document.getElementById('resultsList');
            // Ajout bouton pour fermer le pop-up resultsList
            const closeButton = document.createElement('div');
            closeButton.id = "closeButton";
            closeButton.textContent = 'X';
            resultsContainer.appendChild(closeButton);
            resultsContainer.classList.remove("hidden");
            closeButton.addEventListener('click', () => {
                resultsContainer.classList.add("hidden");
            });

            L.DomEvent.disableScrollPropagation(resultsContainer);

            // Traitement de data & affichage des resultats
            let radius = AdvanceSearchOptions();
            radius === '' ? SearchResult(data) : SearchResultWithDistance(marker, data, radius);

            document.getElementById('search').value = '';

        } else {
            alert('Aucun résultat trouvé.');
        }
    } catch (error) {
        console.error('Erreur lors de la recherche :', error);
    }
}

export default searchMap;