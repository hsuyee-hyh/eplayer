<?php

session_start();


error_log('PHPSESSID: ' . session_id());
error_log('Session file: ' . session_save_path() . '/sess_' . session_id());
error_log('Session contents: ' . print_r($_SESSION, true));

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Authorization, Content-Type");
header("Content-type: application/json");


if (!isset($_SESSION['count'])) {
    $_SESSION['count'] = 1;
} else {
    $_SESSION['count']++;
}

echo json_encode([
    'session_id' => session_id(),
    'count' => $_SESSION['count'],
    'session' => $_SESSION
]);
