<?php

namespace App\controllers;

use App\models\SearchCache;
use App\Config\Connection;
use Exception;

class SearchCacheController{
    public function latest($searchTerm){
        // get from db
        $model = new SearchCache(new Connection());
        $result = $model->getLatest($searchTerm);
        if(!$result){
            throw new Exception("No data found related to "+$searchTerm);
        }
        return $result;
    }
}