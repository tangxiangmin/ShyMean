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
        $articles = $model->getAll();

        foreach($articles as &$article){
            $pos = strpos($article['content'],'<!--more-->');
            $abs = substr($article['content'],0,$pos);
            $article['content'] = $abs;
        }

        exit(json_encode($articles));
    }
}