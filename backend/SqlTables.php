<?php

namespace SqlTables;

require_once 'DbConnection.php';

use DbConnection\DbConnection;
use PDO;
use PDOException;

class SqlTables
{
    private $db;
    public function __construct(DbConnection $db)
    {
        $this->db = $db->getConnection();
    }

    //insert
    public function insert($searchQuery, $videoId, $image)
    {
        try {
            $stmt = $this->db->prepare("INSERT INTO user_search_cache (search_query, video_id, image_link) VALUES (:search_query, :video_id, :image_link)");
            $stmt->execute([
                ':search_query' => $searchQuery,
                ':video_id' => $videoId,
                ':image_link' => $image
            ]);
            return $stmt->rowCount();
        } catch (PDOException $e) {
            return "Error: " . $e->getMessage();
        }
    }

    // selectall
    public function selectAll()
    {
        try {
            $stmt = $this->db->prepare(
                "SELECT * FROM user_search_cache ORDER BY search_query_id DESC"
            );
            $stmt->execute();
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            return "Error: " . $e->getMessage();
        }
    }
}
