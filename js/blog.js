/**
 * Created by admin on 2017/1/21.
 */

require.config({
    baseUrl:'/js',
    paths:{
        // 框架依赖
        'vue':'lib/vue',
        'vue-router':[/*'https://cdnjs.cloudflare.com/ajax/libs/vue-router/2.2.1/vue-router.min',*/'lib/vue-router'],
        'vue-resource':[/*'https://cdnjs.cloudflare.com/ajax/libs/vue-resource/1.2.0/vue-resource.min',*/'lib/vue-resource.min'],
        //插件
        'marked':[/*'https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.6/marked.min',*/'lib/marked'],
        'highlight':[/*'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/highlight.min',*/'lib/highlight.pack'],
        // 辅助函数
        'xm':'base/function',
        // 全局路由配置
        'router-config':'blog/route',
        // 布局
        'index':'blog/blog-index',
        'articleDetail':'blog/blog-articleDetail',
        'tags':'blog/blog-tags',
        'articleList':'blog/blog-articleList',
        'layout':'blog/layout',
        // 组件
        'pagination':'component/pagination',
        'tab':'component/tab',
        'catalogue':'component/catalogue',
        'popup':'component/popup',
    }
});

//require(['config'], function () {
    require(['vue','vue-router','vue-resource','router-config','layout','pagination','tab','catalogue','popup'], function () {

        var Vue = require('vue');

        // vue-routes
        var VueRouter = require('vue-router');
        Vue.use(VueRouter);
        var routes = require('router-config');
        var router = new VueRouter({
            routes:routes,
            //scrollBehavior (to, from, savedPosition) {
            //    return { x: 0, y: 0 }
            //}
        });

        // vue-resource
        var VueResource  = require('vue-resource');
        Vue.use(VueResource);
        Vue.http.options.emulateJSON = true;
        Vue.http.options.emulateHTTP = true;


        // 组件
        var pagination = require('pagination');
        var tab = require('tab');
        var catalogue = require('catalogue');
        var popup = require('popup');

        Vue.component('pagination',pagination);
        Vue.component('tab',tab);
        Vue.component('catalogue',catalogue);
        Vue.component('popup',popup);


        // layout
        var layout = require('layout');
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
                isLoading: false,
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

        // 加载动画
        Vue.http.interceptors.push((request, next) => {
            blog.isLoading = true;
            next((response) => {
                blog.isLoading = false;
                return response
            });
        });

    });
//});

