<?php

namespace App\Config;

require_once __DIR__ . '../../vendor/autoload.php';

use App\controllers\SearchCacheController;
use Exception;
use Google\Service\YouTube;
use Google_Client;


session_start();
// unset($_SESSION['api_response']);
// if (isset($_SESSION['api_response'])) {
// unset($_SESSION['api_response']);
// }



// unset($_SESSION['api_response']);
header("Access-Control-Allow-Origin: http://localhost:5173"); // Replace with your React origin
header("Access-Control-Allow-Credentials: true"); // 🔥 Enable cookie support
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-type: application/json");

// if (!file_exists(__DIR__ . '/vendor/autoload.php')) {
// throw new Exception(sprintf('Please run "composer require google/apiclient:~2.0" in "%s"', __DIR__));
// }
// require_once __DIR__ . '/vendor/autoload.php';


// require_once __DIR__ . '/DbConnection.php';
// require_once __DIR__ . '/SqlTables.php';
// $searchQuery = "";

//// get data from $_SESSION ////
// if (isset($_SESSION['api_response'])) {



// $session_id = session_id();
// echo json_encode([
// "status" => "success from session",
// "message" => $_SESSION['api_response'],
// "searchQuery" => $searchQuery,
// ]);
// exit();

// echo gettype($_SESSION['api_response']);
// echo "<br>";

// $decoded_jsonstring = json_decode($_SESSION['api_response']);
// print_r($decoded_jsonstring);
// echo "<h1>title is: " . $decoded_jsonstring[0]->snippet->title . "</h1>";
// exit;


/////////// db connection ///////////
// require_once __DIR__ . '/DbConnection.php';
// require_once __DIR__ . '/SqlTables.php';
// $db = new DbConnection();
// $table = new SqlTables($db);

// insert
// $count = $table->insert($session_id, $searchQuery, $decoded_jsonstring[0], new DateTime());
// echo `<h1>count is: $count</h1>`;
// }


try {


    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // error_log('PHPSessionid', session_id());
        // react request object
        $raw_input = file_get_contents("php://input");
        $data = json_decode($raw_input, true);
        $searchTerm = $data['searchTerm'] ?? "";

        try {
            ///////////// $_Session ///////////////
            // get the 10 latest song from Database
            if (isset($_SESSION['api_response']) && $data['jwtToken']) {

                // 10 latest song
                $controller =new SearchCacheController();
                $result = $controller->latest($searchTerm);
                echo json_encode([
                    "status" => "success from session",
                    // "message" => "Hey, PHP received form data of $username",
                    "message" => $_SESSION['api_response'],
                    "session_id" => session_id(),
                    "data" => $result
                ]);

                // $decoded_jsonstring = json_decode($_SESSION['api_response']);
                // echo "decoded json string is " . $decoded_jsonstring;
                // dbconnection
                // require_once __DIR__ . '/DbConnection.php';
                // require_once __DIR__ . '/SqlTables.php';
                // $db = new DbConnection();
                // $table = new SqlTables($db);
                // $count = $table->insert($searchQuery, $decoded_jsonstring[0], new DateTime());
                // echo "<br><h1>count is: $count</h1>";
                // exit();
            }
        } catch (Exception $e) {
            echo json_encode([
                "status" => "error",
                "message" => $e->getMessage()
            ]);
        }

        if (!isset($_SESSION['api_response'])) {

            ////////// 1. youtube api client
            $client = new Google_Client();
            $client->setApplicationName('Backend');
            $client->setScopes([
                'https://www.googleapis.com/auth/youtube.readonly',
            ]);
            // apikey
            $client->setDeveloperKey('AIzaSyBNQptjaUFjfrW9Eaqe7C-8OKjpzcQW5lI');

            /////////// 2. api service
            $service = new YouTube($client);
            // user input params
            // $queryParams = [
            // 'channelId' => $searchQuery,
            // 'maxResults' => 25
            // ];
            $channelResponse = $service->channels->listChannels('contentDetails', [
                // 'id' => $searchTerm // Replace with the channel ID
                'id' => "UC0C-w0YjGpqDXGB8IHb662A"
            ]);

            $uploadsPlaylistId = $channelResponse['items'][0]['contentDetails']['relatedPlaylists']['uploads'];

            $response = $service->playlistItems->listPlaylistItems('snippet,contentDetails', [
                'playlistId' => $uploadsPlaylistId,
                'maxResults' => 25
            ]);

            // $videoIds = [];
            // foreach ($response['items'] as $item) {
            // $videoIds[] = $item['contentDetails']['videoId'];
            // }

            // store in $_SESSION 
            // store the latest api response from 'user_search_cache'
            $_SESSION['api_response'] = $response->getItems();

            echo json_encode([
                "status" => "success from creating new api call",
                "data" => $response->getItems(),
            ]);

            // insert into db;
            // $decoded_phpobj = json_decode($encoded_jsonstring);
            // echo "decoded json string is " . $decoded_jsonstring;
            // dbconnection
            // require_once __DIR__ . '/DbConnection.php';
            // require_once __DIR__ . '/SqlTables.php';
            // $db = new DbConnection();
            // $table = new SqlTables($db);
            // $count = $table->insert($searchQuery, $decoded_jsonstring[0], new DateTime());
            // echo "<br><h1>count is: $count</h1>";
            // exit();
        }
    }
} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage(),
    ]);
}
