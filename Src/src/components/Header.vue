<template>
    <header class="bg-gray">
        <div class="container header">
            <h1 class="logo">
                <router-link to="/index/1">{{msg.title}}</router-link>
            </h1>
            <div class="show-md">
                <div :class="['btn-list',{close:isActive}]" @click="showNav">
                    <div class="btn-icon">
                        <span class="btn-line"></span>
                        <span class="btn-line"></span>
                        <span class="btn-line"></span>
                    </div>
                </div>
            </div>
            <nav :class="['nav-responsive',{active:isActive}]">
                <router-link to="/index/1" :class="['nav_item']"><i :class="['iconfont','icon-home']"></i> 首页
                </router-link>
                <router-link to="/tags" :class="['nav_item']"><i :class="['iconfont','icon-tag']"></i> 标签</router-link>
                <router-link :to="{name:'articleList',params:{type:'archives',name:'archives',active:1}}"
                             :class="['nav_item']"><i :class="['iconfont','icon-archives']"></i> 归档
                </router-link>
            </nav>
        </div>
    </header>
</template>

<script>
    export default {
        name: "blog-header",
        data: function () {
            return {
                msg: {
                    title: '橙红年代',
                },
                isActive: false
            }
            
        },
        watch: {
            $route: function (to) {
                this.isActive = false;
            }
        },
        methods: {
            showNav: function () {
                this.isActive = !this.isActive;
            }
        }
    }
</script>
<style scoped>
    
</style>
