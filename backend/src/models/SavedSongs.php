<?php

namespace App\Models;

use App\Config\Connection;
use PDOException;

class SavedSongs
{
    private $db;

    public function __construct(Connection $conn)
    {
        $this->db = $conn->connect();
    }

    public function getAllSongs($userid)
    {
        try {
            $stmt = $this->db->prepare(
                "SELECT u.*, s.* 
                FROM users u 
                INNER JOIN playlists p ON u.id = p.user_id 
                INNER JOIN playlists_songs ps ON ps.playlist_id=p.playlist_id 
                INNER JOIN songs s ON s.song_id=ps.song_id
                WHERE u.id =:userid"
            );
            $stmt->execute([
                "userid" => (int) $userid
            ]);
            $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        } catch (PDOException $e) {
            return $e->getMessage();
        }
    }
}
