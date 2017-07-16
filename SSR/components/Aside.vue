<template>
    <aside>
        <div :class="['page_sd','hide-md',{'active':isClose}]">
            <div slot="website">
                <div class="me">
                    <img src="~assets/img/head.jpg" alt="" width="100" height="100">
                    <h3>ShyMean</h3>
                    <p>一个不学无术且无趣的人。</p>
                </div>
                <div class="nav-border">
                    <!--<router-link to="/lab" class="nav_item">-->
                    <!--<i class="iconfont icon-lab"></i> <br>实验室-->
                    <!--</router-link>-->
                    <router-link to="/book" class="nav_item">
                        <i class="iconfont icon-bookshelf"></i> <br>书架
                    </router-link>
                    <router-link to="/msgBoard" class="nav_item">
                        <i class="iconfont icon-comment"></i> <br>留言
                    </router-link>
                    <router-link to="/about" class="nav_item">
                        <i class="iconfont icon-info"></i> <br>关于
                    </router-link>
                </div>
                <div class="contact">
                    <a href="https://github.com/tangxiangmin" class="contact_link" target="_blank"><i
                            class="iconfont icon-github"></i> GitHub</a>
                    <a href="http://wpa.qq.com/msgrd?v=3&amp;uin=645234650&amp;site=qq&amp;menu=yes"
                       class="contact_link" target="_blank"><i class="iconfont icon-qq"></i> QQ</a>
                </div>
            </div>
        </div>
        
        <div class="tool">
            <div :class="['btn-list','hide-md',{'hover':isHover},{'close':isClose}]" @click="toggleAside"
                 @mouseover="toggleList" @mouseout="toggleList">
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

    export default {
        name: "blog-aside",
        data: function () {
            return {
                isHover: false,
                isClose: false,
                isTopShow: false,
            }
        },
        computed: {
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
//            document.addEventListener('scroll', xm.debounce(()=>{
//                let scrollTop = 0;
//                if (document.body) {
//                    scrollTop = document.body.scrollTop;
//                } else {
//                    console.log("scrollTop这里出BUG啦~");
//                }
//
//                this.isTopShow = scrollTop > h;
//            }, 10));
        },
    }
</script>
<style>

</style>
