<?php
// 绑定路由与控制器
use \Core\Lib\Route;

// 静态页面
Route::bind(['/','index'], function(){
    return include(DIST.'index.html');
});
Route::bind('blog', function(){
    return include(HTML.'blog.html');
});
Route::bind('lab', function(){
    return include(HTML.'lab.html');
});
Route::bind('about', function(){
    return include(HTML.'about.html');
});


// 数据接口

// 博客

Route::bind('blog/detail', '\App\Home\Controller\BlogController@articleDetail');
Route::bind('blog/index', '\App\Home\Controller\BlogController@blogIndex');
Route::bind('blog/archives', '\App\Home\Controller\BlogController@articleList');
Route::bind('blog/tags', '\App\Home\Controller\BlogController@tags');


// 实验室
Route::bind('lab_demoList', '\App\Home\Controller\LabController@labList');
