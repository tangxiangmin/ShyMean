<?php

namespace App\Home\Model;
use Core\Lib\Model;

class ArticleModel extends Model {
    public $tablename = 'shymean_article';

    public function __construct(){
        parent::__construct($this->tablename);
    }

    // 这个模型现在貌似没有什么用了。

}