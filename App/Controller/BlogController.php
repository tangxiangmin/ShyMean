<?php

namespace App\Controller;
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

        $articles = $this->articleModel->getArticles($num, $active*$num);

        $res['articles'] = $articles;
        $res['page'] = array(
            'num'=>$num,
            'total'=>$total,
        );

        exit(json_encode($res));
    }
    function stickiedArticles(){
        $res = $this->articleModel->getStickiedArticles();
        exit(json_encode($res));
    }

    // 文章详情
    public function articleDetail(){

        $title = $_REQUEST['title'];

        $this->articleModel->where("title = '".$title."'")->update('browse = browse+1');

        $article = $this->articleModel->getArticleDetail($title);


        $time = $article['created_at'];
        $prev = $this->articleModel->getPrevArticle($time);
        $next = $this->articleModel->getNextArticle($time);

        $data = array(
            'prev'=>$prev,
            'next'=>$next,
            'article'=>$article,
        );

        exit(json_encode($data));
    }

    // 标签
    public function tags(){
        $res = $this->articleModel->getTags();
        exit(json_encode($res));
    }

    // 列表页
    public function articleList(){
        $type = $_POST['type'];
        $name = $_POST['name'];
        $where = '';
        $num = $this->archivesPage;
        $active = $_REQUEST['active'] - 1 || 0;
        $offset = $active*$num;

        // 判断是标签，分类还是归档
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


        $total = intval($this->articleModel->where($where)->count());
        $res['lists'] = $this->articleModel->getArticleList($where, $num, $offset);

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