export const AdvanceSearchButton = () => {
    /* Affichage des paramètres avancés de recherche */
    let button = document.getElementById('advance-search-link');
    button.addEventListener('click', function () {
        let filters = document.getElementById('advance-search');

        filters.classList.toggle('hidden');

        button.classList.toggle("active");
        button.classList.toggle("inactive");
    });
}


export const AdvanceSearchOptions = () => {
    let searchRadius = ''; // Variable pour stocker le rayon

    // Vérifier quel bouton radio est sélectionné
    let radios = document.getElementsByName('search-radius');
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            searchRadius = radios[i].value; // Récupérer la valeur du radio sélectionné
            radios[i].checked = false;
            break;
        }
    }

    // Si aucune option radio n'est sélectionnée, vérifier si l'utilisateur a entré un rayon personnalisé
    if (!searchRadius) {
        let radiusFree = document.getElementById('radius-free');
        searchRadius = radiusFree.value; // Récupérer la valeur du champ texte
        radiusFree.value = '';
    }

    let numericRadius = searchRadius.replace(/[^0-9\.]/g, '');

    return numericRadius;
}