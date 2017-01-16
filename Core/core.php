<?php

namespace Core;
class Core {
    // 核心启动方法
    static public function run(){

        $route = new Lib\Route();
        $ctrl = $route->ctrl;
        $action = $route->action;

        // 控制器完全限定名称
        $ctrlName = '\\'.MOUDLE.'\Controller\\'.$ctrl.'Controller';
        // 加载控制器文件
        try{
            $ctrl = new $ctrlName();
            $ctrl->$action();
        }catch (\Exception $e){
            echo $e->getMessage();
        }
    }

    // 自动加载类
    static public function load($class){
        $class = str_replace('\\','/',$class);
        $path = ROOT.'/'.$class.'.php';
        if (is_file($path)){
            require_once $path;
        }
    }

}