const SearchResult = (result, index) => {
    const resultsContainer = document.getElementById('resultsList');
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
}

const SearchResultWithDistance = (marker, result, index, radius) => {
    const resultsContainer = document.getElementById('resultsList');
    const lat = result.lat;
    const long = result.lon;
    const listItem = document.createElement('div');
    
    let latlng = L.latLng(lat, long);
    let starter = marker.getLatLng();
    let distance = latlng.distanceTo(starter);
    let metres = radius * 1000; // Radius est en km, on a besoin de le convertir en mètres
    
    // Calcul de la distance entre le point de départ et le point trouvé 
    console.log("Rayon de recherche reçu dans SearchResult.js : ", radius);
    console.log("Ceci est un test " + metres);
    console.dir("la distance est de " + distance + " mètres");
    
    if (distance <= metres) {
        
        console.log(distance + " est ce que je veux avoir en inférieur ... non ?");
        
        const newMarker = L.marker([lat, long]).addTo(map);
        markers.push(newMarker);
        newMarker.bindPopup(`<b>${result.display_name}</b>`);
        newMarker.on('mouseover', () => {
            newMarker.openPopup();
        });
        listItem.setAttribute('class', 'item-search');
        listItem.textContent = `${index + 1}: ${result.display_name}`;
    
        listItem.addEventListener('mouseover', () => {
            map.setView([lat, long], 13);
            newMarker.openPopup();
        });
    }

    resultsContainer.appendChild(listItem);
}

export { SearchResult, SearchResultWithDistance };