<?php

namespace App\Controllers;

use App\Config\Connection;
use App\Models\SavedSongs;
use Exception;

class SavedSongsController
{
    private $model;

    public function __construct()
    {
        $this->model = new SavedSongs(new Connection());
    }

    public function songs($userid)
    {
        $result = $this->model->getAllSongs($userid);
        if (!$result || empty($result) || $result == null) {
            throw new Exception("Songs are not found.");
        }
        return $result;
    }
}
