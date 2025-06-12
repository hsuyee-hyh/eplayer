<?php

namespace App\Controllers;

use App\Config\Connection;
use App\Models\Playlists;
use Exception;

class PlaylistController
{

    private $model;
    public function __construct()
    {
        
        $this->model = new Playlists(new Connection());
    }


    public function playlists($userid)
    {
        $result = $this->model->getAllPlaylists($userid);
        if (!$result || $result==null || empty($result)) {
            throw new Exception("No Playlist Found!");
        }
        return $result;
    }

    public function createPlaylist($userid, $title, $description)
    {
        if (empty($userid) || empty($title) || !isset($userid) || !isset($title)) {
            throw new Exception("User ID and playlist name are required.");
        }
        $result = $this->model->createPlaylist($userid, $title, $description);
        
        if (!$result || $result==null || empty($result)) {
            throw new Exception("Failed to create playlist.");
        }
        return $result;
    }
}
