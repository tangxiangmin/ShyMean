{{{{raw}}}}
<template>
    <div class="container">
        <div class="archives">
            <div class="archives_count">{{countWord}}</div>
            <section v-for="group in articleGroup">
                <div class="archives_title">
                    <strong>{{group.year}}</strong>
                </div>
                <div class="archives_item" v-for="article in group.articles">
                    <router-link
                        class="archives_link"
                        :to="`/article/${article.title}`">
                        <span class="archives_date">{{article.created_at | dateFormat}}</span>
                        {{article.title}}
                    </router-link>
            
                </div>
            </section>
        </div>
    </div>
</template>
{{{{/raw}}}}

<script>
    import axios from "~plugins/axios"
    
    export default{
        name:"articleList",
        props: ["type", "name"],
        data(){
            return {
                articleGroup:[
                    {
                        year:'',
                        articles:[],
                    }
                ],
                num:0,
                page:{},
                active: this.$route.params.active || 1
            }
        },
        mounted:function(){
            this.getData();
        },
        methods:{
            getData: function () {
                let postData = this.$route.params;

                postData.active = postData.active || 1;

                axios.get(`/api/articleList/${this.type}/${this.name}`).then(res=>{
                    let { data } = res;
                    
                    let lists = data['lists'];
                    let page = data['page'];

                    let articleGroup = [];
                    let cursor = 0;

                    articleGroup[cursor] = {
                        year: lists && lists[0] && lists[0].year,
                        articles: []
                    };

                    lists.forEach((val)=>{
                        if (val.year !== articleGroup[cursor].year){
                            cursor++;
                            articleGroup[cursor] = {
                                year: val.year,
                                articles: [val]
                            };
                        }else {
                            articleGroup[cursor].articles.push(val);
                        }
                    });

                    this.num = page.total;
                    this.$set(this,'articleGroup',articleGroup);
                    this.$set(this,'page',page);
                })
            }
        },
        
        watch:{
            $route: function (to, form) {
                this.active = to.params.active;
                this.getData();
            }
        },
        filters:{
            dateFormat: function (val) {
                return val
//                return xm.dateFormat(val);
            }
        },
        computed:{
            countWord: function () {
                let type = this.type;
                let name = this.name;
                
                let word = '';
                switch (type){
                    case 'archive':
                        word = 'OK!目前共计 '+this.num+' 篇日志。继续努力。';
                        break;
                    case 'category':
                        word = name + ' 分类。';
                        break;
                    case 'tag':
                        word = name + ' 标签';
                        break;
                    default :
                        word = '程序又出BUG啦~~~';
                }

                return word;
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
