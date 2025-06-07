<?php

namespace App\Models;

use App\Config\Connection;
use PDO;
use PDOException;

class Users{
    private $db;

    // dependency injection
    public function __construct(Connection $dbConnection)
    {
        $this->db = $dbConnection->connect();
    }

    public function getAllUsers()
    {
        try{
            $stmt = $this->db->prepare("SELECT * FROM users");
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
            return [];
        }
    }

    // insert
    public function insertUser($username, $email, $password)
    {
        try{
            $stmt = $this->db->prepare("INSERT INTO users (username, email, password) VALUES (:username, :email, :password)");
            $stmt->execute([
                'username' => $username,
                'email' => $email,
                'password' => password_hash($password, PASSWORD_BCRYPT)
            ]);
            return $this->db->lastInsertId();
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
            return null;
        }
    }

    // find
    public function findUserByEmail($email)
    {
        try{
            $stmt = $this->db->prepare("SELECT * FROM users WHERE email = :email");
            $stmt->execute(['email' => $email]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
            return null;
        }
    }
}