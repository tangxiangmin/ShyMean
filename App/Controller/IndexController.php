<?php

namespace App\Controller;
use Core\Lib\Controller;

class IndexController extends Controller{
    public function index(){
        $this->view('index');
    }

    public function about(){
        $this->view('about');
    }
}