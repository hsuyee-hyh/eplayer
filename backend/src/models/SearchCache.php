<?php

namespace App\models;

use App\Config\Connection;

class SearchCache
{
    private $db;
    public function __construct(Connection $conn)
    {
        $this->db = $conn->connect();
    }

    public function getLatest($searchTerm)
    {
        $stmt = $this->db->prepare(
            "SELECT * FROM user_search_cache"
        );
        $stmt->execute();
        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        // fuzzy match
        foreach ($result as $row) {
            similar_text($row['keyword'], $searchTerm, $percent);

            // get latest 10
            if ($percent > 30) {
                $stmt = $this->db->prepare(
                    "SELECT * FROM user_search_cache WHERE keyword LIKE :searchTerm ORDER BY search_query_id DESC LIMIT 20"
                );
                $stmt->execute([
                    "searchTerm" => '%' . $searchTerm . '%'
                ]);
                $latestResult = $stmt->fetchAll(\PDO::FETCH_ASSOC);
                return $latestResult;
            } else {
                return null;
            }
        }
    }
}
