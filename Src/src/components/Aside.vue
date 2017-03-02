<template>
    <aside>
        <div :class="['aside','hide-md',{'active':isClose}]">
            <tab :items="items">
                <catalogue slot="catalogue" :data="catalogue"></catalogue>
                <div  slot="website">
                    <div>
                        <img src="../assets/img/head.jpg" alt="" width="100" height="100">
                        <h3 class="text-white">ShyMean</h3>
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
        props: ['catalogue'],
        data: function () {
            return {
                isHover: false,
                isClose: false,
                isTopShow: false,
                
                items:[{
                    slot:'website',
                    title:'站点资料'
                }],
            }
        },
        components:{tab, catalogue},
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
            // 判断当前路由
            if (this.$route.name == 'articleDetail') {
                this.items.unshift({
                    slot:"catalogue",
                    title:"文章目录"
                })
            }

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
        watch:{
            $route(to,from){
                // 判断是否显示目录

                // 从其他页面进入文章详情
                // 从当前文章进入下一篇文章

                if (this.items.length == 1 && to.name == 'articleDetail') {
                    this.items.unshift({
                        slot:"catalogue",
                        title:"文章目录"
                    })
                }else if (from.name == 'articleDetail' && to.name == 'articleDetail') {
                    this.items[0] = {
                        slot:"catalogue",
                        title:"文章目录"
                    };
                }else if (from.name == 'articleDetail') {
                    this.items.shift();
                }
            }
        }
    }
</script>
<style>

</style>
