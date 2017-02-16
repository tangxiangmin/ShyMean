<?php

namespace App\Home\Controller;
use Core\Lib\Controller;

class LabController extends Controller{

    public function index(){
        $this->view('lab');
    }

}