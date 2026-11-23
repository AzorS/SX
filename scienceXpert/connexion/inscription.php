<?php
// Affichage des erreurs PHP
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');

// Connexion à la base de données
$host_name = 'db5015277877.hosting-data.io';
$database = 'dbs12583628';
$user_name = 'dbu1361413';
$password = 'TEST123456789@';
$link = new mysqli($host_name, $user_name, $password, $database);

if ($link->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Erreur de connexion : ' . $link->connect_error]));
}

// Récupérer les données envoyées
$data = json_decode(file_get_contents("php://input"));
if ($data === null) {
    die(json_encode(['status' => 'error', 'message' => 'Données invalides']));
}

// Vérification reCAPTCHA
$recaptchaSecret =''; // Remplace par ta clé secrète Google
$recaptchaResponse = $data->recaptchaResponse;

$recaptchaURL = 'https://www.google.com/recaptcha/api/siteverify';
$response = file_get_contents($recaptchaURL . "?secret=$recaptchaSecret&response=$recaptchaResponse");
$responseKeys = json_decode($response, true);

if (!$responseKeys['success']) {
    die(json_encode(['status' => 'error', 'message' => 'Échec du CAPTCHA. Veuillez réessayer.']));
}

// Préparation des données
$email = $link->real_escape_string($data->email);
$username = $link->real_escape_string($data->username);
$password = password_hash($link->real_escape_string($data->password), PASSWORD_DEFAULT);

// Vérifier si le nom d'utilisateur existe déjà
$query = "SELECT * FROM utilisateurs WHERE pseudoUser = ? LIMIT 1";
$stmt = $link->prepare($query);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(['status' => 'error', 'message' => 'Nom d\'utilisateur déjà pris']);
} else {
    // Insérer l'utilisateur dans la base de données
    $query = "INSERT INTO utilisateurs (emailUser, pseudoUser, passwordUser) VALUES (?, ?, ?)";
    $stmt = $link->prepare($query);
    $stmt->bind_param("sss", $email, $username, $password);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Inscription réussie']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Erreur lors de l\'inscription']);
    }
}

$stmt->close();
$link->close();
?>
