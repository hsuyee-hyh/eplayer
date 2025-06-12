<?php

namespace App\Actions;

ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php-error.log');
error_reporting(E_ALL);


use App\Controllers\PlaylistController;
use Exception;


require_once __DIR__ . "/../../vendor/autoload.php";


header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] == "POST") {
    // Support JSON POST body
    $input = json_decode(file_get_contents('php://input'), true);
    $userid = $input['userid'] ?? null;
    $title = $input['title'] ?? null;
    $description = $input['description'] ?? null;

    if (empty($userid) || empty($title)) {
        echo json_encode([
            "status" => "error",
            "message" => "User ID and playlist name are required."
        ]);
        exit;
    }

    try {
        $controller = new PlaylistController();
        $result = $controller->createPlaylist($userid, $title, $description);
        if ($result) {
            echo json_encode([
                "status" => "success",
                "message" => "New playlist created successfully.",
                "data" => $result
            ]);
        }
    } catch (Exception $e) {
        echo json_encode([
            "status" => "error",
            "message" => $e->getMessage()
        ]);
    }
}
