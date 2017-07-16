{{{{raw}}}}
<template>
    <div class="container">
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
        async asyncData({ params, error }){
            try {
                let res = await axios.get(`/api/article/${ params.title }`);
                let { article, prev, next } = res.data;

                article.content = marked(article.content);

                let { content, catelogue} = formateCatelogue(article['content']);
                
                article.content = content;
                
                return {
                    article,
                    prev,
                    next,
                    catelogue
                }
            }catch (e){
            }
        },
        mounted:function(){
            this.$store.commit("setCatalogue", this.catelogue);
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
            },
        },
        destroyed(){
            this.$store.commit("setCatalogue", []);
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
