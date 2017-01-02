<?php

namespace App\Ctrl;
use Core\Lib\Controller;

class IndexCtrl extends Controller{
    public function index(){
        $model = new \App\Model\IndexModel('shop_admin');
        $model->getAll();
    }
    public function test(){
        dd('test');
    }
}