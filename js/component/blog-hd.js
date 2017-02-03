/**
 * Created by admin on 2017/1/20.
 */
require.config({
    baseUrl:'/js/',
    paths:{
        'vue':'lib/vue'
    }
});

define(['vue'],function () {
    var Vue = require('vue');

    Vue.component('blog-hd', {
        props: ['msg'],
        template:`<header class="bg-gray">
                    <div class="container page-hd">
                        <h1 class="page-title"><router-link to="/">{{msg.title}}</router-link></h1>
                        <nav class="page-nav">
                            <router-link to="/" :class="['nav-item']"><i v-bind:class="['iconfont','icon-home']"></i> 首页</router-link>
                            <router-link to="/tags" :class="['nav-item']"><i v-bind:class="['iconfont','icon-tag']"></i> 标签</router-link>
                        </nav>
                    </div>
                </header>`,
        data:function(){
            return {

            }
        }
    });

    return Vue;
});