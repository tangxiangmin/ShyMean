/**
 * Created by admin on 2017/1/21.
 */
/**
 * 定义界面的布局组件，包括基本的头部，底部，侧边栏和工具按钮组
 */

define([], function () {

    // rem布局
    !(function () {
        let newRem = function() {
            let html = document.documentElement;
            html.style.fontSize = html.getBoundingClientRect().width / 10 + 'px';
        };
        window.addEventListener('resize', newRem, false);
        newRem();
    })();


    // 头部
    var header = {
        template:`<header class="bg-gray">
                    <div class="container page-hd">
                        <h1 class="page-title">
                            <span class="title-before animated slideInLeft"></span>
                            <router-link to="/">{{msg.title}}</router-link>
                            <span class="title-after animated slideInRight" ></span>
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
                        <nav :class="['page-nav',{active:isActive}]">
                            <router-link to="/" :class="['nav-item']"><i :class="['iconfont','icon-home']"></i> 首页</router-link>
                            <router-link to="/tags" :class="['nav-item']"><i :class="['iconfont','icon-tag']"></i> 标签</router-link>
                            <router-link :to="{name:'articleList',params:{type:'archives',name:'archives'}}" :class="['nav-item']"><i :class="['iconfont','icon-archives']"></i> 归档</router-link>
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
        template:`<footer class="bg-gray page-ft">
				<div class="container">
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
        props: ['msg'],
        template: `<aside class="page-sd">
			<div :class="['side-container',{'active':isClose}]">
				<div class="author-info">
					<img src="/assets/img//tmp/head.jpg" alt="" width="100" height="100">
					<h3 class="text-white">ShyMean</h3>
					<p>一个不学无数且无趣的人。</p>
				</div>
				<div class="side-nav">
					<a href=""><i class="iconfont icon-blog"></i> <br>博客</a>
					<a href=""><i class="iconfont icon-lab"></i> <br>实验室</a>
					<a href=""><i class="iconfont icon-bookshelf"></i> <br>书架</a>
				</div>
				<div class="author-contact">
					<a href="#"><i class="iconfont icon-github"></i> GitHub</a>
					<a href="#"><i class="iconfont icon-qq"></i> QQ</a>
				</div>
			</div>

			<div class="side-tool">
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
                isTopShow: false
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
            }
        },
        mounted: function () {
            var h = window.screen.height / 20;
            var _that = this;
            document.addEventListener('scroll', function () {
                var scrollTop = 0;
                if (document.body) {
                    scrollTop = document.body.scrollTop;
                } else {
                    console.log("scrollTop这里出BUG啦~");
                }

                if (scrollTop > h) {
                    _that.isTopShow = true;
                } else {
                    _that.isTopShow = false;
                }
            });
        }
    };

    var layout = {
        showAside:false,
        header:header,
        footer:footer,
        aside:aside
    };

    return layout;
});