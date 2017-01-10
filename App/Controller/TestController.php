<?php

namespace App\Controller;
use Core\Lib\Controller;

class TestController extends Controller{
    public function index(){
        $this->view('index');
    }
    public function test(){
        dd('test');
    }
}