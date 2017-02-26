<?php

// 定义路径常量
define('ROOT',dirname(__FILE__));
define('CORE',ROOT.'/Core');
define('APP',ROOT.'/App');
define('MOUDLE','App');
define('HTML',ROOT.'/html/');

// 调试模式
ini_set('display_errors','1');

// 加载函数库
include CORE.'/Common/function.php';



// 加载核心文件
include CORE.'/Core.php';


// 自动加载类
spl_autoload_register('Core\Core::load');

// 启动程序
\Core\Core::run();