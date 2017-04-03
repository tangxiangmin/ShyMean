<?php

namespace App\Model;

use Core\Lib\Model;

class BookModel extends Model{
    public $tablename = 'shymean_book';

    public function __construct(){
        parent::__construct($this->tablename);
    }

    public function getAll(){
        $res = $this->orderBy("created_at")->select();
        return $res;
    }

}