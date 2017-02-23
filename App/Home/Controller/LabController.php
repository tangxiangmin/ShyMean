<?php

namespace App\Home\Controller;
use App\Home\Model\LabModel;
use Core\Lib\Controller;

class LabController extends Controller{
    private $model = null;

    public function __construct(){
        $this->model = new LabModel();
        parent::__construct();
    }

    public function labList(){
        $res = $this->model->select();
        exit(json_encode($res));
    }
}