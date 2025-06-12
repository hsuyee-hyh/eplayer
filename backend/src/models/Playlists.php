<?php

namespace App\Models;

use App\Config\Connection;
use PDOException;

class Playlists
{
    private $db;

    public function __construct(Connection $conn)
    {
        $this->db = $conn->connect();
    }

    // get playlist
    public function getAllPlaylists($userid)
    {
        try {
            $stmt = $this->db->prepare(
                "SELECT * FROM playlists WHERE user_id = :userid"
            );
            $stmt->execute([
                "userid" => (int)$userid
            ]);
            $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        } catch (PDOException $e) {
            return $e->getMessage();
        }
    }

    //create playlist
    public function createPlaylist($userid, $title, $description)
    {
        // try {
        $stmt = $this->db->prepare(
            "INSERT INTO playlists (title,description, user_id)
                 VALUES (:title, :description, :userid)"
        );
        $stmt->execute([
            "title" => $title,
            "description" => $description,
            "userid" => (int) $userid
        ]);
        $lastId = $this->db->lastInsertId();
        return $lastId;
        // } catch (PDOException $e) {
        // return $e->getMessage();
        // }
    }
}
