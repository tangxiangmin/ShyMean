
/**
 * 文章归档
 */
require.config({
    baseUrl:'/js/',
    paths:{
        'help':'base/help',
    }
})

define(['help'], function () {
    return {
        template:`<div :class="['page-bd','container']">

				<div class="archives-wrap">
				    <div class="archives-count">{{countWord}}</div>
				    <section v-for="d in data">
                        <div class="archives-title">
                            <strong>{{d.year}}</strong>
                        </div>
                        <div class="archives-item" v-for="article in d.articles">
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

                    let data = [];

                    res.forEach((val)=>{
                        let last = data[this.data.length - 1];

                        let articleGroup = {
                            year:val.year,
                            articles:[val]
                        };

                        if (!last || last.year == ''){
                            data[0] = articleGroup;
                        }else if (val.year != last.year ){
                            data.push(articleGroup);
                        }else {
                            last.articles.push(val);
                        }
                    });
                    this.num = res.length;
                    this.$set(this,'data',data);
                })
            }
        },
        data:function(){
            return {
                data:[
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
                return new Date(val*1000).toLocaleString().split(" ")[0].replace(/\//g,'-');
            }
        },
        computed:{
            countWord: function () {
                let type = this.$route.params.type;
                let word = '';
                switch (type){
                    case 'archives':
                        word = 'OK!目前共计 '+this.num+' 篇日志。继续努力。';
                        break;
                    case 'category':
                        word = type + ' 分类。';
                        break;
                    case 'tag':
                        word = type + ' 标签';
                        break;
                    default :
                        word = '程序又出BUG啦~~~';
                }
                return word;

            }
        }
    };
});
