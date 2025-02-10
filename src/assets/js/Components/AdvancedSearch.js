console.log("Hello from AdvanceSearch.js");

const AdvanceSearch = () => {
    /* Affichage des paramètres avancés de recherche */
    let button = document.getElementById('advance-search-link');
    button.addEventListener('click', function () {
        let filters = document.getElementById('advance-search');
        if (filters.style.display === 'none' || filters.style.display === '') {
            filters.style.display = 'block';
            button.classList.toggle("active");
            button.classList.toggle("inactive");
        } else {
            filters.style.display = 'none';
            button.classList.toggle("active");
            button.classList.toggle("inactive");
        }
    });
    /* Fin Affichage des paramètres avancés de recherche */
    /* Récupération & Envoi des données des paramètres avancées */
    document.getElementById('searchButton').addEventListener('click', () => {
        var searchQuery = document.getElementById('search').value;
        var searchRadius = ''; // Variable pour stocker le rayon

        // Vérifier quel bouton radio est sélectionné
        var radios = document.getElementsByName('search-radius');
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                searchRadius = radios[i].value; // Récupérer la valeur du radio sélectionné
                radios[i].checked=false;
                break;
            }
        }

        // Si aucune option radio n'est sélectionnée, vérifier si l'utilisateur a entré un rayon personnalisé
        if (!searchRadius) {
            let radiusFree = document.getElementById('radius-free');
            searchRadius = radiusFree.value; // Récupérer la valeur du champ texte
            radiusFree.value='';
        }
        
        let numericRadius = searchRadius.replace(/[^0-9\.]/g, '');
        console.log('Recherche pour : ' + searchQuery);
        console.log('Rayon de recherche : ' + (numericRadius ? numericRadius : 'Aucun rayon spécifié'));

        // Créer et émettre l'événement personnalisé avec la valeur de numericRadius
        const event = new CustomEvent('search-radius-changed', {
            detail: numericRadius
        });

        // Émettre l'événement sur le document pour qu'il soit écouté par le parent
        document.dispatchEvent(event);
    });
};

export default AdvanceSearch;