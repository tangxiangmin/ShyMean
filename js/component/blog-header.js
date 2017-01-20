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

    Vue.component('blog-header', {
        props: ['title','items'],
        template:`<header class="bg-gray">
                    <div class="container page-hd">
                        <h1 class="page-title">{{title}}</h1>
                        <nav class="page-nav">
                            <a class="nav-item" v-for="item in items" href=""><i v-bind:class="['iconfont',item.icon]"></i> {{item.name}}</a>
                           
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