const GoogleTravel = (start, finish, travelMode) => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${start.lat},${start.lng}&destination=${finish.lat},${finish.lng}&travelmode=${travelMode}`;
    let travel = '';
    switch (travelMode) {
        case "driving":
            travel = "Itinéraire en voiture";
            break;
        case "walking":
            travel = "Itinéraire à pied";
            break;
        case "bicycling":
            travel = "Itinéraire à vélo";
            break;
        case "transit":
            travel = "Itinéraire en transport en commun";
            break;

        default:
            travel = "error: travelMode n'a pas de valeur adéquate";
            break;
    }
    return `<a href=${url}><div>${travel}</div></a>`
}

export default GoogleTravel;