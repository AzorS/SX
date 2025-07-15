// "" , "redirection","titre", "mots-clés", "description"


var item = [
  ["", "qcm.html", "QCM", "qcm,entrainement", "Voilà une belle page pour s'entrainer sur votre site !"],
  ["", "qcm.html", "QCM", "qcm,entrainement", "Voilà une belle page pour s'entrainer sur votre site !"],
];




function search(frm) {
  var win = window.open("", "");
  win.document.write('<html><head><title>Résultats de la recherche</title>');
  win.document.write('<link rel="icon" href="/scienceXpert/images/icon.png" type="image/png">');
  win.document.write('<style>');
  win.document.write('body { font-family: Arial, sans-serif; background-color: #eeedce; margin: 0; padding: 20px; }');
  win.document.write('h1 { text-align: center; color: #333; margin-bottom: 20px; }');
  win.document.write('table { width: 80%; margin: 0 auto; border-collapse: collapse; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); background-color: #fff; }');
  win.document.write('th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }');
  win.document.write('th { background-color: #f2f2f2; }');
  win.document.write('a { color: #007bff; text-decoration: none; }');
  win.document.write('a:hover { text-decoration: underline; }');
  win.document.write('.link { font-size: 14px; color: #666; }');
  win.document.write('.back-button { display: block; text-align: center; margin-top: 20px; background-color: beige; color: #000000; padding: 10px; border-radius: 5px; width: 200px; margin: 0 auto; text-decoration: none; font-weight: bold; }');
  win.document.write('.back-button:hover { background-color: #f4f4a4; text-decoration: none }');
  win.document.write('</style>');
  win.document.write('</head><body>');

  win.document.write('<h1>Résultats de la recherche</h1>');
  win.document.write('<table>');
  win.document.write('<tr><th>Titre</th><th>Description</th><th>Adresse</th></tr>');

  var txt = frm.srchval.value.toLowerCase().split(" ");
  var fnd = [];
  var total = 0;

  for (var i = 0; i < item.length; i++) {
    fnd[i] = 0;
    var order = [0, 4, 2, 3];
    for (var j = 0; j < order.length; j++) {
      for (var k = 0; k < txt.length; k++) {
        if (item[i][order[j]].toLowerCase().indexOf(txt[k]) > -1 && txt[k] !== "") {
          fnd[i] += (j + 1);
        }
      }
    }
  }

  for (var i = 0; i < fnd.length; i++) {
    var n = 0;
    var w = -1;
    for (var j = 0; j < fnd.length; j++) {
      if (fnd[j] > n) {
        n = fnd[j];
        w = j;
      }
    }
    if (w > -1) {
      total += show(w, win, n);
    }
    fnd[w] = 0;
  }

  win.document.write('</table>');
  win.document.write('<p id="total">Pages trouvé(s): ' + total + '</p>');
  win.document.write('<div class="back-button-container"><a class="back-button" href="index.html">Retour à la page d\'accueil</a></div>');
  win.document.write('</body></html>');
  win.document.close();
}

function show(which, wind, num) {
  var link = item[which][1] + item[which][0];
  var line = "<tr><td><a href='" + link + "'>" + item[which][2] + "</a></td><td>" + item[which][4] + "</td><td class='link'>" + link + "</td></tr>";
  wind.document.write(line);
  return 1;
}