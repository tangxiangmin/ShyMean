<template>
    <nav class="pagination" v-if="pageNum > 1">
        <div :class="['pagination_item']" v-if="currentPage > 1">
            <router-link class="pagination_link" :to="generateUrl(currentPage - 1)"><i
                class="iconfont icon-back"></i></router-link>
        </div>
        <div v-for="n in pageNum" :class="['pagination_item',{'pagination_current':currentPage == n}]" v-if="omit(n).msg">
            <span class="pagination_space" v-if="omit(n).flag">...</span>
            <router-link v-else class="pagination_link" :to="generateUrl(n)">{{n}}</router-link>
        </div>
        <div :class="['pagination_item']" v-if="currentPage < pageNum">
            <router-link :to="generateUrl(currentPage-0+1)" class="pagination_link"><i
                class="iconfont icon-forward"></i></router-link>
        </div>
    </nav>
</template>
<script>
    export default {
        name: 'pagination',
        props: ['name', 'page', 'currentPage'],
        data() {
            return {
                pageNum: this.page,
            }
        },
    
        methods: {
            generateUrl(page){
                let name = this.name;
                let url;
                
                if (name === "/"){
                    url = `${page}`
                }else {
                    url = `/${name}/${page}`
                }
                
                return url;
            },
            omit(n){
                let flag = {
                    msg: false,
                    flag: false
                };
                let active = this.currentPage - 0;
                let num = this.pageNum;
                
                const limit = 3;
                
                if (n < limit || n > num - 1 || (n >= active - limit && n <= active + limit)) {
                    // 显示首页，最后一页或当前页相关
                    flag.msg = true;
                    
                    // 显示省略号
                    if (n === active - limit || n === active + limit) {
                        flag.flag = true;
                    }
                }
                
                return flag;
            }
        },
    }
</script>
<style>

</style>
