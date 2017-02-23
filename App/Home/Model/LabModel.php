<?php

namespace App\Home\Model;
use Core\Lib\Model;

class LabModel extends Model {
    public $tablename = 'shymean_lab';

    public function __construct(){
        parent::__construct($this->tablename);
    }

    // 这个模型现在貌似没有什么用了。

}