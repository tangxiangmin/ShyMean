// 后台管理

require.config({
    baseUrl:'/js/',
    paths:{
        'vue':'lib/vue',
        'vue-router':'lib/vue-router',
        'vue-resource':'lib/vue-resource.min',
        'router-config':'admin/route',
        'layout':'admin/layout',
    }
});

require(['vue','vue-router','vue-resource','router-config','layout'], function () {

    let Vue = require('vue');

    // vue-routes
    let VueRouter = require('vue-router');
    Vue.use(VueRouter);
    let routes = require('router-config');
    let router = new VueRouter({
        routes:routes,
    });

    // vue-resource
    let VueResource  = require('vue-resource');
    Vue.use(VueResource);
    Vue.http.options.emulateJSON = true;
    Vue.http.options.emulateHTTP = true;

    // layout
    let layout = require('layout');
    Vue.component('admin-header',layout.header);
    Vue.component('admin-aside',layout.aside);


    var admin = new Vue({
        el:"#admin",
        data:{
            msg:'hello'
        },
        mounted(){
            console.log(123);
            this.msg= 1312;
        }
    });

});