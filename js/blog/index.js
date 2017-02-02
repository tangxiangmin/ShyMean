/**
 * Created by admin on 2017/1/12.
 */

/**
 * Created by admin on 2017/1/21.
 */
/**
 * 引入界面的布局组件，包括基本的头部，底部，侧边栏和工具按钮组
 */

require.config({
    baseUrl:'/js',
    paths:{
        'layout':'blog/layout',
        'pagination':'component/pagination',
        'marked':'lib/marked',
        'vue':'lib/vue',
        'vue-router':'lib/vue-router',
    }
});

require(['vue','vue-router','layout','pagination','marked'], function () {

    var layout = require('layout');
    var marked = require('marked');

    // 搭建Vue
    var Vue = require('vue');

    var VueRouter = require('vue-router');


    // 首页文章列表
    Vue.component('article-item',{
        props:['article'],
        template:`<article class="article-item">
				<div class="item-hd">
					<h2 class="item-title"><a href="#">{{article.title}}</a></h2>
					<div class="item-info">
						发表于{{article.created_at}} |
						分类于 <a href="#">{{article.category}}</a> |
						评论 {{article.comment_id}}
					</div>
				</div>
				<div class="item-bd" v-html="article.content"></div>
				<div class="item-ft">
                    <router-link to="/foo">阅读全文</router-link>
				</div>
			</article>`,
    });

    // 首页主内容

    var foo = {
        template:`<div>foo</div>
			`,
        mounted:function(){
            console.log(1);
        },
    };

    var blogIndex = {
        props:[],
        template:`<div class="container">
				<article-item v-for="article in articles" :article="article"></article-item>
				<pagination :page="page"></pagination>
			</div>
			`,
        data:function(){
            return {
                page:{
                    total:5,
                    active:2
                },
                articles:[],
            }
        },
        mounted: function () {
            this.$http.get('/Home/Blog/ajaxIndex').then((res)=>{
                return res.json();
            }).then((articles)=>{
                articles = articles.map((val)=>{
                    val['content'] = marked(val['content']);
                    return val;
                });
                this.$set(this,'articles',articles);
            });
        }
    };

    Vue.use(VueRouter);

    const routes = [{
        path: '/foo',
        component: foo
    },{
        path: '/',
        component: blogIndex
    }];

    const router = new VueRouter({
        routes:routes
    });

    var blog = new Vue({
        el:"#blog",
        data:{
            blogHeader:layout.blogHeader,
            blogFooter:layout.blogFooter,
            showAside:layout.showAside,

        },
        router:router,
        methods:{
            toggleAside:function () {
                this.showAside = !this.showAside;
            },
        },

    });



});