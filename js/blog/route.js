
/**
 * 配置路由
 */

require.config({
    baseUrl:'/js',
    paths:{
        'index':'blog/blog-index',
        'article':'blog/blog-article',
    }
});

define(['index','article'], function () {
    // 引入组件
    var blogIndex = require('index');
    var article = require('article');


    // 返回路由配置
    return  [{
        path: '/articleDetail',
        component: article
    },{
        path: '/',
        component: blogIndex
    }];
});