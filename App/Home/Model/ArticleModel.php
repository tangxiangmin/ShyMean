<?php

namespace App\Home\Model;
use Core\Lib\Model;

class ArticleModel extends Model {
    public $tablename = 'shymean_article';

    public function __construct(){
        parent::__construct($this->tablename);
    }

    public function getAll(){
        $rows = parent::getAll();
        dd($rows);
    }
}