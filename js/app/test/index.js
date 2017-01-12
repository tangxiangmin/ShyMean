/**
 * Created by admin on 2017/1/10.
 */
require.config({
    baseUrl:'/js/',
    paths:{
        jquery:'lib/jquery-2.0.3',
        vue:'lib/vue'
    }
});

require(['jquery','vue'], function () {
    var $ = require('jquery');
    var Vue = require('vue');


    //var vm = new Vue({
    //    el:"#app",
    //    data:{
    //        'hello':'Hello World',
    //        'items':['apple','banana','pear']
    //    },
    //})
});