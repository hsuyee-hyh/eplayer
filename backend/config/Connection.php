<?php

namespace App\Config;

use PDO;
use PDOException;

class Connection
{
    private $host;
    private $dbName;
    private $username;
    private $password;
    private $connection;

    public function __construct($host="localhost", $dbName="esound", $username="root", $password="root123")
    {
        $this->host = $host;
        $this->dbName = $dbName;
        $this->username = $username;
        $this->password = $password;
    }

    public function connect()
    {
        try {
            $this->connection = new PDO("mysql:host={$this->host};dbname={$this->dbName}", $this->username, $this->password);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $this->connection;
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
            exit();
        }
    }
}
