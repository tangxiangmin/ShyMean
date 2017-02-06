<?php

namespace App\Admin\Controller;
use Core\Lib\Controller;

class IndexController extends Controller{

    public function index(){
        $this->view('index');
    }


}