<?php

/**
 * Sample PHP code for youtube.channels.list
 * See instructions for running these code samples locally:
 * https://developers.google.com/explorer-help/code-samples#php
 */

if (!file_exists(__DIR__ . '/vendor/autoload.php')) {
  throw new Exception(sprintf('Please run "composer require google/apiclient:~2.0" in "%s"', __DIR__));
}
require_once __DIR__ . '/vendor/autoload.php';

$client = new Google_Client();
$client->setApplicationName('API code samples');
$client->setDeveloperKey('AIzaSyA8u4gMYhXmVzWc9ykYOynh3gcKmht8hQQ');

// Define service object for making API requests.
$service = new Google\Service\YouTube($client);

$queryParams = [
  'id' => 'UC_x5XG1OV2P6uZZ5FSM9Ttw'
];

$response = $service->channels->listChannels('snippet,contentDetails,statistics', $queryParams);
print_r($response);
