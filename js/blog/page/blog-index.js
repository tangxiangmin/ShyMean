/**
 *  首页文章列表
 */

define(['marked'], function () {

    var marked = require('marked');

    // 首页文章列表
    return {
        props:[],
        template:`<div :class="['page','container']">
                <article class="article" v-for="article in articles">
                    <h2 class="article_hd">
                        <router-link class="article_tt" :to="{ name: 'articleDetail', params: { id: article.id }}">{{article.title}}</router-link>
                    </h2>
                    <div class="article_info">
                        发表于{{article.created_at}} |
                        分类于 <router-link :to="{name:'articleList',params:{type:'category',name:article.category || 'tmp',active:1}}" class="hover-highlight" >{{article.category}}</router-link > |
                        浏览 {{article.browse}} |
                        评论 {{article.comment_id}}
                    </div>
                    <div class="article_ct" v-html="article.content"></div>
                    <div class="article_ft">
                        <router-link class="hover-highlight" :to="{ name: 'articleDetail', params: { id: article.id }}">阅读全文</router-link>
                    </div>
                </article>
				<pagination :page="page" :active="active" name="index"></pagination>
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
                this.$http.post('blog_index',{active: this.active}).then((res)=>{

                    return res.json();

                }).then((res)=>{
                    let articles = res['articles'], page = res['page'];
                    articles = articles.map((val)=>{
                        val['content'] = marked(val['content']);
                        return val;
                    });

                    this.$set(this,'articles',articles);

                    //page.active = this.active;
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