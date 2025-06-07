<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/SqlTables.php';

use SqlTables\SqlTables;
use DbConnection\DbConnection;

// get data
$table = new SqlTables(new DbConnection());
$results = $table->selectAll();

$results_json = json_encode($results);

echo $results_json;

// foreach ($results as $result) {
    // echo "<br><br>";
    // echo $result['video_id'];
    // echo "<br><br>";
// }
