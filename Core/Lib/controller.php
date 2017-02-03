<?php
namespace Core\Lib;
class Controller {
    public $assignArr = [];
    public function __construct(){

    }

    public function assign($key,$val){
        $this->assignArr[$key] = $val;
    }

    public function view($file){
        try{
            extract($this->assignArr);

            $pathArr = explode('\\',get_class($this));
            $pathArr[count($pathArr) - 2] ='View';
            $ctrName = $pathArr[count($pathArr) - 1];
            $pathArr[count($pathArr) - 1] = str_replace('Controller','',$ctrName);

            $path = ROOT.'/'.implode($pathArr,'/').'/'.$file.'.html';

            include_once $path;
        }catch(\Exception $e) {
            echo $e->getMessage();
        }
    }
}