<?php

namespace Core\Lib;
class Route {
    public $group = 'Home';
    public $ctrl = 'Index';
    public $action = 'index';

    public function __construct(){
        $urlArr = explode('/',trim($_SERVER['REQUEST_URI'],'/'));
        if (isset($urlArr[0]) && $urlArr[0] != ''){
            $this->group = $urlArr[0];
        }
        if (isset($urlArr[1]) && $urlArr[1] != ''){
            $this->ctrl = $urlArr[1];
        }
        if (isset($urlArr[2])){
            $this->action = $urlArr[2];
        }

        // 如果传参则必须显式声明控制器和方法名
        if (isset($urlArr[3])){
            $getArr = explode('&',$urlArr[3]);
            foreach($getArr as $v ){
                $pair = explode('=',$v);
                $_GET[$pair[0]] = $pair[1];
            }
        }
    }
}