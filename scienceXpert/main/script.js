// Mots-clés et leurs suggestions (tous en minuscules)
const suggestionsData = {
  "cinétique": ["Chapitre 1 : Cinétique", "Chapitre 7 : Cinétique chimique (2e partie)"],
  "évolution": ["Chapitre 2 : Évolution spontanée d’un système chimique", "Chapitre 9 : Évolution forcée d’un système chimique"],
  "réaction": [
    "Chapitre 3 : Réaction acido-basique",
    "Chapitre 4 : Force des acides et des bases",
    "Chapitre 5 : Dosage par titrage",
    "Chapitre 6 : Stratégie en synthèse organique (nomenclature)",
    "Chapitre 10 : Représentation de Lewis",
    "Chapitre 11 : Réaction oxydo-réduction",
    "Chapitre 5 : Réaction acide-base",
    "Chapitre 6 : Réaction oxydo-réduction",
    "Chapitre 7 : précipitation et dissolution"
  ],
  "équilibre": ["Chapitre 1 : État d’équilibre d’un système"],
  "radioactivité": ["Chapitre 8 : Radioactivité"],
  "structure": ["Chapitre 3 : Structure électronique et tableau périodique", "Chapitre 4 : Molécules et représentation de Lewis"],
  "chimieorganique": [
    "Chapitre 1 : Introduction à la chimie organique",
    "Chapitre 2 : Stéréoisométre",
    "Chapitre 3 : Les dérivés halogènés",
    "Chapitre 4 : Les organomagnésiens"
  ],
  "transformations": [
    "Transformations chimique de la matière",
    "Cinétique en réacteur fermé"
  ],
  "architecture": ["Chapitre 1 : Classification périodique et atomes", "Chapitre 2 : Etude des molécules", "Chapitre 3 : Les interaction moléculaires"],
  "algèbre": ["Le monde de l'algèbre", "Un saut dans l'arithmétique des entiers", "Les groupes"],
  "analyse": ["Etude de la fonction zéta", "Etude des fonctions réelles"],
  "probabilité": ["Chaine de Markov"]
};

function toggleSuggestions() {
    var suggestionsMenu = document.getElementById("suggestionsMenu");
    suggestionsMenu.classList.toggle("active");
}

function showSuggestions(input) {
    const suggestionsMenu = document.getElementById("suggestionsMenu");
    suggestionsMenu.innerHTML = ""; // Réinitialise les suggestions

    // Convertit le texte saisi par l'utilisateur en minuscules
    const userInput = input.toLowerCase();

    // Récupérer les mots-clés de la base de données
    const keywords = Object.keys(suggestionsData);

    // Parcourir chaque mot-clé dans la base de données
    for (const keyword of keywords) {
        // Convertit chaque suggestion en minuscules
        const suggestions = suggestionsData[keyword].map(suggestion => suggestion.toLowerCase());
        // Vérifie si l'entrée de recherche contient le mot-clé
        if (userInput.includes(keyword)) {
            // Affiche les suggestions associées au mot-clé
            suggestions.forEach(suggestion => {
                const li = document.createElement("li");
                li.textContent = suggestion;
                suggestionsMenu.appendChild(li);
            });
        }
    }
}




function submitSearch() {
    // Récupérer la valeur de l'entrée de recherche
    var recherche = document.getElementById("Barre_de_recherche").value;

    // Stocker la valeur de recherche dans le stockage local
    localStorage.setItem("recherche", recherche);

    // Rediriger l'utilisateur vers la page de recherche
    window.open("recherche.html", "_blank");

    // Empêcher le formulaire d'être soumis
    return false;
}

// Fonction pour envoyer un e-mail (remplacez cette fonction par la logique réelle d'envoi d'e-mail)
function sendEmail() {
    // Récupérer la valeur de l'objet et du message
    var objet = document.getElementById('subject').value;
    var message = document.getElementById('message').value;

    // Vérifier si l'objet est vide
    if (objet.trim() === '') {
        // Afficher le message d'erreur
        document.getElementById('error-message').innerText = 'Veuillez insérer un objet.';
        return; // Arrêter l'exécution de la fonction
    }

    // Vérifier si le délai de 24 heures est écoulé depuis la dernière demande
    var lastRequestDate = new Date(getCookie('lastRequest'));
    var currentDate = new Date();

    if (currentDate - lastRequestDate < 24 * 60 * 60 * 1000) {
        // Afficher un message indiquant que l'utilisateur doit attendre
        alert("Vous ne pouvez faire qu'une demande par jour. Réessayez plus tard.");
        return;
    }

    // Stocker la date actuelle dans un cookie
    document.cookie = "lastRequest=" + currentDate.toUTCString();

    // Si l'objet est renseigné, réinitialisez le message d'erreur
    document.getElementById('error-message').innerText = '';

    // Utilisez Email.js pour envoyer l'e-mail
    emailjs.send("service_y1mza36", "template_nnsbb4g", {
        subject: objet,
        message: message,
    })
    .then(function(response) {
        console.log("E-mail envoyé avec succès", response);
        // Réinitialiser le formulaire et fermer le modal uniquement si l'e-mail est envoyé avec succès
        resetForm();
        closeModal();
        // Afficher un message de succès à l'utilisateur
        alert("E-mail envoyé !");
    })
    .catch(function(error) {
        console.log("Erreur lors de l'envoi de l'e-mail", error);
        // Afficher un message d'erreur à l'utilisateur
        alert("Erreur lors de l'envoi de l'e-mail. Veuillez réessayer.");
    });
}

// Fonction pour réinitialiser le formulaire
function resetForm() {
    document.getElementById('contactForm').reset();
}

// Fonction pour afficher le modal
function openModal() {
    document.getElementById('contactModal').style.display = 'block';
}

// Fonction pour fermer le modal
function closeModal() {
    document.getElementById('contactModal').style.display = 'none';
}

// Fonction pour obtenir la valeur d'un cookie
function getCookie(name) {
    var cookies = document.cookie.split(';');

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();

        if (cookie.indexOf(name + '=') === 0) {
            return cookie.substring(name.length + 1, cookie.length);
        }
    }

    return null;
}

// Ajoutez cet événement au chargement du document pour ouvrir le modal
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('contactLink').addEventListener('click', openModal);
});

document.addEventListener("DOMContentLoaded", function () {
    var rows = document.querySelectorAll(".clickable-row");
    rows.forEach(function (row) {
        row.addEventListener("click", function () {
            window.location.href = row.dataset.href;
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Récupérer la valeur de recherche à partir du stockage local
    var recherche = localStorage.getItem("recherche");

    // Afficher la valeur de recherche dans le champ de recherche
    document.getElementById("Barre_de_recherche").value = recherche;
});

document.getElementById("Barre_de_recherche").addEventListener("input", function() {
    showSuggestions(this.value);
});