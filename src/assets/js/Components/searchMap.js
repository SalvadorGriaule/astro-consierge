import { SearchResult, SearchResultWithDistance } from "./SearchResult";

async function searchMap() {
        const query = document.getElementById('search').value;
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
                resultsContainer.style.display = 'block';
                closeButton.addEventListener('click', () => {
                    resultsContainer.style.display = 'none';
                });

                L.DomEvent.disableScrollPropagation(resultsContainer);

                // Traitement de data & affichage dess resultats
                let flagEvent = false;
                document.addEventListener('search-radius-changed', (event) => {
                    const numericRadius = event.detail;
                    data.forEach((result, index) => {
                        SearchResultWithDistance(marker, result, index, numericRadius);
                    });
                    flagEvent = true;
                    console.log(flagEvent);
                });

                if (flagEvent === false) {
                    console.log(flagEvent);
                    data.forEach((result, index) => {
                        console.log("normalment tu ne devrais pas voir " + index);
                        SearchResult(result, index);
                    });
                }

                map.setView([data[0].lat, data[0].lon], 13);
                document.getElementById('search').value = '';

            } else {
                alert('Aucun résultat trouvé.');
            }
        } catch (error) {
            console.error('Erreur lors de la recherche :', error);
        }
    }

    export default searchMap;