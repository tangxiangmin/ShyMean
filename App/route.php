<?php
// 绑定路由与控制器
use \Core\Lib\Route;

// 静态页面
Route::bind(['/','index'], function(){
    return include(DIST.'index.html');
});

// 数据接口
Route::bind('blog/detail', '\App\Controller\BlogController@articleDetail');
Route::bind('blog/index', '\App\Controller\BlogController@blogIndex');
Route::bind('blog/stick', '\App\Controller\BlogController@stickiedArticles');
Route::bind('blog/archives', '\App\Controller\BlogController@articleList');
Route::bind('blog/tags', '\App\Controller\BlogController@tags');
Route::bind('blog/books', '\App\Controller\BlogController@books');

