<?php

namespace App\Home\Controller;
use App\Home\Model\ArticleModel;
use Core\Lib\Controller;
use Core\Utils\Page;

class BlogController extends Controller{
    private $model = null;

    public function __construct(){
        $this->model = new ArticleModel();
        parent::__construct();
    }

    // 博客入口
    public function blog(){
        $this->view('blog');
    }

    //-------------接口------------//

    // 博客首页文章列表及分页
    public function index(){
        $num = 2;
        $total = intval($this->model->count());

        $active = $_REQUEST['active'] - 1;
        $articles = $this->model->orderBy('created_at')->limit($num,$active*$num)->select();

        foreach($articles as &$article){
            $pos = strpos($article['content'],'<!--more-->');
            $abs = substr($article['content'],0,$pos);
            $article['content'] = $abs;
            $article['created_at'] = date('Y-m-d',$article['created_at']);
        }

        $res['articles'] = $articles;
        $res['page'] = [
            'num'=>$num,
            'total'=>$total,
        ];

        exit(json_encode($res));
    }

    // 文章详情
    public function articleDetail(){
        $id = $_REQUEST['id'];
        $article = $this->model->where('id = '.$id)->selectOne();
        $article['created_at'] = date('Y-m-d',$article['created_at']);

        exit(json_encode($article));
    }

    // 标签
    public function tags(){
        $res['categories'] = $this->model->field('category, COUNT(category) AS category_num')->groupBy('category')->select();
        $res['tags'] = $this->model->reset()->field('tags')->select();

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

        $res = $this->model
                    ->field('Year(FROM_UNIXTIME(created_at)) AS year, created_at ,title, id')
                    ->where($where)
                    ->orderBy('created_at')
                    ->select();

        exit(json_encode($res));
    }
}