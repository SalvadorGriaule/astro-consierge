import { AdvanceSearchOptions } from "./AdvancedSearch.js";
import { SearchResult, SearchResultWithDistance } from "./SearchResult.js";

const DisplaySearch = (marker, data) => {
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
    radius === '' ? SearchResult(marker, data) : SearchResultWithDistance(marker, data, radius);

    document.getElementById('search').value = '';
}

export default DisplaySearch;