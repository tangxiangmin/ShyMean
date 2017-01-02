<?php

namespace App\Ctrl;
class IndexCtrl{
    public function index(){
        $model = new \App\Model\IndexModel('shop_admin');
        $model->getAll();
    }
    public function test(){
        p('test');
    }
}