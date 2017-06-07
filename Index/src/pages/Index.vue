<template>
    <div :class="['page','container']">
        <abstract :article="article" v-for="article in stickiedArticles" :key="article" :isStickied="true"></abstract>
        <abstract :article="article" v-for="article in articles" :key="article"></abstract>
        <pagination :page="page" :active="active" name="index"></pagination>
    </div>
</template>
<script>
    import marked from 'marked';
    import xm from '../base/function'
    import pagination from '@/components/Pagination';
    import abstract from './Abstract';
    
    
    import { getStickArticles, getArticles } from "@/api/article"
    export default {
        name: "blog-index",
        data: function () {
            return {
                page: {},
                articles: [],
                stickiedArticles:[],
                active: this.$route.params.active || 1
            }
        },
        components: {pagination, abstract},
        mounted: function () {
            this.getArticles();
            
            // 缓存置顶文章
            let stickiedArticles = this.$store.state.stickiedArticles;
            if (stickiedArticles.length) {
                this.stickiedArticles = stickiedArticles;
            }else {
                this.getStickiedArticles();
            }
        },
        methods: {
            handleArticle(articles){
                articles = articles.map((val) => {
                    val['abstract'] = marked(val['abstract']);
                    val['created_at'] = xm.dateFormat(val['created_at']);
                    return val;
                });
                return articles;
            },
            getStickiedArticles(){
                getStickArticles().then(articles=>{
                    articles = this.handleArticle(articles);
                    this.$set(this, 'stickiedArticles', articles);
                    this.$store.commit("setStickiedArticles", articles);
                });
            },
            getArticles() {
               
                this.$http.post('blog/index', {active: this.active}).then((res) => {
                    return res.json();
                }).then((res) => {
                    let articles = res['articles'], page = res['page'];
                    articles = this.handleArticle(articles);
                    this.$set(this, 'articles', articles);
                    
                    page.active = this.active;
                    this.$set(this, 'page', page);
                });
            },
        },
        watch: {
            $route: function (to, from) {
                
                this.active = to.params.active;
                this.getArticles();
            }
        }
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
        
    }

</style>
