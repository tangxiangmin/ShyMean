
/**
 * 配置路由
 */

require.config({
    baseUrl:'/js',
    paths:{

    }
});

define(['index','articleDetail','tags','articleList'], function () {

    // 引入组件
    var blogIndex = require('index');
    var articleDetail = require('articleDetail');
    var tags = require('tags');
    var articleList = require('articleList');

    // 返回路由配置
    return  [{
        path: '/',
        component: blogIndex
    },{
        path: '/index/:active',
        name: 'index',
        component: blogIndex
    },{
        path: '/articleDetail/:id',
        name: 'articleDetail',
        component: articleDetail
    },{
        path: '/tags',
        component: tags
    },{
        path: '/articleList/:type/:name/:active',
        name: 'articleList',
        component: articleList
    }];
});