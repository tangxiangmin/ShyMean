<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 2016/11/20
 * Time: 21:12
 */

namespace Core;
class Core {
    static public function run(){
        // 启动路由
        $route = new Lib\Route();

        $ctrl = $route->ctrl;
        $action = $route->action;
        // 控制器文件路径
        $ctrlFile = APP.'/Ctrl/'.$ctrl.'Ctrl.php';

        // 控制器完全限定名称
        $ctrlName = '\\'.MOUDLE.'\Ctrl\\'.$ctrl.'Ctrl';

        // 加载控制器文件
        if (is_file($ctrlFile)){
            require_once $ctrlFile;

            $ctrl = new $ctrlName();
            $ctrl->$action();

        }else {
            throw new \Exception('找不到控制器:'.$ctrl);
        }
    }
    static public function load($class){
        // 将路径反斜杠都替换成正斜杠
        $class = str_replace('\\','/',$class);
        $path = ROOT.'/'.$class.'.php';
        if (is_file($path)){
            require_once $path;
        }
    }

}