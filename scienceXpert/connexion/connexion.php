<?php
// Affichage des erreurs PHP
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Paramètres de connexion à la base de données
$host_name = 'db5015277877.hosting-data.io';
$database = 'dbs12583628';
$user_name = 'dbu1361413';
$password = 'TEST123456789@'; // Remplacez par votre mot de passe

// Connexion à la base de données
$link = new mysqli($host_name, $user_name, $password, $database);

// Vérifiez la connexion
if ($link->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Erreur de connexion : ' . $link->connect_error]));
}

// Récupérer les données envoyées
$data = json_decode(file_get_contents("php://input"));
if ($data === null) {
    die(json_encode(['status' => 'error', 'message' => 'Aucune donnée reçue ou format JSON invalide']));
}

$username = $link->real_escape_string($data->username);
$password = $link->real_escape_string($data->password);

// Requête SQL pour vérifier les identifiants
$query = "SELECT * FROM utilisateurs WHERE pseudoUser = ? LIMIT 1";
$stmt = $link->prepare($query);
if (!$stmt) {
    die(json_encode(['status' => 'error', 'message' => 'Erreur de préparation de la requête : ' . $link->error]));
}
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

// Vérification des résultats
if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    // Comparer le mot de passe haché avec celui de l'utilisateur
    if (password_verify($password, $user['passwordUser'])) {
        $_SESSION['username'] = $username;
        echo json_encode(['status' => 'success', 'message' => 'Connexion réussie !']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Mot de passe incorrect.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => "Nom d'utilisateur introuvable."]);
}

// Fermer la connexion
$stmt->close();
$link->close();
?>
