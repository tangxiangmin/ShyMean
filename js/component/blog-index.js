/**
 * Created by admin on 2017/1/12.
 */

require.config({
    baseUrl:'/js/',
    paths:{
        'vue':'lib/vue',
        'pagination':'component/pagination',
    }
});

define(['vue','pagination'],function () {
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
				<div class="item-bd">
					{{article.content}}
				</div>
				<div class="item-ft">
					<a href="#">阅读全文</a>
				</div>
			</article>`,
    });

    Vue.component('blog-index',{
        props:['articles','page'],
        template:`<div class="container">
				<article-item v-for="article in articles" :article="article"></article-item>
				<pagination :page="page"></pagination>
			</div>
			`,
        data: function () {
            return {

            };
        }
    });

    return Vue;
});


define(['vue','pagination'], function () {




    // 注册
    //var blogIndex = new Vue({
    //    el:"#blog-index",
    //    component:['pagination','article-item'],
    //    data:{
    //        page:{
    //            total:10,
    //            active:2
    //        },
    //        articles:[1,2,3],
    //        test:"Hello World"
    //    },
    //    methods:{
    //        foo: function () {
    //            console.log(1);
    //        }
    //    },
    //
    //    mounted: function () {
    //        // 请求信息
    //        //Vue.http.get('/Home/Blog/ajaxIndex').then(()=>{
    //        //    console.log("ajax return ");
    //        //    Vue.set(blogIndex, 'test', 'XXasda');
    //        //    console.log(blogIndex.test);
    //        //});
    //
    //    }
    //});
});