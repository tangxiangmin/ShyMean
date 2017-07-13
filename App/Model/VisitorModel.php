<?php

namespace App\Model;

use Core\Lib\Model;

class VisitorModel extends Model{
    public $tablename = 'shymean_visitor';

    public function __construct(){
        parent::__construct($this->tablename);
    }

    public function getAll(){
        $res = $this->select();
        return $res;
    }

    public function add($ip){
        $data = [
            "ip" => "'".$ip."'",
            "created_at" => time(),
        ];

        $this->insert($data);
    }

}