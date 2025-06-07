<?php

session_start();

header("Access-Control-Allow-Origin: http://localhost:5173"); // Replace with your React origin
header("Access-Control-Allow-Credentials: true"); //  Enable cookie support
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Only allow POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["message" => "Only POST requests are allowed."]);
    exit;
}

// Get React data
$raw_input = file_get_contents("php://input");
$data = json_decode($raw_input, true);
$searchQuery = $data['searchQuery'] ?? "";

// Check session cache
if (isset($_SESSION['api_response'][$searchQuery])) {
    echo json_encode([
        "status" => "success from session",
        "message" => $_SESSION['api_response'][$searchQuery],
    ]);
    exit;
}

// Load Google API
require_once __DIR__ . '/vendor/autoload.php';

$client = new Google_Client();
$client->setApplicationName('Backend');
$client->setScopes(['https://www.googleapis.com/auth/youtube.readonly']);
$client->setDeveloperKey('AIzaSyBNQptjaUFjfrW9Eaqe7C-8OKjpzcQW5lI');

// Use YouTube API
$service = new Google\Service\YouTube($client);

try {
    $queryParams = [
        'id' => $searchQuery // Use 'q' if searching by name
    ];

    $response = $service->channels->listChannels('snippet', $queryParams);
    $items = $response->getItems();

    // Store in session
    $_SESSION['api_response'][$searchQuery] = $items;

    echo json_encode([
        "status" => "success from API",
        "message" => $items,
    ]);
} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage(),
    ]);
}
