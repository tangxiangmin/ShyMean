<template>
    <nav class="pagination" v-if="pageNum > 1">
        <div :class="['pagination_item']" v-if="active > 1">
            <router-link class="pagination_link" :to="{ name: name, params:{ active: active - 1 }}"><i
                class="iconfont icon-back"></i></router-link>
        </div>
        <div v-for="n in pageNum" :class="['pagination_item',{'pagination_current':active == n}]" v-if="omit(n).msg">
            <span class="pagination_space" v-if="omit(n).flag">...</span>
            <router-link v-else class="pagination_link" :to="{ name: name, params: { active: n }}">{{n}}</router-link>
        </div>
        <div :class="['pagination_item']" v-if="active < pageNum">
            <router-link :to="{ name: name, params: { active: active - 0+1 }}" class="pagination_link"><i
                class="iconfont icon-forward"></i></router-link>
        </div>
    </nav>
</template>
<script>
    export default {
        name: 'pagination',
        props: ['name', 'page', 'active'],
        data: function () {
            return {
                pageNum: 1,
            }
        },
        methods: {
            omit(n){
                let flag = {
                    msg: false,
                    flag: false
                };
                let active = this.active - 0;
                let num = this.pageNum;
                let screen = window.screen.width;
                
                const limit = screen < 768 ? 2 : 3;
                
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
        watch: {
            page(){
                this.pageNum = Math.ceil(this.page.total / this.page.num);
                
            },
        },
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    @import "../style/import";
    
    .pagination {
        $size: 2rem;
        @include fx;
        @include fx-cross(center);
        
        margin: 3rem 0;
        font-size: 0;
        border-top: 1px solid #f8f8f8;
        
        %base {
            display: inline-block;
            position: relative;
            min-width: $size;
            height: $size;
            line-height: $size;
            
            font-size: 14px;
            text-align: center;
            color: $text-gray;
            @include transition;
            
            &:before {
                content: '';
                position: absolute;
                left: 0;
                top: -1px;
                width: 100%;
                height: 1px;
                border-top: 1px solid transparent;
                
            }
        }
        
        &_link, &_space {
            @extend %base;
        }
        
        &_link {
            &:hover {
                color: $dark;
                &:before {
                    border-color: $dark;
                }
            }
        }
        
        &_current {
            background: #f8f8f8;
        }
        
    }

</style>
