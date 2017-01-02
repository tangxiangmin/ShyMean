<?php
/**
 * 配置类，根据参数加载不同配置文件的相关参数;
 */
namespace Core\Lib;
class conf {
    static public $conf = array();

    static public function get($file,$name=null){
        // 检查缓存
        if (isset(self::$conf[$file])){
            // 返回单个或多个配置
            if (is_null($name)){
                return self::$conf[$file];
            }
            return self::$conf[$file][$name];
        }
        // 加载配置文件
        $path = ROOT.'/Core/Config/'.$file.'.php';
        if (is_file($path)){
            $conf = include $path;
            if (is_null($name)){
                self::$conf[$file] = $conf;
                return $conf;
            }

            if (isset($conf[$name])){
                self::$conf[$file] = $conf;
                return $conf[$name];
            }else {
                throw new \Exception('没有这个配置项'.$file);
            }
        }else {
            throw new \Exception('找不到配置文件'.$file);
        }
    }

}