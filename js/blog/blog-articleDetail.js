
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
        props:[],
        template:`<div :class="['page','container']">

            <article class="article">
                <header  class="text-center">
                    <h2 class="article_hd">{{article.title}}</h2>
                    <div class="article_info">
                        发表于{{article.created_at}} |
                        分类于 <router-link :to="{name:'articleList',params:{type:'category',name:article.category || 'tmp',active:1}}"  class="hover-highlight">{{article.category}}</router-link > |
                        评论 {{article.comment_id}}
                    </div>
                </header>
				<div class="article_ct" v-html="article.content"></div>
				<footer class="article_ft">
				     <router-link :to="{name:'articleList',params:{type:'tag',name:tag || 'tmp',active:1}}" v-for="tag in getTags" class="article_tag">#{{tag}}</router-link>
				</footer>
				<div class="article_nav">
                    <router-link v-if="prev" class="hover-highlight article_prev" :to="{ name: 'articleDetail', params: { id: prev.id }}">{{prev.title}}</router-link>
                    <router-link v-if="next" class="hover-highlight article_next" :to="{ name: 'articleDetail', params: { id: next.id }}">{{next.title}}</router-link>

				</div>
			</article>
			</div>
			`,
        data:function(){
            return {
                article:{},
                prev:{id:'tmp'},
                next:{id:'tmp'}
            }
        },
        mounted:function(){
            this.getData();
        },
        methods:{
            getData(){
                this.$http.post('/Home/Blog/articleDetail',{id: this.$route.params.id}).then((res)=>{
                    return res.json();
                }).then((data)=>{

                    var article = data['article'];
                    var prev = data['prev'];
                    var next = data['next'];

                    var content  = marked(article['content']);
                    // 最多只考虑了3级目录，应该够用了。

                    var re = /<(h[2|3|4])[^]*?>([^]*?)<\/\1>/g;
                    var title = null;
                    var count = {
                        h2:0,
                        h3:0,
                        h4:0
                    };

                    var titleArr = [];

                    while(title = re.exec(content)){
                        var type = title[1];

                        var orderNum = '';
                        switch (type){
                            case "h2":
                                count.h2++;
                                count.h3 = 0;
                                count.h4 = 0;
                                orderNum = count.h2 + '. ';
                                var h2 = {
                                    h2:orderNum+title[2],
                                    h3:[]
                                };
                                titleArr.push(h2);
                                break;
                            case "h3":
                                count.h3++;
                                count.h4 = 0;
                                orderNum = count.h2 + '.' + count.h3 + '. ';
                                var h3 = {
                                    h3:orderNum+title[2],
                                    h4:[]
                                };
                                titleArr[titleArr.length - 1].h3.push(h3);
                                break;
                            case "h4":
                                count.h4++;
                                orderNum = count.h2 + '.' + count.h3 + '.' + count.h4 + '. ';
                                var last = titleArr[titleArr.length - 1].h3;
                                last[last.length - 1].h4.push(orderNum+title[2]);
                                break;
                            default:
                                console.log("oops~");
                                break;
                        }

                        var id = title[2];
                        var str = `<${type} id='${id}'>${orderNum + title[2]}</${type}>`;
                        content = content.replace(title[0],str);
                    }
                    // 数据由aside组件渲染
                    this.$emit('article',titleArr);

                    article['content'] = content;

                    this.$set(this,'article',article);
                    this.$set(this,'prev',prev);
                    this.$set(this,'next',next);
                });
            }
        },
        watch:{
            $route(){
                this.getData();
            }
        },
        computed:{
            getTags: function () {
                var tags = this.article['tags'];
                if (!tags) {
                    return '';
                }

                return tags.split(",").map((val)=>{
                    return val.trim()
                });;
            }
        },

    };
});
