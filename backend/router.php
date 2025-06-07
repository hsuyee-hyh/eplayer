<?php
// error log not shown on user like "echo", find in php-error.log
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php-error.log');
error_reporting(E_ALL);

require_once __DIR__ . '/vendor/autoload.php';

use App\Controllers\AuthController;
use App\controllers\RecentSearchController;


header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET,POST,OPTIONS");
header("Access-Control-Allow-Credentials: true"); // Enable cookie support
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");


// get api form data
$data = json_decode(file_get_contents("php://input"), true);

// if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
// http_response_code(200);
// exit();
// }

if ($_SERVER['REQUEST_METHOD'] == "GET") {
    try {
        $userid = isset($_GET['userid']);
        if(!$userid){
            throw new Exception("userid is required");
        }
        $controller = new RecentSearchController();

        $result = $controller->recentSearchByUserId($userid);
        if ($result) {
            echo json_encode([
                "status" => "success",
                "message" => "Recent Search was found.",
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

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    try {
        switch ($data['action']) {
            case "register":
                $controller = new AuthController();
                $result = $controller->signup($data);
                if ($result) {
                    echo json_encode([
                        "status" => "success",
                        "message" => "registeration success",
                        "data" => $result
                    ]);
                }
                exit();
            case "login":
                $controller = new AuthController();
                $foundUser = $controller->login($data);
                if ($foundUser) {
                    echo json_encode([
                        "status" => "success",
                        "message" => "login success",
                        "data" => $foundUser
                    ]);
                }
                exit();
            case "recentsearch":
                $controller = new RecentSearchController();
                $result = $controller->recentSearchBySearchTerm($data['userid'], $data['searchTerm']);
                if($result){
                    echo json_encode([
                        "status" => "success",
                        "message" => "Recent Search Found",
                        "data" => $result
                    ]);
                }
        }
    } catch (Exception $e) {
        echo json_encode([
            "status" => "error",
            "message" => $e->getMessage()
        ]);
        exit();
    }
}

/*
if (isset($_GET['action'])) {
    switch ($_GET['action']) {
        // Handle registration
        case 'register':
            $controller = new AuthController();
            $userId = $controller->signup($data);
            if ($userId) {
                echo "registered successfully";
            } else {
                echo "User registration failed.";
            }
            exit;

        // Handle login
        case 'login':
            $data =[
                "email" => $_POST['email'],
                "password" => $_POST['password']
            ];
            $controller = new AuthController();
            $foundUser = $controller->login($data);
            if ($foundUser) {
                echo "logged in successfully";
            } else {
                echo "User login failed.";
            }
            exit;
        // default case
        default:
            echo "Invalid action specified.";
            exit;
    }
} else {
    echo json_encode([
        "status" => "error",
        "message" => "No action specified."
    ]);
    exit;
}
*/


// $data = json_decode(file_get_contents("php://input"), true);
// if(isset($data['action'])) {
    // switch($data['action']) {
        // case 'register': 
            // $conn = new DbConnection();
            // $conn->connect();
            // echo json_encode([
                // "status" => "success",
                // "message" => "Database connection established successfully.",
                // "data" => "successfully connected"
            // ]);
            // exit;
        // default: 
            // echo json_encode([
                // "status" => "error",
                // "message" => "Invalid action specified."
            // ]);
            // exit;
    // }
// } else {
    // echo json_encode([
        // "status" => "error",
        // "message" => "No action specified."
    // ]);
    // exit;
// }
// 
//