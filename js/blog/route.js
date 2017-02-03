
/**
 * 配置路由
 */

require.config({
    baseUrl:'/js',
    paths:{
        'index':'blog/blog-index',
        'article':'blog/blog-article',
        'tags':'blog/blog-tags',
    }
});

define(['index','article','tags'], function () {
    // 引入组件
    var blogIndex = require('index');
    var article = require('article');
    var tags = require('tags');


    // 返回路由配置
    return  [{
        path: '/',
        component: blogIndex
    },{
        path: '/articleDetail/:id',
        name: 'articleDetail',
        component: article
    },{
        path: '/tags',
        component: tags
    }];
});