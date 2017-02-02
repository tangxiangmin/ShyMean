<?php

namespace App\Home\Controller;
use App\Home\Model\ArticleModel;
use Core\Lib\Controller;

class BlogController extends Controller{
    public function index(){
        $this->view('index');
    }
    public function ajaxIndex(){

        $model = new ArticleModel();
        $articles = $model->query('SELECT * FROM shymean_article ORDER BY created_at DESC');

        foreach($articles as &$article){
            $pos = strpos($article['content'],'<!--more-->');
            $abs = substr($article['content'],0,$pos);
            $article['content'] = $abs;
            $article['created_at'] = date('Y-m-d',$article['created_at']);
        }

        exit(json_encode($articles));
    }
}