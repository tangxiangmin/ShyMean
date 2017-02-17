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
/*
*  2017-2-17
*  限制分页数量，多余页码使用一个省略号代替
*/

define([],function () {

    return  {
        props: ['name','page','active'],
        template:`<nav class="pagination" v-if="pageNum > 1" >
                    <div :class="['pagination_item']" v-if="active > 1">
                        <router-link class="pagination_link" :to="{ name: name, params:{ active: active - 1 }}" ><i class="iconfont icon-back"></i></router-link></div>
                    <div v-for="n in pageNum"  :class="['pagination_item',{'pagination_current':active == n}]" v-if="omit(n).msg">
                       <span class="pagination_space" v-if="omit(n).flag">...</span>
                        <router-link v-else  class="pagination_link" :to="{ name: name, params: { active: n }}" >{{n}}</router-link></div>                   
                    <div :class="['pagination_item']" v-if="active < pageNum">
                        <router-link :to="{ name: name, params: { active: active - 0+1 }}" class="pagination_link"><i class="iconfont icon-forward"></i></router-link>
</div>
				</nav>`,
        data: function () {
            return {
                pageNum: 1,
            }
        },
        methods:{
            omit(n){
                let flag = {
                    msg:false,
                    flag:false
                };
                let active = this.active - 0;
                let num = this.pageNum;
                let screen = window.screen.width;

                const limit = screen < 768 ? 2:3;

                if (n < limit || n > num - 1 || (n >= active - limit && n <= active + limit)) {
                    // 显示首页，最后一页或当前页相关
                    flag.msg = true;

                    // 显示省略号
                    if (n == active - limit || n == active + limit) {
                        flag.flag = true;
                    }
                }

                return flag;
            }
        },
        watch:{
            page(){
                this.pageNum = Math.ceil(this.page.total/this.page.num);

            },
        },

    };

});