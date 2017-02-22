<?php

namespace App\Home\Controller;
use Core\Lib\Controller;

class LabController extends Controller{

    public function index(){
        $this->view('lab');
    }

    public function canvas(){
        $this->view('canvas');
    }

    public function snake(){
        $this->view('snake');
    }


}