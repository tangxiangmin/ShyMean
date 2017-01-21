/**
 * Created by admin on 2017/1/12.
 */

require.config({
    baseUrl:'/js',
    paths:{
        'base':'base/base',
        'layout':'blog/layout',
        'pagination':'component/pagination'
    }
});

require(['base','layout','pagination'], function () {

    var Vue = require('vue');

    // 首页文章列表
    Vue.component('article-item',{
        props:['article'],
        template:`<article class="article-item">
				<div class="item-hd">
					<h2 class="item-title"><a href="#">{{article.title}}</a></h2>
					<div class="item-info">
						发表于{{article.time}} |
						分类于 <a href="#">{{article.category}}</a> |
						<a href="#">{{article.commentNum}}</a>
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

    // 请求信息
    Vue.http.post('/Home/Blog/ajaxIndex').then(function (res) {
        console.log(res.body);
    });

    // 注册
    var blogIndex = new Vue({
        el:"#blog-index",
        component:['pagination','article-item'],
        data:{
            page:{
                total:10,
                active:2
            },
            articles:[
                {
                    title:'测试',
                    time:'2017-11-22',
                    category:'JS',
                    commentNum:0,
                    content:0
                },
            ],

        },


    });

});