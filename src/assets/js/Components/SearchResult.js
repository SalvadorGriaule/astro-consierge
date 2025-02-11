const SearchResult = (data) => {
    const resultsContainer = document.getElementById('resultsList');
    let compteur = 0;
    data.forEach((result) => {
        compteur++;
        const lat = result.lat;
        const long = result.lon;
        const newMarker = L.marker([lat, long]).addTo(map);
        markers.push(newMarker);
        newMarker.bindPopup(`<div>${result.display_name}</div>`);
        newMarker.on('mouseover', () => {
            newMarker.openPopup();
        });
    
        const listItem = document.createElement('div');
        listItem.classList.add('item-search');
        listItem.textContent = `${compteur}: ${result.display_name}`;
    
        listItem.addEventListener('mouseover', () => {
            map.setView([lat, long], 13);
            newMarker.openPopup();
        });
    
        resultsContainer.appendChild(listItem);
    });
}

const SearchResultWithDistance = (marker, data, radius) => {
    const resultsContainer = document.getElementById('resultsList');
    let flagEvent = false;
    let compteur = 0;
    data.forEach((result) => {
        const lat = result.lat;
        const long = result.lon;
        
        let latlng = L.latLng(lat, long);
        let starter = marker.getLatLng();
        let distance = latlng.distanceTo(starter);
        let metres = radius * 1000; // Radius est en km, on a besoin de le convertir en mètres
        
        // Calcul de la distance entre le point de départ et le point trouvé 
        console.dir("la distance est de " + distance + " mètres");
        
        if (distance <= metres) {
            compteur++;
            flagEvent = true;
            const newMarker = L.marker([lat, long]).addTo(map);
            markers.push(newMarker);
            
            let kmeters = (parseInt(distance) / 1000);
            newMarker.bindPopup(`<div>${result.display_name}<br />Distance : ${kmeters} km`);
            
            newMarker.on('mouseover', () => {
                newMarker.openPopup();
            });
            
            const listItem = document.createElement('div');
            listItem.setAttribute('class', 'item-search');
            listItem.textContent = `${compteur}: ${result.display_name}`;

            // Permet au passage de la souris sur le résultat de basculer visuellement sur le marker dédié
            listItem.addEventListener('mouseover', () => {
                map.setView([lat, long], 13);
                newMarker.openPopup();
            });
            resultsContainer.appendChild(listItem);
        }
    });
    if(flagEvent) {
        map.setView([data[0].lat, data[0].lon], 13);
    } else {
        resultsContainer.classList.add("hidden");
        alert("Aucun résultat trouvé proche de vous");
    } 
}

export { SearchResult, SearchResultWithDistance };