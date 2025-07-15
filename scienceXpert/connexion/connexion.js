const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

// Bascule l'affichage du mot de passe
togglePassword.addEventListener("click", function () {
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);

  if (type === "text") {
    togglePassword.innerHTML = '<i class="fas fa-eye-slash"></i>'; // Icône œil ouvert
  } else {
    togglePassword.innerHTML = '<i class="fas fa-eye"></i>'; // Icône œil fermé
  }
});

document.getElementById("submitBtn").addEventListener("click", function () {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  console.log("Données envoyées :", { username, password });

  fetch("connexion.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => response.text()) // Récupérer la réponse brute pour débogage
    .then((text) => {
      console.log("Réponse brute du serveur :", text);
      let data;
      try {
        data = JSON.parse(text); // Tentative de convertir la réponse en JSON
      } catch (error) {
        console.error("Erreur de parsing JSON", error);
        alert("Erreur de réponse du serveur");
        return;
      }

      console.log("Données JSON reçues :", data);

      // Si la connexion est réussie, rediriger vers l'accueil
      if (data.status === "success") {
        window.location.href = "/scienceXpert/main/index.html"; // Redirection vers l'accueil
      } else {
        // Si la connexion échoue, afficher le message d'erreur
        const errorMessage = document.getElementById("errorMessage");
        errorMessage.textContent = "Nom d'utilisateur ou mot de passe incorrect.";
        errorMessage.style.display = "block"; // Afficher le message d'erreur
      }
    })
    .catch((error) => console.error("Erreur :", error));
});
