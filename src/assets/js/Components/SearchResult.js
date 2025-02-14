import GoogleTravel from "./googleTravel";

const SearchResult = (marker, data, value) => {
    const resultsContainer = document.getElementById('resultsList');
    let compteur = 0;
    let seenCodes = [];
    data.forEach((result) => {
        const lat = result.geo_point_2d.lat;
        const long = result.geo_point_2d.lon;
        const code = result.com_current_code[0];  // On récupère le code de l'élément

        // Vérifier si le code a déjà été rencontré
        if (!seenCodes.includes(code)) {
            // Ajouter le code à notre tableau 'seenCodes'
            seenCodes.push(code);
            // Vérifier si les coordonnées sont déjà présentes dans le tableau markers
            const markerExists = markers.some(marker => {
                const markerLat = marker.getLatLng().lat;
                const markerLng = marker.getLatLng().lng;

                // Si les coordonnées lat et long sont identiques, retourner true
                return markerLat === lat && markerLng === long;
            });

            // Si les coordonnées n'existent pas encore, ajouter le marqueur
            if (!markerExists) {
                compteur++;
                const newMarker = L.marker([lat, long], { icon: blueIcon }).addTo(map);
                markers.push(newMarker);
                const start = marker.getLatLng();
                const finish = newMarker.getLatLng();

                let drive = GoogleTravel(start, finish, "driving");
                let walk = GoogleTravel(start, finish, "walking");
                let cycle = GoogleTravel(start, finish, "bicycling");
                let transit = GoogleTravel(start, finish, "transit");

                console.dir(drive);
                newMarker.bindPopup(`<div>${result.com_name}<br /> ${result.dep_name}, ${result.reg_name}<br />${drive}${walk}${cycle}${transit}</div>`);
                newMarker.on('mouseover', () => {
                    newMarker.openPopup();
                });

                const listItem = document.createElement('div');
                listItem.classList.add('item-search');
                listItem.textContent = `${compteur}: ${result.com_name} ${result.dep_name} ${result.dep_code} ${result.reg_name}`;

                listItem.addEventListener('mouseover', () => {
                    map.setView([lat, long]);
                    newMarker.openPopup();
                });

                map.setView([data[0].geo_point_2d.lat, data[0].geo_point_2d.lon], 13);
                resultsContainer.appendChild(listItem);
            }
        }
    });
}

const SearchResultWithDistance = (marker, data, radius) => {
    const resultsContainer = document.getElementById('resultsList');
    let flagEvent = false;
    let compteur = 0;
    let seenCodes = [];
    data.forEach((result) => {
        const lat = result.geo_point_2d.lat;
        const long = result.geo_point_2d.lon;
        const code = result.com_current_code[0];  // On récupère le code de l'élément

        // Vérifier si le code a déjà été rencontré
        if (!seenCodes.includes(code)) {
            // Ajouter le code à notre tableau 'seenCodes'
            seenCodes.push(code);
            // Vérifier si les coordonnées sont déjà présentes dans le tableau markers
            const markerExists = markers.some(marker => {
                const markerLat = marker.getLatLng().lat;
                const markerLng = marker.getLatLng().lng;

                // Si les coordonnées lat et long sont identiques, retourner true
                return markerLat === lat && markerLng === long;
            });

            // Si les coordonnées n'existent pas encore, ajouter le marqueur
            if (!markerExists) {

                let latlng = L.latLng(lat, long);
                let starter = marker.getLatLng();
                let distance = latlng.distanceTo(starter);
                let metres = radius * 1000; // Radius est en km, on a besoin de le convertir en mètres

                if (distance <= metres) {
                    compteur++;
                    flagEvent = true;
                    const newMarker = L.marker([lat, long]).addTo(map);
                    markers.push(newMarker);
                    // const finish = newMarker.getLatLng();

                    let drive = GoogleTravel(starter, latlng, "driving");
                    let walk = GoogleTravel(starter, latlng, "walking");
                    let cycle = GoogleTravel(starter, latlng, "bicycling");
                    let transit = GoogleTravel(starter, latlng, "transit");

                    let kmeters = (parseInt(distance) / 1000);
                    newMarker.bindPopup(`<div>${result.com_name}<br /> ${result.dep_name}, ${result.reg_name}<br />${drive}${walk}${cycle}${transit}<br />Distance : ${kmeters} km</div>`);

                    newMarker.on('mouseover', () => {
                        newMarker.openPopup();
                    });

                    const listItem = document.createElement('div');
                    listItem.setAttribute('class', 'item-search');
                    listItem.textContent = `${compteur}: ${result.com_name} ${result.dep_name} ${result.dep_code} ${result.reg_name}`;

                    // Permet au passage de la souris sur le résultat de basculer visuellement sur le marker dédié
                    listItem.addEventListener('mouseover', () => {
                        map.setView([lat, long], 13);
                        newMarker.openPopup();
                    });
                    resultsContainer.appendChild(listItem);
                }
            }
        }
    });

    if (flagEvent) {
        map.setView([data[0].geo_point_2d.lat, data[0].geo_point_2d.lon], 13);
    } else {
        resultsContainer.classList.add("hidden");
        alert("Aucun résultat trouvé proche de vous");
    }
}

export { SearchResult, SearchResultWithDistance };