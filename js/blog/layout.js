/**
 * Created by admin on 2017/1/21.
 */
/**
 * 定义界面的布局组件，包括基本的头部，底部，侧边栏和工具按钮组
 */

define([], function () {

    // 头部
    var header = {
        template:`<header class="bg-gray">
                    <div class="container page_hd">
                        <h1 class="page_title">
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
                            <router-link :to="{name:'articleList',params:{type:'archives',name:'archives',active:1}}" :class="['nav_item']"><i :class="['iconfont','icon-archives']"></i> 归档</router-link>
                        </nav>
                    </div>
                </header>`,
        data:function(){
            return {
                msg:{
                    title:'橙红年代',
                },
                isActive:false

            }
        },
        watch:{
            $route: function (to) {
                this.isActive = false;
            }
        },
        methods:{
                showNav: function () {
                    this.isActive = !this.isActive;
                }
        }
    };

    // 底部
    var footer = {
        template:`<footer class="bg-gray">
				<div class="container page_ft">
					<p>
						©Shymean 2016 - {{new Date().getFullYear()}}
					</p>
					<p v-if="msg.sign">{{msg.sign}}</p>
				</div>
			</footer>`,
        data:function(){
            return {
                msg:{
                    sign:'世人的悲欢并不相通，我只是觉得他们吵闹。'
                }
            }
        }
    };

    // 侧边栏

    var aside = {
        props: ['catalogue'],
        template: `<aside>
			<div :class="['page_sd','hide-md',{'active':isClose}]">
			    <tab :items="items">
			        <catalogue slot="catalogue" :data="catalogue"></catalogue>
			        <div  slot="website">
			            <div>
                            <img src="/assets/img/tmp/head.jpg" alt="" width="100" height="100">
                            <h3 class="text-white">ShyMean</h3>
                            <p>一个不学无数且无趣的人。</p>
                        </div>
                        <div class="nav-border">
                            <a href="" class="nav_item"><i class="iconfont icon-blog"></i> <br>博客</a>
                            <a href="" class="nav_item"><i class="iconfont icon-lab"></i> <br>实验室</a>
                            <a href="" class="nav_item"><i class="iconfont icon-bookshelf"></i> <br>书架</a>
                        </div>
                        <div class="contact">
                            <a href="https://github.com/tangxiangmin" class="contact_link" target="_blank"><i class="iconfont icon-github"></i> GitHub</a>
                            <a href="http://wpa.qq.com/msgrd?v=3&amp;uin=645234650&amp;site=qq&amp;menu=yes" class="contact_link" target="_blank"><i class="iconfont icon-qq"></i> QQ</a>
                        </div>
			        </div>
			    </tab>
			</div>

			<div class="page_tool">
				<div :class="['btn-list','hide-md',{'hover':isHover},{'close':isClose}]" @click="toggleAside"  @mouseover="toggleList" @mouseout="toggleList">
					<div class="btn-icon">
						<span class="btn-line"></span>
						<span class="btn-line"></span>
						<span class="btn-line"></span>
					</div>
				</div>
				<div :class="['btn-top',{'active':isTopShow}]" @click="backTop"><i class="iconfont icon-top"></i></div>
			</div>
		</aside>`,
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
            var h = window.screen.height / 20;
            var _that = this;
            document.addEventListener('scroll', function () {
                var scrollTop = 0;
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
                if (from.name == 'articleDetail'){
                    this.items.shift();
                }else if (to.name == 'articleDetail') {
                    this.items.unshift({
                        slot:"catalogue",
                        title:"文章目录"
                    })
                }
            }
        }
    };

    return {
        showAside:false,
        header:header,
        footer:footer,
        aside:aside
    };;
});