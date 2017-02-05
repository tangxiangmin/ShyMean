
/**
 * 文章详情页面
 */
require.config({
    baseUrl:'/js',
    paths:{
        'marked':'lib/marked',
    }
});
define(['marked'], function () {

    var marked = require('marked');

    return {
        template:`<div :class="['page-bd','container']">

            <article class="article-item">
				<div class="item-hd text-center">
					<h2 class="item-title"><a href="#">{{article.title}}</a></h2>
					<div class="item-info">
						发表于{{article.created_at}} |
						分类于 <a href="#">{{article.category}}</a> |
						评论 {{article.comment_id}}
					</div>
				</div>
				<div class="item-bd" v-html="article.content"></div>
			</article>
			</div>
			`,
        mounted:function(){
            this.$http.post('/Home/Blog/articleDetail',{id: this.$route.params.id}).then((res)=>{
                return res.json();
            }).then((article)=>{
                article['content'] = marked(article['content']);
                this.$set(this,'article',article);
            });
        },
        data:function(){
            return {
                article:{},
            }
        },
    };
});
