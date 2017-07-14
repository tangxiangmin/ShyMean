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
                <router-link to="/index/1" :class="['nav_item']"><i :class="['iconfont','icon-home']"></i> 首页</router-link>
                <router-link to="/tags" :class="['nav_item']"><i :class="['iconfont','icon-tag']"></i> 标签</router-link>
                <router-link :to="{name:'articleList',params:{type:'archives',name:'archives',active:1}}" :class="['nav_item']"><i :class="['iconfont','icon-archives']"></i> 归档
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

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../style/_import";

    .header {
        background-color: $gray;
    
        padding-top: 15px;
        padding-bottom: 15px;
        font-size: 80%;
        
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
    }

    .logo {
        margin: 0;
        position: relative;
        &:before,&:after {
            content: "";
            position: absolute;
            height: 3px;
            left: 15%;
            width: 70%;
            background: $dark;
        }
        &:before {
            top: -5px;
        }
        &:after {
            bottom: -5px;
        }
    }
    .nav-responsive {
        font-size: 16px;
    }

    // 小屏幕
    @media screen and (max-width: nth(nth($breakPoint,2),1)){
        .nav-responsive {
            @include fx-basis(100%);
            @include fx-shrink(0);
        
            height: 0;
            overflow: hidden;
            &.active {
                margin-top: 20px;
                height: auto;
            }
            .nav_item {
                display: block;
                text-align: center;
                line-height: 40px;
            }
        }
    }

    // 大屏幕
    @media screen and (min-width: nth(nth($breakPoint,2),1)){
        .nav-responsive {
            float: right;
            @include fx;
        
            .nav_item {
                display: block;
                padding: 5px 10px;
                @include border-radius;
                @include transition(background ease .2s);
            
                &:hover {
                    background: darken($gray,5%);
                }
            }
        }
    }
</style>
