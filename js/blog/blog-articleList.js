
/**
 * 文章归档
 */


define(['xm'], function () {
    var xm = require('xm');

    return {
        template:`<div :class="['page-bd','container']">

				<div class="archives">
				    <div class="archives_count">{{countWord}}</div>
				    <section v-for="group in articleGroup">
                        <div class="archives_title">
                            <strong>{{group.year}}</strong>
                        </div>
                        <div class="archives_item" v-for="article in group.articles">
                           <router-link class="archives_link" :to="{ name: 'articleDetail', params: { id: article.id }}"><span class="archives_date">{{article.created_at | dateFormat}}</span> {{article.title}}</router-link>

                        </div>
				    </section>
				</div>
				<pagination :page="page" :active="active" name="articleList"></pagination>
			</div>
			`,
        mounted:function(){
            this.getData();
        },
        methods:{
            getData: function () {
                let postData = this.$route.params;

                if (postData.active == ''){
                    postData.active = 1;
                }

                this.$http.post('/Home/Blog/articleList',postData).then((res)=>{
                    return res.json();
                }).then((res)=>{
                    var lists = res['lists'];
                    var page = res['page'];

                    var articleGroup = [];
                    var cursor = 0;

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
        data:function(){
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
        watch:{
            $route: function (to, form) {
                this.active = to.params.active;
                console.log(this.active);
                this.getData();
                console.log(this.articleGroup);
            }
        },
        filters:{
            dateFormat: function (val) {
                return xm.dateFormat(val);
            }
        },
        computed:{
            countWord: function () {
                let type = this.$route.params.type;
                let name = this.$route.params.name;
                let word = '';
                switch (type){
                    case 'archives':
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
    };
});

