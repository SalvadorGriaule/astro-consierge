import L from "leaflet";

const mapCreator = (lat, long) => {
    let markers = [];
    let map = L.map('macarte').setView([lat, long], 13);

    let selectedTile = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    let tileType = "OpenStreetMap";

    let marker = L.marker([lat, long]).addTo(map);

    async function searchMap() {
        const query = document.getElementById('search').value;
        const url = `https://geocode.maps.co/search?city=${encodeURIComponent(query)}&api_key=67a5dc081fc93332201545bvsa7175d`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            console.dir(data);

            if (data && data.length > 0) {
                marker = marker.remove();
                markers.forEach(marker => marker.remove());
                markers = [];
                document.getElementById('resultsList').innerHTML = '';

                // Ajouter un conteneur pour la liste des résultats
                const resultsContainer = document.getElementById('resultsList');

                const closeButton = document.createElement('div');
                closeButton.id = "closeButton";
                closeButton.textContent = 'X';

                resultsContainer.appendChild(closeButton);
                resultsContainer.style.display = 'block';
                L.DomEvent.disableScrollPropagation(resultsContainer);

                closeButton.addEventListener('click', () => {
                    resultsContainer.style.display = 'none';  // Cache la liste des résultats
                });


                data.forEach((result, index) => {
                    const lat = result.lat;
                    const long = result.lon;

                    const newMarker = L.marker([lat, long]).addTo(map);
                    markers.push(newMarker);
                    newMarker.bindPopup(`<b>${result.display_name}</b>`);
                    newMarker.on('mouseover', () => {
                        newMarker.openPopup();
                    });

                    const listItem = document.createElement('div');
                    listItem.setAttribute('class', 'item-search');
                    listItem.textContent = `${index + 1}: ${result.display_name}`;

                    listItem.addEventListener('mouseover', () => {
                        map.setView([lat, long], 13);
                        newMarker.openPopup();
                    });

                    resultsContainer.appendChild(listItem);
                })
                map.setView([data[0].lat, data[0].lon], 13);
                document.getElementById('search').value = '';

            } else {
                alert('Aucun résultat trouvé.');
            }
        } catch (error) {
            console.error('Erreur lors de la recherche :', error);
        }
    }

    // Ajouter un gestionnaire d'événements pour le bouton de recherche
    document.getElementById('searchButton').addEventListener('click', () => {
        const query = document.getElementById('search').value;
        if (query) {
            searchMap(query);  // Appeler la fonction de recherche
        }
    });

    // Permet la recherche aussi en appuyant sur "Enter" dans l'input
    document.getElementById('search').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = document.getElementById('search').value;
            if (query) {
                searchMap(query);
            }
        }
    });

    let MyControlClass = L.Control.extend({

        options: {
            position: 'topleft'
        },

        onAdd: function (map) {

            this.map = map;

            let div = L.DomUtil.create('div', 'leaflet-bar my-control');
            /* Start create button change background map */
            let buttonBackground = L.DomUtil.create('button', 'my-button-class', div);

            let myBackground = L.DomUtil.create('img', '', buttonBackground);
            myBackground.src = "./src/assets/img/map-solid.svg";
            myBackground.style = "margin-left:0px;width:20px;height:20px";

            L.DomEvent.on(buttonBackground, 'click', function () { this.changeBackground(); }, this);
            /* End create button change background map */

            return div;
        },

        changeBackground() {
            this.map.removeLayer(selectedTile);

            if (tileType == "OpenStreetMap") {
                tileType = "ArcGis";

                selectedTile = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                    attribution: 'ArcGIS'
                }).addTo(this.map);
            }
            else {
                tileType = "OpenStreetMap";

                selectedTile = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);
            }
        },

        onRemove: function (map) {
        }
    });

    let myControl = new MyControlClass().addTo(map);
}

export default mapCreator;