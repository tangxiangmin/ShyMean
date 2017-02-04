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
        template:`<nav class="pagination" v-if="pageNum > 1">
                    <span @click="prev" :class="['pagination-item']"><i class="iconfont icon-back"></i></span>
                    <span v-for="n in pageNum" :class="['pagination-item',{'pagination-current':page.active == n}]">{{n}}</span>
                    <span @click="next" :class="['pagination-item']"><i class="iconfont icon-forward"></i></span>
                    <!--<router-link :to="{ name: page.name, params: { active: page.active-1 }}" @click="prev" :class="['pagination-item']"><i class="iconfont icon-back"></i></router-link>-->
		            <!--<router-link v-for="n in pageNum" :to="{ name: page.name, params: { active: n }}" :class="['pagination-item',{'pagination-current':page.active == n}]">{{n}}</router-link>-->
		            <!--<router-link :to="{ name: page.name, params: { active: page.active+1 }}" @click="next" :class="['pagination-item']"><i class="iconfont icon-forward"></i></router-link>-->
				</nav>`,
        data: function () {
            return {
                pageNum: 1,
            }
        },
        methods:  {
            prev(){
                console.log("prev");
                this.page.active--;
            },
            next(){
                console.log("next")
                this.page.active++;
            }
        },
        watch:{
            page:function(){
                this.pageNum = Math.ceil(this.page.total/this.page.num);
            }
        }
    });

    return Vue;
});