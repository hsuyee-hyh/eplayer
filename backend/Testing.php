<?php
require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/SqlTables.php';

session_start();

use DbConnection\DbConnection;
use SqlTables\SqlTables;


$session_obj = json_decode(json_encode($_SESSION['api_response']), false); // array
echo "<br><br>";
echo gettype($session_obj);
// 
echo "<br><br><br>";
// var_dump($session_obj[0]);
// 

//// insert into db
$table = new SqlTables(new DbConnection());


foreach ($session_obj as $item) {
    // var_dump($item);
    echo $item->snippet->title;
    // echo $item['snippet']['title'];
    echo "<br>";

    echo $item->contentDetails->videoId;
    echo "<br>";

    echo $item->snippet->thumbnails->default->url;
    echo "<br><br>";

    //insert
    $table->insert(
        $item->snippet->title,
        $item->contentDetails->videoId,
        $item->snippet->thumbnails->default->url
    );
    echo "insert successful";
}

// foreach ($session_obj as $item) {
    // print_r($item);
    // echo "<br><br>";
    // print_r($item->snippet);

    // echo "<br><br>";
    // echo $item->snippet->title;

    // echo "<br><br>";
    // echo "<img src='{$item->snippet->thumbnails->default->url}' alt='img url' />";
// }

// 

// echo "session obj is " . $session_obj;

// echo "<br>";

// echo "type is " . gettype($session_obj);
