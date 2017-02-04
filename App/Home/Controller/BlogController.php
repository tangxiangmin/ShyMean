<?php

namespace App\Home\Controller;
use App\Home\Model\ArticleModel;
use Core\Lib\Controller;

class BlogController extends Controller{
    private $model = null;
    public function __construct(){
        $this->model = new ArticleModel();
        parent::__construct();
    }

    public function blog(){
        $this->view('blog');
    }

    public function index(){

        $articles = $this->model->orderBy('created_at')->select();

        foreach($articles as &$article){
            $pos = strpos($article['content'],'<!--more-->');
            $abs = substr($article['content'],0,$pos);
            $article['content'] = $abs;
            $article['created_at'] = date('Y-m-d',$article['created_at']);
        }

        exit(json_encode($articles));
    }

    public function article(){
        $id = $_REQUEST['id'];
        $article = $this->model->where('id = '.$id)->selectOne();

        $article['created_at'] = date('Y-m-d',$article['created_at']);
        exit(json_encode($article));
    }

    public function tags(){
        $res['categories'] = $this->model->field('category, COUNT(category) AS category_num')->groupBy('category')->select();
        $res['tags'] = $this->model->reset()->field('tags')->select();
        exit(json_encode($res));
    }

    public function test(){
        var_dump($this->model->orderBy('id')->select());
    }
}