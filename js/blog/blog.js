/**
 * Created by admin on 2017/1/21.
 * 引入界面的布局组件，包括基本的头部，底部，侧边栏和工具按钮组
 */

require(['/js/config.js'], function () {
    require(['vue','vue-router','vue-resource','router-config','layout','pagination','tab','catalogue'], function () {

        let Vue = require('vue');

        // vue-routes
        let VueRouter = require('vue-router');
        Vue.use(VueRouter);
        let routes = require('router-config');
        let router = new VueRouter({
            routes:routes,
            //scrollBehavior (to, from, savedPosition) {
            //    return { x: 0, y: 0 }
            //}
        });

        // vue-resource
        let VueResource  = require('vue-resource');
        Vue.use(VueResource);
        Vue.http.options.emulateJSON = true;
        Vue.http.options.emulateHTTP = true;


        // 组件
        let pagination = require('pagination');
        let tab = require('tab');
        let catalogue = require('catalogue');

        Vue.component('pagination',pagination);
        Vue.component('tab',tab);
        Vue.component('catalogue',catalogue);


        // layout
        let layout = require('layout');
        Vue.component('blog-header',layout.header);
        Vue.component('blog-footer',layout.footer);
        Vue.component('blog-aside',layout.aside);


        // 容器实例
        var blog = new Vue({
            el:"#blog",
            data:{
                blogHeader:layout.blogHeader,
                blogFooter:layout.blogFooter,
                showAside:layout.showAside,
                catalogue: [] ,
            },
            router:router,
            methods:{
                toggleAside:function () {
                    this.showAside = !this.showAside;
                },
                article: function (catalogue) {
                    this.$set(this,'catalogue',catalogue);
                }
            },
            watch:{
                $route: function (to,from) {
                    document.body.scrollTop = 0;

                    if (to.name != 'articleDetail'){
                        this.catalogue = [];
                    }
                }
            }
        });

    });
});

