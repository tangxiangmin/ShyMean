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

    // 获取常规文章列表
    function getArticles($num, $offset){
        $articles = $this->where("status = 1")
                         ->field("title, category, created_at, abstract, browse")
                         ->orderBy('created_at')
                         ->limit($num, $offset)
                         ->select();
        return $articles;
    }

    // 获取置顶文章列表 通过status字段查询
    // 0： 文章不显示
    // 1： 违章未置顶
    // 2-* 置顶权重值
    function getStickiedArticles(){
        $res = $this->where("status > 1")
                    ->field("title, category, created_at, abstract, browse")
                    ->orderBy("status")
                    ->select();
        return $res;
    }
}