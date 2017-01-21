<?php

namespace App\Home\Controller;
use App\Home\Model\ArticleModel;
use Core\Lib\Controller;

class BlogController extends Controller{
    public function index(){
        $this->view('index');
    }
    public function ajaxIndex(){

        $article = new ArticleModel();
        $res = $article->getAll();
        var_dump($res);
    }
}