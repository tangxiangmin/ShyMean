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

    Vue.component('pagination', {
        props: ['page'],
        template:`<nav class="pagination">
					<a href="#" class="pagination-item"><i class="iconfont icon-back"></i></a>
		
					<a href="#" v-for="n in page.total" v-bind:class="['pagination-item',{'pagination-current':page.active == n}]" >{{n}}</a>
					<a href="#" class="pagination-item"><i class="iconfont icon-forward"></i></a>
				</nav>`,
        data:function(){
            return {

            }
        },
    });

    return Vue;
});