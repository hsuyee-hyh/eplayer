<?php

namespace App\Models;

use App\Config\Connection;
use Exception;

class RecentSearch
{
    private $db;
    private $inserted = "false";

    public function __construct(Connection $conn)
    {
        $this->db = $conn->connect();
    }

    public function getAllSearch()
    {
        $stmt = $this->db->prepare("SELECT * FROM recent_search");
        $result = $stmt->execute();
        if (!$result) {
            throw new Exception("Can't insert your Search!");
            exit();
        }
        return $result;
    }

    public function recentSearchByUserId($userid)
    {
        try {
            $stmt = $this->db->prepare(
                "SELECT * FROM recent_search s INNER JOIN users u ON s.user_id = u.id WHERE u.id=:userid"
            );
            $stmt->execute([
                "userid" => $userid
            ]);
            $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        } catch (Exception $e) {
            echo $e->getMessage();
            exit();
        }
    }

    public function recentSearchBySearchTerm($userid, $searchTerm)
    {
        try {
            $stmt = $this->db->prepare(
                "SELECT * FROM recent_search s INNER JOIN users u ON s.user_id = u.id WHERE s.user_id=:userid ORDER BY s.recent_search_id DESC"
            );
            $stmt->execute([
                "userid" => (int)$userid
            ]);
            $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

            // insert if empty
            if (empty($result)) {
                $this->inserted = $this->insertRecentSearch($userid, $searchTerm);
            } else {
                $found = false;
                // fuzzy match test
                foreach ($result as $row) {
                    similar_text($row['search_term'], $searchTerm, $percent);
                    if ($percent > 60) {
                        $found = true;
                        // get that found search_term 
                        $stmt = $this->db->prepare(
                            "SELECT * FROM recent_search s INNER JOIN users u ON s.user_id=u.id WHERE s.user_id=:userid AND s.search_term LIKE :searchTerm"
                        );
                        $stmt->execute([
                            "userid" => (int)$userid,
                            "searchTerm" => '%' . $row['search_term'] . '%'
                        ]);
                        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
                        return $result;
                    }
                }
                if (!$found) {
                    // youtube api call
                    // insert into recent_search
                    $this->insertRecentSearch($userid, $searchTerm);
                    $stmt = $this->db->prepare(
                        "SELECT * FROM recent_search s INNER JOIN users u ON s.user_id = u.id WHERE s.user_id=:userid AND s.search_term LIKE :searchTerm"
                    );
                    $stmt->execute([
                        "userid" => (int)$userid,
                        "searchTerm" => '%' . $searchTerm . '%'
                    ]);
                    $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
                    return $result;
                }
                // return $result;
            }
        } catch (Exception $e) {
            // error_log($e->getMessage());
            // throw new Exception($e->getMessage());
            http_response_code(500);
            echo json_encode([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }

    public function insertRecentSearch($userid, $searchTerm)
    {
        try {
            $insertStmt = $this->db->prepare(
                "INSERT INTO recent_search (user_id, search_term, search_type, search_at) VALUES (:userid, :searchTerm, :searchType, NOW()) "
            );
            $inserted = $insertStmt->execute([
                "userid" => (int)$userid,
                "searchTerm" => $searchTerm,
                "searchType" => "YouTube"
            ]);
            return $inserted;
        } catch (Exception $e) {
            // throw new Exception($e->getMessage());
            // error_log($e->getMessage());
            http_response_code(500);
            echo json_encode([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
            exit();
        }
    }
}
