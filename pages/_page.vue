{{{{raw}}}}
<template>
    <div class="container">
        <template v-for="article in articles">
            <abstract :article="article"></abstract>
        </template>
        <pagination :page="page" :currentPage="currentPage" name="/"></pagination>
    </div>
</template>
{{{{/raw}}}}

<script>
    import axios from "~/plugins/axios"

    import marked from 'marked';

    import Abstract from  "~/components/Abstract"
    import Pagination from "~/components/Pagination"
    
    const SIZE = 10;
    export default {
        components: { Abstract, Pagination },
        async asyncData({ params, error }){
            try {
                let articlesData = await axios.get(`/api/article/${params.page}/${SIZE}`);
                
                let articles = articlesData.data.map((val) => {
                    val['abstract'] = marked(val['abstract']);
                    return val;
                });
                
                // todo 缓存总页
                let pageData = await axios.get('/api/articleSize');
                let page = Math.ceil( pageData.data.total / SIZE);
                
                return {
                    articles,
                    page
                };
            }catch (e){
                console.log(e);
                error({ statusCode: 404, message: '未知错误' });
            }
        },
        data(){
            return {
                size: SIZE
            };
        },
        mounted(){
        
        },
        computed: {
            currentPage(){
                return this.$route.params.page || 1;
            }
        },
        method: {
        
        }
    }

</script>

<style>

</style>
