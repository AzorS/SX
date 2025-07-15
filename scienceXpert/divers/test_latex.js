document.addEventListener('DOMContentLoaded', function() {
  var input = document.getElementById('latex-input');
  var output = document.getElementById('latex-output');
  var publishButton = document.getElementById('publish-button');
  var infoButton = document.getElementById('info-button');

  input.addEventListener('input', function() {
    renderLatex();
  });

  publishButton.addEventListener('click', function() {
    publishContent();
  });

  infoButton.addEventListener('click', function() {
    showInfoPopup();
  });

  function renderLatex() {
    var latexCode = input.value;

    // Ajout d'un retour à la ligne après chaque 110 caractères
    latexCode = latexCode.replace(/(.{110})/g, "$1\n");

    var wrappedCode = latexCode.replace(/\$\$(.*?)\$\$/g, function(match, p1) {
      return '<div class="equation-block">' + katex.renderToString(p1, { displayMode: true }) + '</div>';
    });
    wrappedCode = wrappedCode.replace(/\$(.*?)\$/g, function(match, p1) {
      return katex.renderToString(p1, { displayMode: false });
    });
    output.innerHTML = wrappedCode;
  }

  function publishContent() {
    // Code pour publier le contenu
    alert('La base de données est en cours de publication...');
  }

  function showInfoPopup() {
    alert("Police d'écriture : Lato \nTaille de police : 14px \nCouleur de police : noire \nCommande saut à la ligne : ajouter $...$ \nCommande équation : $...$ ou $$...$$\nRespecter les règles de normage de LaTeX");
  }

  renderLatex();
});
