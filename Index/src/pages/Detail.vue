<template>
    <div :class="['page','container']">
        <article class="article">
            <header  class="text-center">
                <h2 class="article_hd">{{article.title}}</h2>
                <div class="article_info">
                    <span class="hide-sm">发表于</span>
                    <span class="show-sm"><i class="iconfont icon-archives"></i></span>
                    {{article.created_at}} |
                    <span class="hide-sm">分类于</span>
                    <span class="show-sm"><i class="iconfont icon-tag"></i></span>
                    <router-link :to="{name:'articleList',params:{type:'category',name:article.category || 'tmp',active:1}}"  class="hover-highlight">{{article.category}}</router-link > |
                    <span class="hide-sm">浏览</span>
                    <span class="show-sm"><i class="iconfont icon-eye"></i></span>
                    {{article.browse}}
                </div>
            </header>
            <div class="article_ct" v-html="article.content"></div>
            <footer class="article_ft">
                <router-link :to="{name:'articleList',params:{type:'tag',name:tag || 'tmp',active:1}}" v-for="tag in getTags" :key="tag" class="article_tag">#{{tag}}</router-link>
            </footer>
            <div class="article_nav">
                <router-link v-if="prev" class="hover-highlight article_prev" :to="{ name: 'articleDetail', params: { title: prev.title || 'tmp'}}">{{prev.title}}</router-link>
                <router-link v-if="next" class="hover-highlight article_next" :to="{ name: 'articleDetail', params: { title: next.title || 'tmp'}}">{{next.title}}</router-link>

            </div>
        </article>
    </div>
</template>
<script>
    import xm from '../base/function'
    import marked from 'marked'
    import highlight from 'highlight.js'
    
    marked.setOptions({
        highlight: function (code) {
            return highlight.highlightAuto(code).value;
        }
    });

    export default{
        name:"articleDetail",
        data:function(){
            return {
                article:{},
                prev:{id:'tmp'},
                next:{id:'tmp'}
            }
        },
        mounted:function(){
            this.getData();
            let asideTabItems = [{
                slot:"catalogue",
                title:"文章目录"
            },{
                slot:'website',
                title:'站点资料'
            }];
            this.$store.commit("setAsideTabItems", asideTabItems);
        },
        methods:{
            getData(){
                let titleParam = this.$route.params.title;

                this.$http.post('blog/detail',{title: titleParam}).then((res)=>{
                    return res.json();

                }).then((data)=>{
                    let article = data['article'];
                    let prev = data['prev'];
                    let next = data['next'];

                    let content  = marked(article['content']);
                    // 最多只考虑了3级目录，应该够用了。

                    let re = /<(h[2|3|4])[^]*?>([^]*?)<\/\1>/g;
                    let title = null;
                    let count = {
                        h2:0,
                        h3:0,
                        h4:0
                    };

                    let titleArr = [];
                    try {
                        while(title = re.exec(content)){
                        let type = title[1];

                        let orderNum = '';
                        switch (type){
                            case "h2":
                                count.h2++;
                                count.h3 = 0;
                                count.h4 = 0;
                                orderNum = count.h2 + '. ';
                                let h2 = {
                                    h2:orderNum+title[2],
                                    h3:[]
                                };
                                titleArr.push(h2);
                                break;
                            case "h3":
                                count.h3++;
                                count.h4 = 0;
                                orderNum = count.h2 + '.' + count.h3 + '. ';
                                let h3 = {
                                    h3:orderNum+title[2],
                                    h4:[]
                                };
                                titleArr[titleArr.length - 1].h3.push(h3);
                                break;
                            case "h4":
                                count.h4++;
                                orderNum = count.h2 + '.' + count.h3 + '.' + count.h4 + '. ';
                                let last = titleArr[titleArr.length - 1].h3;
                                last[last.length - 1].h4.push(orderNum+title[2]);
                                break;
                            default:
                                console.log("oops~");
                                break;
                        }

                        let id = title[2];
                        let str = `<${type} id='${id}'>${orderNum + title[2]}</${type}>`;
                        content = content.replace(title[0],str);
                    }
                    }catch(e){
                        console.log("BUGS~");
                    }
                    
                    // 数据由aside组件渲染
                    this.$store.commit("setCatalogue", titleArr);
                    
                    article['content'] = content;
                    article['created_at'] = xm.dateFormat(article['created_at']);
                    this.$set(this,'article',article);
                    this.$set(this,'prev',prev);
                    this.$set(this,'next',next);
                });
            }
        },

        watch:{
            $route(to,from){
                this.$store.commit("setCatalogue", []);
                this.getData();
            }
        },
        computed:{
            getTags: function () {
                let tags = this.article['tags'];
                if (!tags) {
                    return '';
                }

                return tags.split(",").map((val)=>{
                    return val.trim()
                });
            }
        },
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    @import "../style/import";
    
    @media screen and (min-width: nth(nth($breakPoint, 2), 1)) {
        .article {
            @include page-shadow;
        }
    }
    .article {
        margin-bottom: 3rem;
        font-size: 16px;
        color: #333;
        .show-sm {
            display: inline-block;
        }
        
        &_hd {
            font-weight: normal;
        }
        
        &_tt {
            @extend %hover-underline;
        }
        
        &_info {
            font-size: $text-sm;
            color: $text-gray;
            word-spacing: 3px;
        }
        
        &_ft {
            margin: 1rem 0;
        }
        
        &_nav {
            @include clearfix;
        }
        &_prev {
            float: left;
        }
        
        &_next {
            float: right;
        }
        
        // 文章的主要样式，一部分在markdown.scss中定义，另一部分常规标签需要在这里限制
        &_ct {
            margin: 10px 0;
            line-height: 2em;
            
            a {
                color: $cyan;
                text-decoration: underline;
                &:hover {
                    color: darken($cyan, 20%);
                }
            }
            
            img {
                max-width: 100%;
            }
            
            table {
                width: 100%;
                border-collapse: collapse;
            }
            
            th, td {
                @include border;
            }
        }
        &_tag {
             display: inline-block;
             background-color: $gray;
             font-size: 14px;
             padding: 5px;
             margin-right: 5px;
            &:hover {
                 background-color: darken(#f6f8fa,20%);
                 color: lighten($gray,20%);
            }
        }
        &_prev,&_next {
            max-width: 45%;
            @include text-overflow;
        }
        
    }


</style>
