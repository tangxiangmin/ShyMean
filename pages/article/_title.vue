{{{{raw}}}}
<template>
    <div class="container">
        <article class="article article-detail">
            <header  class="text-center">
                <h2 class="article_hd">{{article.title}}</h2>
                <div class="article_info">
                    <span class="hide-sm">发表于</span>
                    <span class="show-sm"><i class="iconfont icon-archives"></i></span>
                    <time>{{article.created_at}} </time>|
                    <span class="hide-sm">分类于</span>
                    <span class="show-sm"><i class="iconfont icon-tag"></i></span>
                    
                    <template v-for="category in article.categories">
                        
                        <router-link
                                :to="`/tags/${category}`"
                                class="hover-highlight">{{category}}</router-link >
                    </template>
                    
                    <!--<span class="hide-sm">浏览</span>-->
                    <!--<span class="show-sm"><i class="iconfont icon-eye"></i></span>-->
                    <!--{{article.browse}}-->
                </div>
            </header>
            <div class="article_ct" v-html="article.content"></div>
            <footer class="article_ft">
                <template  v-for="tag in article.tags">
                    <router-link
                            :to="`/tags/${tag}`"
                            :key="tag"
                            class="article_tag">#{{tag}}</router-link>
                </template>
               
            </footer>
            <div class="article_nav">
                <router-link
                        v-if="prev"
                        class="hover-highlight article_prev"
                        :to="`/article/${prev.title}`">{{prev.title}}</router-link>
                <router-link
                        v-if="next"
                        class="hover-highlight article_next"
                        :to="`/article/${next.title}`">{{next.title}}</router-link>
        
            </div>
        </article>
    </div>
</template>
{{{{/raw}}}}

<script>
    import marked from 'marked'
    import highlight from 'highlight.js'
    
    import axios from "~plugins/axios"
    
    marked.setOptions({
        highlight: function (code) {
            return highlight.highlightAuto(code).value;
        }
    });
    
    function formateCatelogue(content) {
        
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

        return {
            catelogue: titleArr,
            content,
        };
    }
    
    export default{
        name:"articleDetail",
        data(){
            return {
                article: {},
                prev: {},
                next: {},
                catelogue: []
            }
        },
        mounted(){
            this.getArticle();
        },
       
        methods: {
            // todo 这里使用asyncData在重新刷新页面时会报 socket hang up的错误，暂时无法解决
            getArticle(){
                let { title } = this.$route.params;
                axios.get(`/api/article/${ title }`).then(res=>{
                    let { article, prev, next } = res.data;
                    article.content = marked(article.content);
                    let { content, catelogue} = formateCatelogue(article['content']);
                    article.content = content;
                    
                    this.article = article;
                    this.prev = prev;
                    this.next = next;
                    this.catelogue = catelogue;
                    this.$store.commit("setCatalogue", catelogue);
                })
            }
        },
        destroyed(){
            this.$store.commit("setCatalogue", []);
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
