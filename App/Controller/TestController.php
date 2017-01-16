<?php

namespace App\Controller;
use Core\Lib\Controller;

use App\Model;
class TestController extends Controller{
    public function index(){

        $model = new \Core\Lib\Model('shymean_admin');
        $res = $model->select();
        var_dump($res);

//        $this->view('index');

    }

}