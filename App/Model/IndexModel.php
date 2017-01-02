<?php

namespace App\Model;
class IndexModel extends \Core\Lib\model {
    public function __construct($tablename)
    {
        parent::__construct($tablename);
    }

    public function getAll(){
        $sql = 'SELECT * FROM shop_admin';
        $res = $this->query($sql);
        p($res);
    }
}