<?php

namespace App\Home\Controller;
use Core\Lib\Controller;

class IndexController extends Controller{
    public function index(){
        $this->view('index');
    }

    public function canvas(){
        $this->view('canvas');
    }

    public function about(){
        $this->view('about');
    }
}