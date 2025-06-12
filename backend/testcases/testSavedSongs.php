<?php
require_once __DIR__ . '/../vendor/autoload.php';

use App\Models\SavedSongs;
use App\Config\Connection;
use App\Controllers\SavedSongsController;

// Replace with a valid user ID from your database
$userid = 1;

$model = new SavedSongs(new Connection());
$controller = new SavedSongsController();
$result = $model->getAllSongs($userid);
$controllerResult = $controller->songs($userid);


header('Content-Type: application/json');
echo json_encode($controllerResult, JSON_PRETTY_PRINT);
