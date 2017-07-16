<template>
    <article class="article">
        <h2 class="article_hd">
            <router-link class="article_tt" :to="`/article/${article.title}`">
                <span v-if="isStickied">【置顶】</span>
                {{article.title}}
            </router-link>
        </h2>
        <div class="article_info">
            <span class="hide-sm">发表于</span>
            <span class="show-sm"><i class="iconfont icon-archives"></i></span>{{article.created_at}} |
            <span class="hide-sm">分类于</span>
            <span class="show-sm"><i class="iconfont icon-tag"></i></span>
            <router-link
                    :to="`/category/${article.category}`"
                    class="hover-highlight">{{article.category}}
            </router-link> |
            <span class="hide-sm">浏览</span>
            <span class="show-sm"><i class="iconfont icon-eye"></i></span>{{article.browse}}
        </div>
        <div class="article_ct" v-html="article.abstract"></div>
        <div class="article_ft">
            <router-link class="hover-highlight" :to="`/article/${article.title}`">阅读全文
            </router-link>
        </div>
    </article>
</template>
<script>
    export default {
        name: "abstract",
        props: ['article', 'isStickied'],
        data: function () {
            return {}
        },
    }
</script>
<style></style>
