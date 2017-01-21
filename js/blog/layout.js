/**
 * Created by admin on 2017/1/21.
 */
/**
 * 引入界面的布局组件，包括基本的头部，底部，侧边栏和工具按钮组
 */

require.config({
    baseUrl:'/js',
    paths:{
        'header':'component/blog-hd',
        'footer':'component/blog-ft',
        'aside':'component/blog-sd',
        'idx':'component/blog-index',
    }
});

require(['base','header','idx','footer','aside'], function () {

    // rem布局
    !(function () {
        let newRem = function() {
            let html = document.documentElement;
            html.style.fontSize = html.getBoundingClientRect().width / 10 + 'px';
        };
        window.addEventListener('resize', newRem, false);
        newRem();
    })();

    // 搭建Vue

    var Vue = require('vue');
    console.log(1);

    var blog = new Vue({
        el:"#blog",
        data:{
            blogHeader:{
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

                ],
            },
            page:{
                total:10,
                active:2
            },
            articles:[1,2,3],
            blogFooter:{
                sign:'世人的悲欢并不相通，我只是觉得他们吵闹。'
            },
            showAside:false,
        },
        methods:{
            toggleAside:function () {
                this.showAside = !this.showAside;
            },
        }
    });
    console.log(2);
});