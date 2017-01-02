<?php

// 定义路径常量
define('ROOT',dirname(__FILE__));
define('CORE',ROOT.'/Core');
define('APP',ROOT.'/App');
define('MOUDLE','App');

// 调试模式
define('DEBUG',true);

if (DEBUG){
    ini_set('display_errors','1');
}else {
    ini_set('display_errors','0');
}

// 加载函数库
include CORE.'/Common/function.php';
// 加载核心文件
include CORE.'/core.php';
// 自动加载类
spl_autoload_register('Core\core::load');

// 启动程序
\core\core::run();