<?php

namespace App\Model;
use Core\Lib\Model;

class ArticleModel extends Model {
    public $tablename = 'shymean_article';

    public function __construct(){
        parent::__construct($this->tablename);
    }

    public function getAll(){
        return parent::select();
    }
}