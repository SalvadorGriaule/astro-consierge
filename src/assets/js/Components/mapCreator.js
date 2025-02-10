import L from "leaflet";
import searchMap from "./searchMap";

const mapCreator = (lat, long) => {
    markers = [];
    map = L.map('macarte').setView([lat, long], 13);

    let selectedTile = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    let tileType = "OpenStreetMap";

    let marker = L.marker([lat, long], { icon: greenIcon }).addTo(map);

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