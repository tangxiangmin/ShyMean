<template>
    <aside>
        <div :class="['aside','hide-md',{'active':isClose}]">
            <tab :items="tabItems">
                <catalogue slot="catalogue" ></catalogue>
                <div slot="website">
                    <div class="me">
                        <img src="../assets/img/head.jpg" alt="" width="100" height="100">
                        <h3>ShyMean</h3>
                        <p>一个不学无术且无趣的人。</p>
                    </div>
                    <div class="nav-border">
                        <a href="lab" class="nav_item"><i class="iconfont icon-lab"></i> <br>实验室</a>
                        <a href="" class="nav_item"><i class="iconfont icon-bookshelf"></i> <br>书架</a>
                        <a href="about" class="nav_item"><i class="iconfont icon-info"></i> <br>关于</a>
                    </div>
                    <div class="contact">
                        <a href="https://github.com/tangxiangmin" class="contact_link" target="_blank"><i class="iconfont icon-github"></i> GitHub</a>
                        <a href="http://wpa.qq.com/msgrd?v=3&amp;uin=645234650&amp;site=qq&amp;menu=yes" class="contact_link" target="_blank"><i class="iconfont icon-qq"></i> QQ</a>
                    </div>
                </div>
            </tab>
        </div>

        <div class="tool">
            <div :class="['btn-list','hide-md',{'hover':isHover},{'close':isClose}]" @click="toggleAside"  @mouseover="toggleList" @mouseout="toggleList">
                <div class="btn-icon">
                    <span class="btn-line"></span>
                    <span class="btn-line"></span>
                    <span class="btn-line"></span>
                </div>
            </div>
            <div :class="['btn-top',{'active':isTopShow}]" @click="backTop"><i class="iconfont icon-top"></i></div>
        </div>
    </aside>
</template>
<script>
    import tab from '@/components/Tab';
    import catalogue from '@/components/Catalogue';
    
    export default {
        name:"blog-aside",
        data: function () {
            return {
                isHover: false,
                isClose: false,
                isTopShow: false,
            }
        },
        components:{tab, catalogue},
        computed:{
            tabItems(){
                return this.$store.state.asideTabItems;
            }
        },
        methods: {
            toggleList: function () {
                this.isHover = !this.isHover;
            },

            toggleAside: function () {
                this.isClose = !this.isClose;
                this.$emit('aside');
            },

            backTop: function () {
                document.body.scrollTop = 0;
            },
        },
        mounted: function () {
            // 返回顶部
            let h = window.screen.height / 20;
            let _that = this;
            document.addEventListener('scroll', function () {
                let scrollTop = 0;
                if (document.body) {
                    scrollTop = document.body.scrollTop;
                } else {
                    console.log("scrollTop这里出BUG啦~");
                }
                _that.isTopShow = scrollTop > h;

            });
        },
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../style/import";
    .aside {
        position: fixed;
        z-index: 999;
        top: 0;
        right:0;
    
        width: 320px;
        height:100%;
        padding: 0 $basepadding*2;
    
        color: $text-gray;
        text-align: center;
        background-color: $dark;
    
        @include transition;
        @include transform(translateX(320px));
        &.active {
            @include transform(translateX(0px));
        }
    
        a {
            &:hover {
                color: #fff;
            }
        }
    
        .media {
            margin: $basemargin 0;
        }
    }
    // 侧边栏的响应式
    @media screen and (max-width: nth(nth($breakPoint,2),1)){
        .aside {
            display: none;
        }
        .main.active {
            padding-right: 0;
        }
    }
    .me {
        color: $white;
    }
    
    .tool {
        %page-btn {
            position: fixed;
            z-index: 9999;
        
            // 在手机上跟顶部导航列表按钮对齐
            right: 15px;
        }
        
        .btn-list {
            bottom: 65px;
        }
    }
    .btn-list {
        position: fixed;
        z-index: 9999;
        right: 15px;
        bottom: 65px;
    }
    
    .btn-top {
        bottom: 20px;
        color: #fff;
    
        @extend %page-btn;
        @include transition;
        @include transform(translateY(80px));
        i {
            font-size: 20px;
            @include transition(all .2s ease);
        }
        &:hover {
            i {
                @include transform(translateY(-2px));
            }
        }
        &.active {
            @include transform(translateY(0px));
        }
    }

    .nav-border {
        font-size: 0;
        margin: 1.5rem 0;
        .nav_item {
            display: inline-block;
            width: 60px;
            font-size: 14px;
            &:not(:first-of-type){
                @include border-l;
            }
        }
    }
    .contact {
        &_link {
            margin-right: 10px;
            padding: 5px 0;
        
            @include border-b;
        
            &:before {
                content: '';
                display: inline-block;
                vertical-align: middle;
                margin-right: 5px;
                width: 4px;
                height: 4px;
                background: $yellow;
                border-radius: 2px;
            }
        }
    }
</style>
