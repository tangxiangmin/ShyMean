
/**
 * 文章归档
 */


define(['xm'], function () {
    var xm = require('xm');

    return {
        template:`<div :class="['page-bd','container']">

				<div class="archives-wrap">
				    <div class="archives-count">{{countWord}}</div>
				    <section v-for="group in articleGroup">
                        <div class="archives-title">
                            <strong>{{group.year}}</strong>
                        </div>
                        <div class="archives-item" v-for="article in group.articles">
                           <router-link :to="{ name: 'articleDetail', params: { id: article.id }}"><span class="post-time">{{article.created_at | dateFormat}}</span> {{article.title}}</router-link>

                        </div>
				    </section>
				</div>
			</div>
			`,
        mounted:function(){
            this.getData();
        },
        methods:{
            getData: function () {
                let postData = this.$route.params;
                this.$http.post('/Home/Blog/articleList',postData).then((res)=>{
                    return res.json();
                }).then((res)=>{

                    var yearFlag = res && res[0] && res[0].year;
                    var data = [];
                    var cursor = 0;

                    data[cursor] = {
                        year: res && res[0] && res[0].year,
                        articles: []
                    };

                    res.forEach((val)=>{
                        if (val.year !== data[cursor].year){
                            cursor++;
                            data[cursor] = {
                                year: val.year,
                                articles: [val]
                            };
                        }else {
                            data[cursor].articles.push(val);
                        }
                    });


                    this.num = res.length;
                    this.$set(this,'articleGroup',data);
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
            }
        },
        watch:{
            $route: function (to, form) {
                this.getData();
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

