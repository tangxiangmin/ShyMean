/**
 * Vue 分页组件
 * 后端需要传递路由名称page.name，单页数量page.num和总数量page.total
 * 然后前端根据当前页码page.active定义路由，然后在父组件中监听$route更新，发起请求更新分页数据和当前页码
 */
/**
 * 2017-2-11
 * 之前的组件耦合有点严重，全部依赖于page，但是又与当前组件的属性相关，因此剥离部分属性通过props属性传递，page属性只负责生成分页数量即可，现在的组件调用形式是：
 * <pagination :page="page" :active="active" name="articleList"></pagination>
 * 其中，this.page是由后台传递的配置参数，包括total总数量和num每页数量,this.active是通过路由获取的当前页码，name就是当前路由页面的字符串名称
 */

define([],function () {

    return  {
        props: ['name','page','active'],
        template:`<nav class="pagination" v-if="pageNum > 1" >
                    <router-link :to="{ name: name, params:{ active: active - 1 }}" :class="['pagination-item']" v-if="active > 1"><i class="iconfont icon-back"></i></router-link>
		            <router-link  v-for="n in pageNum" :to="{ name: name, params: { active: n }}" :class="['pagination-item',{'pagination-current':active == n}]">{{n}}</router-link>
		            <router-link :to="{ name: name, params: { active: active - 0+1 }}" :class="['pagination-item']" v-if="active < pageNum"><i class="iconfont icon-forward"></i></router-link>
				</nav>`,
        data: function () {
            return {
                pageNum: 1,
            }
        },
        watch:{
            page:function(){
                this.pageNum = Math.ceil(this.page.total/this.page.num);
            },
        },
    };

});