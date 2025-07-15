document.getElementById('registrationForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Empêche la soumission du formulaire par défaut

  const email = document.getElementById('email').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  const captchaError = document.getElementById('captchaError'); // Récupère la div erreur
  captchaError.textContent = ""; // Réinitialise l'erreur au début

  // Vérifier la validité de l'email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/;
  if (!emailRegex.test(email)) {
    alert('Veuillez entrer une adresse email valide');
    return;
  }

  // Vérifier que les mots de passe correspondent
  if (password !== confirmPassword) {
    alert('Les mots de passe ne correspondent pas');
    return;
  }

  // Vérifier que le mot de passe a une longueur suffisante
  if (password.length < 8) {
    alert('Le mot de passe doit contenir au moins 8 caractères');
    return;
  }

  // Vérifier la réponse reCAPTCHA
  const recaptchaResponse = grecaptcha.getResponse();
  if (!recaptchaResponse) {
    captchaError.textContent = "Veuillez confirmer que vous n'êtes pas un robot.";
    return;
  }

  // Si tout est valide, envoie les données au serveur
  const data = {
    email: email,
    username: username,
    password: password,
    recaptchaResponse: recaptchaResponse // Ajout du captcha
  };

  fetch('/scienceXpert/connexion/inscription.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      alert('Compte créé avec succès!');
      window.location.href = 'connexion.html';
    } else {
      captchaError.textContent = data.message; // Affiche l'erreur du serveur ici
    }
  })
  .catch(error => console.error('Erreur lors de l\'inscription:', error));
});

// Gestion des mots de passe visibles/invisibles
const togglePassword1 = document.querySelector("#togglePassword1");
const togglePassword2 = document.querySelector("#togglePassword2");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");

// Fonction pour basculer la visibilité
function toggleVisibility(inputField, toggleButton) {
  const type = inputField.getAttribute("type") === "password" ? "text" : "password";
  inputField.setAttribute("type", type);
  toggleButton.querySelector("i").classList.toggle("fa-eye");
  toggleButton.querySelector("i").classList.toggle("fa-eye-slash");
}

// Ajout des événements pour les mots de passe
togglePassword1.addEventListener("click", () => toggleVisibility(password, togglePassword1));
togglePassword2.addEventListener("click", () => toggleVisibility(confirmPassword, togglePassword2));
