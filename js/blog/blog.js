/**
 * Created by admin on 2017/1/21.
 * 引入界面的布局组件，包括基本的头部，底部，侧边栏和工具按钮组
 */

require(['/js/config.js'], function () {
    require(['vue','vue-router','vue-resource','router-config','layout','pagination'], function () {

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
        Vue.component('blog-header',layout.header);
        Vue.component('blog-footer',layout.footer);
        Vue.component('blog-aside',layout.aside);

        // 组件
        let pagination = require('pagination');

        Vue.component('pagination',pagination);


        // 容器实例
        var blog = new Vue({
            el:"#blog",
            data:{
                blogHeader:layout.blogHeader,
                blogFooter:layout.blogFooter,
                showAside:layout.showAside,

            },
            router:router,
            methods:{
                toggleAside:function () {
                    this.showAside = !this.showAside;
                },
            },

        });

    });
});

