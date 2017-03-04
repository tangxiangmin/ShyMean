<template>
    <div :class="['page','container']">
        <article class="article" v-for="article in articles" :key="article">
            <h2 class="article_hd">
                <router-link class="article_tt" :to="{ name: 'articleDetail', params: { id: article.id }}">
                    {{article.title}}
                </router-link>
            </h2>
            <div class="article_info">
                发表于{{article.created_at}} |
                分类于
                <router-link :to="{name:'articleList',params:{type:'category',name:article.category || 'tmp',active:1}}"
                             class="hover-highlight">{{article.category}}
                </router-link>
                |
                浏览 {{article.browse}} |
                评论 {{article.comment_id}}
            </div>
            <div class="article_ct" v-html="article.content"></div>
            <div class="article_ft">
                <router-link class="hover-highlight" :to="{ name: 'articleDetail', params: { id: article.id }}">阅读全文
                </router-link>
            </div>
        </article>
        <pagination :page="page" :active="active" name="index"></pagination>
    </div>
</template>
<script>
    import marked from 'marked';
    import pagination from '@/components/Pagination';
    export default {
        name: "blog-index",
        data: function () {
            return {
                page: {},
                articles: [],
                active: this.$route.params.active || 1
            }
        },
        components: {pagination},
        mounted: function () {
            this.getData();
        },
        methods: {
            getData: function () {
                this.$http.post('blog/index', {active: this.active}).then((res) => {
                    
                    return res.json();
                    
                }).then((res) => {
                    let articles = res['articles'], page = res['page'];
                    articles = articles.map((val) => {
                        val['content'] = marked(val['content']);
                        return val;
                    });
                    
                    this.$set(this, 'articles', articles);
                    
                    page.active = this.active;
                    this.$set(this, 'page', page);
                });
            },
        },
        watch: {
            $route: function (to, from) {
                
                this.active = to.params.active;
                this.getData();
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
