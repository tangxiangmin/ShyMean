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
    }
});

require(['layout','pagination','marked'], function () {

    var layout = require('layout');
    var marked = require('marked');
    
    // 搭建Vue
    var Vue = require('vue');

    // 首页文章列表
    Vue.component('article-item',{
        props:['article'],
        template:`<article class="article-item">
				<div class="item-hd">
					<h2 class="item-title"><a href="#">{{article.title}}</a></h2>
					<div class="item-info">
						发表于{{article.created_at}} |
						分类于 <a href="#">{{article.category}}</a> |
						<a href="#">{{article.comment_id}}</a>
					</div>
				</div>
				<div class="item-bd" v-html="article.content"></div>
				<div class="item-ft">
					<a href="#">阅读全文</a>
				</div>
			</article>`,
    });
    // 首页主内容
    Vue.component('blog-index',{
        props:['articles','page'],
        template:`<div class="container">
				<article-item v-for="article in articles" :article="article"></article-item>
				<pagination :page="page"></pagination>
			</div>
			`
    });

    var blog = new Vue({
        el:"#blog",
        data:{
            blogHeader:layout.blogHeader,
            blogFooter:layout.blogFooter,
            showAside:layout.showAside,
            page:{
                total:10,
                active:2
            },
            articles:[],
        },
        methods:{
            toggleAside:function () {
                this.showAside = !this.showAside;
            },
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
    });
});