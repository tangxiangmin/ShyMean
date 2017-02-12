
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
        template:`<div :class="['page-bd','container']">

            <article class="article">
				<div class="text-center">
					<h2 class="article_hd">{{article.title}}</h2>
					<div class="article_info">
						发表于{{article.created_at}} |
						分类于 <router-link :to="{name:'articleList',params:{type:'category',name:article.category || 'tmp',active:1}}"  class="hover-highlight">{{article.category}}</router-link > |
						评论 {{article.comment_id}}
					</div>
				</div>
				<div class="article_content" v-html="article.content"></div>
			</article>
			</div>
			`,
        mounted:function(){


            this.$http.post('/Home/Blog/articleDetail',{id: this.$route.params.id}).then((res)=>{
                return res.json();
            }).then((article)=>{
                var content  = marked(article['content']);

                // todo:增加目录

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

                    var id = type + '_' + count[type];
                    var str = `<${type} id='${id}'>${orderNum + title[2]}</${type}>`;
                    content = content.replace(title[0],str);
                }
                // 数据由aside组件渲染
                this.$emit('article',titleArr);

                article['content'] = content;
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
