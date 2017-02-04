/**
 * Vue 分页组件
 * 后端需要传递路由名称page.name，单页数量page.num和总数量page.total
 * 然后前端根据当前页码page.active定义路由，然后在父组件中监听$route更新，发起请求更新分页数据和当前页码
 */



define([],function () {
    return  {
        props: ['page'],
        template:`<nav class="pagination" v-if="pageNum > 1" >
                    <router-link :to="{ name: page.name, params: { active: page.active-1 }}" :class="['pagination-item']" v-if="page.active > 1"><i class="iconfont icon-back"></i></router-link>
		            <router-link  v-for="n in pageNum" :to="{ name: page.name, params: { active: n }}" :class="['pagination-item',{'pagination-current':page.active == n}]">{{n}}</router-link>
		            <router-link :to="{ name: page.name, params: { active: page.active-0+1 }}" :class="['pagination-item']" v-if="page.active < pageNum"><i class="iconfont icon-forward"></i></router-link>
				</nav>`,
        data: function () {
            return {
                pageNum: 1,
            }
        },
        watch:{
            page:function(){
                this.pageNum = Math.ceil(this.page.total/this.page.num);
            }
        },
    };

});