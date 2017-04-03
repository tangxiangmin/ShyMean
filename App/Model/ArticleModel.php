<?php

namespace App\Model;

use Core\Lib\Model;

class ArticleModel extends Model
{
    public $tablename = 'shymean_article';

    public function __construct()
    {
        parent::__construct($this->tablename);
    }

    public function getAll()
    {
        return parent::select();
    }

    // 获取常规文章列表
    function getArticles($num, $offset)
    {
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
    function getStickiedArticles()
    {
        $res = $this->where("status > 1")
            ->field("title, category, created_at, abstract, browse")
            ->orderBy("status")
            ->select();
        return $res;
    }

    function getTags()
    {
        $res['categories'] = $this->field('category, COUNT(category) AS category_num')->groupBy('category')->select();
        $res['tags'] = $this->reset()->field('tags')->select();
        return $res;
    }

    function getArticleList($where, $num, $offset)
    {
        $articleList = $this->field('Year(FROM_UNIXTIME(created_at)) AS year, created_at ,title, id')
            ->where($where)
            ->orderBy('created_at')
            ->limit($num, $offset)
            ->select();
        return $articleList;
    }

    function getArticleDetail($title)
    {
        $article = $this->where("title = '" . $title . "'")->selectOne();
        return $article;
    }

    function getPrevArticle($creared_at)
    {
        $prev = $this->field('title')
            ->where('created_at > ' . $creared_at)
            ->orderby('created_at')
            ->selectOne();
        return $prev;
    }

    function getNextArticle($created_at)
    {
        $next = $this->field('title')
            ->where('created_at < ' . $created_at)
            ->orderBy('created_at')
            ->selectOne();
        return $next;
    }
}