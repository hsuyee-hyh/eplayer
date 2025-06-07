<?php

namespace App\Controllers;

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");



use App\Models\Users;
use App\Config\Connection;
use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthController
{

    /**
     * register.
     */
    public function signup($data)
    {

        // For example, you can insert the user into the database
        $user = new Users(new Connection());
        $foundUser = $user->findUserByEmail($data['email']);
        if ($foundUser) {
            throw new Exception("Your Email already Existed");
        }
        $userId = $user->insertUser($data['username'], $data['email'], $data['password']);
        if (!$userId) {
            throw new Exception("User Registration Failed");
        }
        return $userId;
        // header('Location: http://localhost:5173/');
    }

    /**
     * login.
     */
    public function login($data)
    {

        $user = new Users(new Connection());
        $foundUser = $user->findUserByEmail($data['email']);
        if (!$foundUser) {
            throw new Exception("User not Found");
        }
        if (!password_verify($data['password'], $foundUser['password'])) {
            throw new Exception("Invalid Password");
        }

        /** define JWT */
        $issuedAt = time();
        // $expiration = $issuedAt + 3600; // valid for 1 hour
        $secretKey = bin2hex(random_bytes(64));

        $payload = [
            'iss' => 'http://localhost:5173',
            'iat' => $issuedAt,
            // 'exp' => $expiration,
            'email' => $data['email']
        ];

        $jwt = JWT::encode($payload, $secretKey, 'HS256');

        // set cookie and store localStorage in frontend
        setcookie("token", $jwt, [
            // "expires" => $expiration,
            "httponly" => true,
            "secure" => false, //  true for HTTPS
            "samesite" => "Strict"
        ]);
        $result = [
            "foundUser" => $foundUser,
            "token" => $jwt
        ];
        return $result;
        // header('Location: http://localhost:5173/home');
    }
}
