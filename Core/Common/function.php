<?php

/**
 * @param $var 需要打印的变量
 */
function dd($var) {

    if (is_bool($var)){
        // 避免将布尔值输出为1
        var_dump($var);
    }else if(is_null($var)) {
        // 避免为null时页面输出为空
        var_dump(NULL);
    }else {
        echo "<pre style='background:#f8f8f8;border-radius:5px; line-height: 20px;border:1px solid #dedede;padding:10px 20px;font-size:20px;'>".print_r($var,true)."</pre>";
    }
    die;
}

function load($path){
    dd($path);
    include $path;
}