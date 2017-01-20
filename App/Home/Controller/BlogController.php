<?php

namespace App\Home\Controller;
use Core\Lib\Controller;

class BlogController extends Controller{
    public function index(){
        $this->view('index');
    }
}