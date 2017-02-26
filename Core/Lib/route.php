<?php

namespace Core\Lib;
class Route {
    public $group = '';
    public $ctrl = '';
    public $action = '';

    // 默认
    static public $routes = array(
        '/' => 'Home/Index@index'
    );

    public function __construct(){
//        $urlArr = explode('/',trim($_SERVER['REQUEST_URI'],'/'));
//        if (isset($urlArr[0]) && $urlArr[0] != ''){
//            $this->group = $urlArr[0];
//        }
//        if (isset($urlArr[1]) && $urlArr[1] != ''){
//            $this->ctrl = $urlArr[1];
//        }
//        if (isset($urlArr[2])){
//            $this->action = $urlArr[2];
//        }
//
//        // 如果传参则必须显式声明控制器和方法名
//        if (isset($urlArr[3])){
//            $getArr = explode('&',$urlArr[3]);
//            foreach($getArr as $v ){
//                $pair = explode('=',$v);
//                $_GET[$pair[0]] = $pair[1];
//            }
//        }
    }
    public function getRoute(){

        $url = $_SERVER['REQUEST_URI'];
        if ($url != '/'){
            $url = trim($url, '/');
        }
//        dd(self::$routes);
        $route = self::$routes[$url];

        // 如果是闭包，则执行
        if(is_callable($route)){
            exit($route());
        }

        // 如果是MVC路由，则加载相应控制器
        if (is_string($route)){
            $server = explode('@',$route);
            return array(
                'controller'=> $server[0],
                'action' =>$server[1]
            );
        }
    }

    static public function bind($url,$action){
        // 目前只实现了基础的路由加载，连接后端数据接口
        // 待增添新的功能
        // todo

        if (is_array($url)){
            foreach($url as $u){
                self::$routes[$u] = $action;
            }
        }else {
            self::$routes[$url] = $action;
        }

    }
}