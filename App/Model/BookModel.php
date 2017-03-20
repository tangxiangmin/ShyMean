<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 2017/3/20
 * Time: 21:04
 */

namespace App\Model;

use Core\Lib\Model;

class BookModel extends Model{
    public $tablename = 'shymean_book';

    public function __construct(){
        parent::__construct($this->tablename);
    }

    public function getAll(){
        $res = $this->select();
        return $res;
    }
}