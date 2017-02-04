/**
 *  首页文章列表
 */

require.config({
    baseUrl:'/js',
    paths:{
        'pagination':'component/pagination',
        'marked':'lib/marked',
    }
});

define(['pagination','marked'], function () {

    var marked = require('marked');

    // 首页文章列表
    return {
        props:[],
        template:`<div :class="['page-bd','container']">
                <article class="article-item" v-for="article in articles">
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
                        <router-link :to="{ name: 'articleDetail', params: { id: article.id }}">阅读全文</router-link>
                    </div>
                </article>
				<pagination :page="page" ></pagination>
			</div>
			`,
        data:function(){
            return {
                page:{},
                articles:[],
                active: this.$route.params.active || 1
            }
        },
        mounted: function () {
            this.getData();
        },
        methods:{
            getData: function () {
                this.$http.post('/Home/Blog/index',{active: this.active}).then((res)=>{
                    return res.json();
                }).then((res)=>{
                    let articles = res['articles'], page=res['page'];
                    articles = articles.map((val)=>{
                        val['content'] = marked(val['content']);
                        return val;
                    });

                    this.$set(this,'articles',articles);

                    page.active = this.active;
                    this.$set(this,'page',page);
                });
            },
        },
        watch: {
            $route:function (to, from) {

                this.active = to.params.active;
                this.getData();
            }
        }
    };

});