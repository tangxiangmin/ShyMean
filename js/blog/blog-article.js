
/**
 * 文章详情页面
 */

define([], function () {
    return {
        template:`<article class="article-item">
				<div class="item-hd">
					<h2 class="item-title"><a href="#">{{article.title}}</a></h2>
					<div class="item-info">
						发表于{{article.created_at}} |
						分类于 <a href="#">{{article.category}}</a> |
						评论 {{article.comment_id}}
					</div>
				</div>
				<div class="item-bd" v-html="article.content">{{$route.params.id}}</div>
			</article>
			`,
        mounted:function(){
            console.log(1);
        },
        data:function(){
            return {
                article:{title:'xxx'}
            }
        },
    };
});
