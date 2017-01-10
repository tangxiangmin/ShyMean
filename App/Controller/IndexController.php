<?php

namespace App\Controller;
use Core\Lib\Controller;

class IndexController extends Controller{
    public function index(){
        $this->assign('test','helloWrold');
        $this->view('test');
    }
    public function test(){
        dd('test');
    }
}