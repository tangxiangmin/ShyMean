/**
 * Created by admin on 2017/1/12.
 */

require.config({
    baseUrl:'/js',
    paths:{
        'base':'base/base',
        'header':'component/blog-header'
    }
});

require(['base','header'], function () {
    require('base');

    var Vue = require('vue');
    require('header');

    var blogIndex = new Vue({
        el:"#blogIndex",
        component:['blog-header'],
        data:{
            title:'橙红年代',
            navItem:[
                {
                    name:'首页',
                    icon:'icon-home'
                },
                {
                    name:'书签',
                    icon:'icon-tag'
                }

            ]
        }

    });

});