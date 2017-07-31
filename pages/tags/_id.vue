{{{{raw}}}}
<template>
    <div class="container">
        <article-list :type="type" :name="name"></article-list>
    </div>
</template>
{{{{/raw}}}}

<script>
    import ArticleList from "~components/ArticleList"
    
    export default {
        components: { ArticleList },
        data(){
            return {
                type: "tag",
                name: this.$route.params.id
            }
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
