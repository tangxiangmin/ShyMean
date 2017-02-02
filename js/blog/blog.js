/**
 * Created by admin on 2017/1/12.
 */

/**
 * Created by admin on 2017/1/21.
 */
/**
 * 引入界面的布局组件，包括基本的头部，底部，侧边栏和工具按钮组
 */

require.config({
    baseUrl:'/js',
    paths:{
        'vue':'lib/vue',
        'vue-router':'lib/vue-router',
        'router-config':'blog/route',
        'layout':'blog/layout',
        'vue-resource':'lib/vue-resource.min',
    }
});

require(['vue','vue-router','vue-resource','router-config','layout'], function () {

    const Vue = require('vue');

    const VueRouter = require('vue-router');
    Vue.use(VueRouter);

    const VueResource  = require('vue-resource');
    Vue.use(VueResource);

    const routes = require('router-config');
    const layout = require('layout');

    const router = new VueRouter({
        routes:routes
    });


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