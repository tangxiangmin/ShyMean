<?php

namespace App\Home\Controller;
use App\Model\ArticleModel;
use App\Model\BookModel;

use Core\Lib\Controller;

class BlogController extends Controller{
    private $articleModel = null;
    private $bookModel = null;

    // 首页分页数量
    private $indexPage = 10;

    // 归档页分页数量
    private $archivesPage = 20;

    public function __construct(){
        $this->articleModel = new ArticleModel();
        $this->bookModel = new BookModel();
        parent::__construct();
    }

    //-------------接口------------//

    // 博客首页文章列表及分页
    public function blogIndex(){
        $num = $this->indexPage;
        $total = intval($this->articleModel->count());

        $active = $_REQUEST['active'] - 1;
        $articles = $this->articleModel->orderBy('created_at')->limit($num,$active*$num)->select();

        foreach($articles as &$article){
            $pos = strpos($article['content'],'<!--more-->');
            $abs = substr($article['content'],0,$pos);
            $article['content'] = $abs;
            $article['created_at'] = date('Y-m-d',$article['created_at']);
        }

        $res['articles'] = $articles;
        // 那台虚拟机不支持[]的格式...
        $res['page'] = array(
            'num'=>$num,
            'total'=>$total,
        );


        exit(json_encode($res));
    }

    // 文章详情
    public function articleDetail(){

        $title = $_REQUEST['title'];

        $this->articleModel->where("title = '".$title."'")->update('browse = browse+1');

        $article = $this->articleModel->where("title = '".$title."'")->selectOne();

        $time = $article['created_at'];
        $prev = $this->articleModel->field('title')->where('created_at > '.$time)->orderby('created_at')->selectOne();
        $next = $this->articleModel->field('title')->where('created_at < '.$time)->orderBy('created_at')->selectOne();

        $article['created_at'] = date('Y-m-d',$article['created_at']);
        $data = array(
            'prev'=>$prev,
            'next'=>$next,
            'article'=>$article,
        );
        exit(json_encode($data));
    }

    // 标签
    public function tags(){
        $res['categories'] = $this->articleModel->field('category, COUNT(category) AS category_num')->groupBy('category')->select();
        $res['tags'] = $this->articleModel->reset()->field('tags')->select();

        exit(json_encode($res));
    }

    // 列表页
    public function articleList(){
        $type = $_POST['type'];
        $name = $_POST['name'];
        $where = '';

        switch ($type){
            case 'archives':
                $where = "id > 0";
                break;
            case 'category':
                $where = " category = '$name'";
                break;
            case 'tag':
                $where = " tags LIKE '%$name%'";
                break;
            default :
                break;
        }

        $num = $this->archivesPage;
        $total = intval($this->articleModel->where($where)->count());
        $active = $_REQUEST['active'] - 1 || 0;

        $res['lists'] = $this->articleModel
                    ->field('Year(FROM_UNIXTIME(created_at)) AS year, created_at ,title, id')
                    ->where($where)
                    ->orderBy('created_at')
                    ->limit($num,$active*$num)
                    ->select();

        $res['page'] = array(
            'num'=>$num,
            'total'=>$total,
        );
        exit(json_encode($res));
    }

    public function books(){
        $res = $this->bookModel->getAll();

        exit(json_encode($res));
    }
}