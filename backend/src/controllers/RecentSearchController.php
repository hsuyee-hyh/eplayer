<?php

namespace App\controllers;

use App\Models\RecentSearch;
use App\Config\Connection;
use Exception;

class RecentSearchController
{

    // get user request
    public function recentSearchByUserId($userid)
    {
        $model = new RecentSearch(new Connection());
        $result = $model->recentSearchByUserId($userid);
        if (empty($result) || $result == null) {
            throw new Exception("No Recent Search");
        }
        return $result;
    }

    // show data to user
    public function recentSearchBySearchTerm($userid, $searchTerm){
        $model = new RecentSearch(new Connection());
        $result = $model->recentSearchBySearchTerm($userid, $searchTerm);
        if(empty($result) || $result==null || $result=="false"){
            throw new Exception("No Recent Search Found..");
        }
        return $result;
    }

}
