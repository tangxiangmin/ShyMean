/**
 * Created by admin on 2017/1/20.
 */
require.config({
    baseUrl:'/js/',
    paths:{
        'vue':'lib/vue'
    }
});

define(['vue'],function () {
    var Vue = require('vue');

    Vue.component('blog-sd', {
        props: ['msg'],
        template:`<aside class="page-sd">
			<div :class="['side-container',{'active':isClose}]">
				<div class="author-info">
					<img src="../../assets/img//tmp/head.jpg" alt="" width="100" height="100">
					<h3 class="text-white">ShyMean</h3>
					<p>一个不学无数且无趣的人。</p>
				</div>
				<div class="side-nav">
					<a href="">43<br>归档</a>
					<a href="">43<br>标签</a>
					<a href="">43<br>分类</a>
					<a href="">43<br>书架</a>
				</div>
				<div class="author-contact">
					<a href="#"><i class="fa fa-github"></i> GitHub</a>
					<a href="#"><i class="fa fa-qq"></i> QQ</a>
				</div>
			</div>
			
			<div class="side-tool">
				<div :class="['btn-list',{'hover':isHover},{'close':isClose}]" @click="toggleAside"  @mouseover="toggleList" @mouseout="toggleList">
					<div class="btn-icon">
						<span class="btn-line"></span>
						<span class="btn-line"></span>
						<span class="btn-line"></span>
					</div>
				</div>
				<div class="btn-top" id="backTop"><i class="iconfont icon-top"></i></div>
			</div>
		</aside>`,
        data:function(){
            return {
                isHover:false,
                isClose:false
            }
        },
        methods:{
            toggleList:function () {
                this.isHover = !this.isHover;
            },

            toggleAside:function () {
                this.isClose = !this.isClose;
                this.$emit('aside');
            }
        }
    });

    return Vue;
});