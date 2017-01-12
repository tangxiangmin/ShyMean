<?php

namespace App\Model;
use Core\Lib\Model;

class IndexModel extends Model {
    public $tablename = 'shymean_admin';
    public function __construct(){
        parent::__construct($this->tablename);
    }

    public function getAll(){
        $rows = parent::getAll();
        dd($rows);
    }
}