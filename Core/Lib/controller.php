<?php
namespace Core\Lib;

class Controller {
    public $assignArr = [];

    public function assign($key,$val){
        $this->assignArr[$key] = $val;
    }

    public function show($file){
        if(is_file($file)) {
            extract($this->assignArr);
            include($file);
        }
    }
}