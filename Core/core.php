<?php

namespace Core;
class Core {
    // 核心启动方法
    static public function run(){

        // 加载项目路由
        include APP.'/route.php';

        $route = new Lib\Route();
        $url = $route->getRoute();
        $ctrlName = $url['controller'];
        $action = $url['action'];

        // 控制器完全限定名称
//        $ctrlName = '\\'.MOUDLE.'\\'.$group.'\Controller\\'.$ctrl.'Controller';
        // 加载控制器文件
        try{
            $ctrl = new $ctrlName();
            $ctrl->$action();
        }catch (\Exception $e){
//            echo $e->getMessage();
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