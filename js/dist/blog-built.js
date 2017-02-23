/**
 *  首页文章列表
 */

define('index',['marked'], function () {

    var marked = require('marked');

    // 首页文章列表
    return {
        props:[],
        template:`<div :class="['page','container']">
                <article class="article" v-for="article in articles">
                    <h2 class="article_hd">
                        <router-link class="article_tt" :to="{ name: 'articleDetail', params: { id: article.id }}">{{article.title}}</router-link>
                    </h2>
                    <div class="article_info">
                        发表于{{article.created_at}} |
                        分类于 <router-link :to="{name:'articleList',params:{type:'category',name:article.category || 'tmp',active:1}}" class="hover-highlight" >{{article.category}}</router-link > |
                        评论 {{article.comment_id}}
                    </div>
                    <div class="article_ct" v-html="article.content"></div>
                    <div class="article_ft">
                        <router-link class="hover-highlight" :to="{ name: 'articleDetail', params: { id: article.id }}">阅读全文</router-link>
                    </div>
                </article>
				<pagination :page="page" :active="active" name="index"></pagination>
			</div>
			`,
        data:function(){
            return {
                page:{},
                articles:[],
                active: this.$route.params.active || 1
            }
        },
        mounted: function () {
            this.getData();
        },
        methods:{
            getData: function () {
                this.$http.post('/Home/Blog/index',{active: this.active}).then((res)=>{

                    return res.json();

                }).then((res)=>{
                    let articles = res['articles'], page = res['page'];
                    articles = articles.map((val)=>{
                        val['content'] = marked(val['content']);
                        return val;
                    });

                    this.$set(this,'articles',articles);

                    //page.active = this.active;
                    this.$set(this,'page',page);
                });
            },
        },
        watch: {
            $route:function (to, from) {

                this.active = to.params.active;
                this.getData();
            }
        }
    };

});

/**
 * 文章详情页面
 */
define('articleDetail',['marked','highlight'], function () {

    let marked = require('marked');

    marked.setOptions({
        highlight: function (code) {
            return require('highlight').highlightAuto(code).value;
        }
    });

    return {
        props:[],
        template:`<div :class="['page','container']">

            <article class="article">
                <header  class="text-center">
                    <h2 class="article_hd">{{article.title}}</h2>
                    <div class="article_info">
                        发表于{{article.created_at}} |
                        分类于 <router-link :to="{name:'articleList',params:{type:'category',name:article.category || 'tmp',active:1}}"  class="hover-highlight">{{article.category}}</router-link > |
                        评论 {{article.comment_id}}
                    </div>
                </header>
				<div class="article_ct" v-html="article.content"></div>
				<footer class="article_ft">
				     <router-link :to="{name:'articleList',params:{type:'tag',name:tag || 'tmp',active:1}}" v-for="tag in getTags" class="article_tag">#{{tag}}</router-link>
				</footer>
				<div class="article_nav">
                    <router-link v-if="prev" class="hover-highlight article_prev" :to="{ name: 'articleDetail', params: { id: prev.id }}">{{prev.title}}</router-link>
                    <router-link v-if="next" class="hover-highlight article_next" :to="{ name: 'articleDetail', params: { id: next.id }}">{{next.title}}</router-link>

				</div>
			</article>
			</div>
			`,
        data:function(){
            return {
                article:{},
                prev:{id:'tmp'},
                next:{id:'tmp'}
            }
        },
        mounted:function(){
            this.getData();
        },
        methods:{
            getData(){
                this.$http.post('/Home/Blog/articleDetail',{id: this.$route.params.id}).then((res)=>{
                    return res.json();
                }).then((data)=>{

                    let article = data['article'];
                    let prev = data['prev'];
                    let next = data['next'];

                    let content  = marked(article['content']);
                    // 最多只考虑了3级目录，应该够用了。

                    let re = /<(h[2|3|4])[^]*?>([^]*?)<\/\1>/g;
                    let title = null;
                    let count = {
                        h2:0,
                        h3:0,
                        h4:0
                    };

                    let titleArr = [];

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
                    // 数据由aside组件渲染
                    this.$emit('article',titleArr);

                    article['content'] = content;

                    this.$set(this,'article',article);
                    this.$set(this,'prev',prev);
                    this.$set(this,'next',next);
                });
            }
        },
        watch:{
            $route(){
                this.getData();
            }
        },
        computed:{
            getTags: function () {
                let tags = this.article['tags'];
                if (!tags) {
                    return '';
                }

                return tags.split(",").map((val)=>{
                    return val.trim()
                });;
            }
        },

    };
});


/**
 * 文章详情页面
 */

define('tags',[], function () {
    return {
        template:`<div :class="['page','container']">
				<div class="classify">
					<div class="classify_hd">
						当前共 {{categories.length}} 个分类
					</div>
					<div class="category">
					    <router-link
					    :to="{name:'articleList',params:{type:'category',name:category.category || 'tmp',active:1}}"
					    class="category_item"
					    v-for="category in categories">{{category.category}} ({{category.category_num}})</router-link >

					</div>
				</div>
				<div class="classify">
					<div class="classify_hd">
						当前共 {{tagsNum}} 个标签
					</div>
					<div class="tag">
					    <router-link
					        :to="{name:'articleList',params:{type:'tag',name:tag || 'tmp',active:1}}"
					        :class="['hover-highlight','tag_item',{'text-xs':tag_num<=1},{'text-sm':tag_num>1 && tag_num <=3},{'text-md':tag_num>3 && tag_num<=6},{'text-lg':tag_num>6}]"
					        v-for="(tag_num,tag) in tags"
					    >{{tag}}</router-link >

					</div>
				</div>
			</div>
			`,
        mounted:function(){
            this.$http.get('/Home/Blog/tags').then((res)=>{
                return res.json();
            }).then((res)=>{
                this.$set(this,'categories',res.categories);
                // 暂时没有想到如何在数据库处理标签数据，因此目前只能采取这种折中的办法
                let tags = {};
                let tagsNum = 0;
                res.tags.forEach((val)=>{
                    let sigleTag = val['tags'].split(',');
                    sigleTag.forEach((val)=>{
                        val = val.trim();
                        if (val in tags) {
                            tags[val]++;
                        }else {
                            tags[val] = 1;
                            tagsNum++;
                        }
                    });
                });
                this.$set(this,'tags',tags);
                this.$set(this,'tagsNum',tagsNum);
            });
        },
        data:function(){
            return {
                categories:[],
                tags:{},
                tagsNum:0
            }
        },
    };
});


// 功能函数
// 命名空间为xm

define('xm',[], function () {


    /**
     *
     * @param UNIX时间戳
     */
    var dateFormat = function (val) {
        var date = new Date(val*1000);

        var year = date.getFullYear();

        var month = date.getMonth() + 1;
        month = getTwo(month);

        var day = date.getDate();
        day = getTwo(day);

        function getTwo(n){
            n = '' + n;
            return  n[1]?n:'0'+n;
        }

        return year + '-' + month + '-' + day;
    };

    // 深复制，用于分页组件传递参数
    var extend = function(target, options) {

        for (name in options) {
            copy = options[name];
            if (copy instanceof Array) {
                target[name] = extend([], copy);
            } else if (copy instanceof Object) {
                target[name] = extend({}, copy);
            } else {
                target[name] = options[name];
            }
        }

        return target;
    }


    return {
        dateFormat: dateFormat,
        extend: extend
    }
});

/**
 * 文章归档
 */


define('articleList',['xm'], function () {
    var xm = require('xm');

    return {
        template:`<div :class="['page','container']">

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



/**
 * 配置路由
 */



define('router-config',['index','articleDetail','tags','articleList'], function () {

    // 引入组件
    var blogIndex = require('index');
    var articleDetail = require('articleDetail');
    var tags = require('tags');
    var articleList = require('articleList');

    // 返回路由配置
    return  [{
        path: '/',
        component: blogIndex
    },{
        path: '/index/:active',
        name: 'index',
        component: blogIndex
    },{
        path: '/articleDetail/:id',
        name: 'articleDetail',
        component: articleDetail
    },{
        path: '/tags',
        component: tags
    },{
        path: '/articleList/:type/:name/:active',
        name: 'articleList',
        component: articleList
    }];
});
/**
 * Created by admin on 2017/1/21.
 */
/**
 * 定义界面的布局组件，包括基本的头部，底部，侧边栏和工具按钮组
 */

define('layout',[], function () {

    // 头部
    var header = {
        template:`<header class="bg-gray">
                    <div class="container header">
                        <h1 class="logo">
                            <router-link to="/index/1">{{msg.title}}</router-link>
                        </h1>
                        <div class="show-md">
                            <div :class="['btn-list',{close:isActive}]" @click="showNav">
                                <div class="btn-icon">
                                    <span class="btn-line"></span>
                                    <span class="btn-line"></span>
                                    <span class="btn-line"></span>
                                </div>
                            </div>
                        </div>
                        <nav :class="['nav-responsive',{active:isActive}]">
                            <router-link to="/index/1" :class="['nav_item']"><i :class="['iconfont','icon-home']"></i> 首页</router-link>
                            <router-link to="/tags" :class="['nav_item']"><i :class="['iconfont','icon-tag']"></i> 标签</router-link>
                            <router-link :to="{name:'articleList',params:{type:'archives',name:'archives',active:1}}" :class="['nav_item']"><i :class="['iconfont','icon-archives']"></i> 归档</router-link>
                        </nav>
                    </div>
                </header>`,
        data:function(){
            return {
                msg:{
                    title:'橙红年代',
                },
                isActive:false

            }
        },
        watch:{
            $route: function (to) {
                this.isActive = false;
            }
        },
        methods:{
                showNav: function () {
                    this.isActive = !this.isActive;
                }
        }
    };

    // 底部
    var footer = {
        template:`<footer class="bg-gray">
				<div class="container footer">
					<p>
						©Shymean 2016 - {{new Date().getFullYear()}}
					</p>
					<p v-if="msg.sign">{{msg.sign}}</p>
				</div>
			</footer>`,
        data:function(){
            return {
                msg:{
                    sign:'世人的悲欢并不相通，我只是觉得他们吵闹。'
                }
            }
        }
    };

    // 侧边栏

    var aside = {
        props: ['catalogue'],
        template: `<aside>
			<div :class="['aside','hide-md',{'active':isClose}]">
			    <tab :items="items">
			        <catalogue slot="catalogue" :data="catalogue"></catalogue>
			        <div  slot="website">
			            <div>
                            <img src="/assets/img/tmp/head.jpg" alt="" width="100" height="100">
                            <h3 class="text-white">ShyMean</h3>
                            <p>一个不学无数且无趣的人。</p>
                        </div>
                        <div class="nav-border">
                            <a href="/Home/Lab/index" class="nav_item"><i class="iconfont icon-lab"></i> <br>实验室</a>
                            <a href="" class="nav_item"><i class="iconfont icon-bookshelf"></i> <br>书架</a>
                             <a href="/Home/Index/about" class="nav_item"><i class="iconfont icon-info"></i> <br>关于</a>
                        </div>
                        <div class="contact">
                            <a href="https://github.com/tangxiangmin" class="contact_link" target="_blank"><i class="iconfont icon-github"></i> GitHub</a>
                            <a href="http://wpa.qq.com/msgrd?v=3&amp;uin=645234650&amp;site=qq&amp;menu=yes" class="contact_link" target="_blank"><i class="iconfont icon-qq"></i> QQ</a>
                        </div>
			        </div>
			    </tab>
			</div>

			<div class="tool">
				<div :class="['btn-list','hide-md',{'hover':isHover},{'close':isClose}]" @click="toggleAside"  @mouseover="toggleList" @mouseout="toggleList">
					<div class="btn-icon">
						<span class="btn-line"></span>
						<span class="btn-line"></span>
						<span class="btn-line"></span>
					</div>
				</div>
				<div :class="['btn-top',{'active':isTopShow}]" @click="backTop"><i class="iconfont icon-top"></i></div>
			</div>
		</aside>`,
        data: function () {
            return {
                isHover: false,
                isClose: false,
                isTopShow: false,
                items:[{
                    slot:'website',
                    title:'站点资料'
                }],
            }
        },
        methods: {
            toggleList: function () {
                this.isHover = !this.isHover;
            },

            toggleAside: function () {
                this.isClose = !this.isClose;
                this.$emit('aside');
            },

            backTop: function () {
                document.body.scrollTop = 0;
            },
        },
        mounted: function () {
            // 判断当前路由
            if (this.$route.name == 'articleDetail') {
                this.items.unshift({
                    slot:"catalogue",
                    title:"文章目录"
                })
            }

            // 返回顶部
            let h = window.screen.height / 20;
            let _that = this;
            document.addEventListener('scroll', function () {
                let scrollTop = 0;
                if (document.body) {
                    scrollTop = document.body.scrollTop;
                } else {
                    console.log("scrollTop这里出BUG啦~");
                }
                _that.isTopShow = scrollTop > h;

            });
        },
        watch:{
            $route(to,from){
                // 判断是否显示目录

                // 从其他页面进入文章详情
                // 从当前文章进入下一篇文章

                if (this.items.length == 1 && to.name == 'articleDetail') {
                    this.items.unshift({
                        slot:"catalogue",
                        title:"文章目录"
                    })
                }else if (from.name == 'articleDetail' && to.name == 'articleDetail') {
                    this.items[0] = {
                        slot:"catalogue",
                        title:"文章目录"
                    };
                }else if (from.name == 'articleDetail') {
                    this.items.shift();
                }
            }
        }
    };

    return {
        showAside:false,
        header:header,
        footer:footer,
        aside:aside
    };
});
/**
 * Vue 分页组件
 * 后端需要传递路由名称page.name，单页数量page.num和总数量page.total
 * 然后前端根据当前页码page.active定义路由，然后在父组件中监听$route更新，发起请求更新分页数据和当前页码
 */
/**
 * 2017-2-11
 * 之前的组件耦合有点严重，全部依赖于page，但是又与当前组件的属性相关，因此剥离部分属性通过props属性传递，page属性只负责生成分页数量即可，现在的组件调用形式是：
 * <pagination :page="page" :active="active" name="articleList"></pagination>
 * 其中，this.page是由后台传递的配置参数，包括total总数量和num每页数量,this.active是通过路由获取的当前页码，name就是当前路由页面的字符串名称
 */
/*
*  2017-2-17
*  限制分页数量，多余页码使用一个省略号代替
*/

define('pagination',[],function () {

    return  {
        props: ['name','page','active'],
        template:`<nav class="pagination" v-if="pageNum > 1" >
                    <div :class="['pagination_item']" v-if="active > 1">
                        <router-link class="pagination_link" :to="{ name: name, params:{ active: active - 1 }}" ><i class="iconfont icon-back"></i></router-link></div>
                    <div v-for="n in pageNum"  :class="['pagination_item',{'pagination_current':active == n}]" v-if="omit(n).msg">
                       <span class="pagination_space" v-if="omit(n).flag">...</span>
                        <router-link v-else  class="pagination_link" :to="{ name: name, params: { active: n }}" >{{n}}</router-link></div>                   
                    <div :class="['pagination_item']" v-if="active < pageNum">
                        <router-link :to="{ name: name, params: { active: active - 0+1 }}" class="pagination_link"><i class="iconfont icon-forward"></i></router-link>
</div>
				</nav>`,
        data: function () {
            return {
                pageNum: 1,
            }
        },
        methods:{
            omit(n){
                let flag = {
                    msg:false,
                    flag:false
                };
                let active = this.active - 0;
                let num = this.pageNum;
                let screen = window.screen.width;

                const limit = screen < 768 ? 2:3;

                if (n < limit || n > num - 1 || (n >= active - limit && n <= active + limit)) {
                    // 显示首页，最后一页或当前页相关
                    flag.msg = true;

                    // 显示省略号
                    if (n == active - limit || n == active + limit) {
                        flag.flag = true;
                    }
                }

                return flag;
            }
        },
        watch:{
            page(){
                this.pageNum = Math.ceil(this.page.total/this.page.num);

            },
        },

    };

});
/**
 * Created by admin on 2017/2/12.
 */

define('tab',[], function () {

    return {
        props:['items'],
        template:`<div class="tab">
                    <ul class="tab_nav" v-if="items.length > 1">
                        <li
                            :class="['tab_item',{active:isActive == index}]"
                            v-for="(item,index) in items"
                            @click="active(index)">{{item.title}}
                        </li>
                    </ul>

                    <div
                        :class="['tab_panel',{active:isActive == index}]"
                        v-for="(item,index) in items"
                        >
                        <slot :name="item.slot"></slot>
                    </div>
                 </div>`,
        data: function () {
            return {
                isActive:0,
            }
        },
        methods:{
            active: function (index) {
                this.isActive = index;
            }
        }

    }
});
/**
 * Created by admin on 2017/2/12.
 */
// 文章目录的组件
// 考虑到侧边栏的宽度，只定义了3级目录，如果无限级的话需要改成递归
// todo：滚动监听

define('catalogue',[], function () {
    return {
        props:['data'],
        template:`<div class="catalogue">
            <ul v-for="h2 in data" class="catalogue_group">
            <li>
                <a href="javascript:void(0)" class="catalogue_item" @click="goAnchor(h2.h2)">{{h2.h2}}</a>
                <ul v-for="h3 in h2.h3" class="catalogue_group">
                    <li>
                        <a href="javascript:void(0)" @click="goAnchor(h3.h3)"  class="catalogue_item">{{h3.h3}}</a>
                        <ul class="catalogue_group">
                            <li v-for="h4 in h3.h4">
                                <a href="javascript:void(0)" @click="goAnchor(h4)"  class="catalogue_item">{{h4}}</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>

        </ul></div>`,
        methods:{
            goAnchor(val){
                val = val.replace(/\d\./g,'');
                val = '#' + val.trim();
                var anchor = document.querySelector(val);
                document.body.scrollTop = anchor.offsetTop
            }
        },
        filters:{
            anchor(val){
                // 去除序号和开头的空格，返回正确的锚点

            }
        }
    }
});
/**
 * Created by Administrator on 2017/2/21 0021.
 */

define('popup',[],function () {
    return {
        props:['type','show'],
        template:`<div class="popup" v-show="show">
                <div class="loading" v-if="type == 'loading'">
                    <div class="loading_dot"></div>
                    <div class="loading_dot"></div>
                    <div class="loading_dot"></div>
			    </div>
                </div>`,
        mounted(){},
        data(){
            return {

            }
        },
    }
});
/**
 * Created by admin on 2017/1/21.
 */

require.config({
    baseUrl:'/js',
    paths:{
        // 框架依赖
        'vue':'lib/vue',
        'vue-router':[/*'https://cdnjs.cloudflare.com/ajax/libs/vue-router/2.2.1/vue-router.min',*/'lib/vue-router'],
        'vue-resource':[/*'https://cdnjs.cloudflare.com/ajax/libs/vue-resource/1.2.0/vue-resource.min',*/'lib/vue-resource.min'],
        //插件
        'marked':[/*'https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.6/marked.min',*/'lib/marked'],
        'highlight':[/*'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/highlight.min',*/'lib/highlight.pack'],
        // 辅助函数
        'xm':'base/function',
        // 全局路由配置
        'router-config':'route',
        // 布局
        'index':'blog/page/blog-index',
        'articleDetail':'blog/page/blog-articleDetail',
        'tags':'blog/page/blog-tags',
        'articleList':'blog/page/blog-articleList',
        'layout':'blog/page/layout',
        // 组件
        'pagination':'component/pagination',
        'tab':'component/tab',
        'catalogue':'component/catalogue',
        'popup':'component/popup',
    }
});

require(['vue','vue-router','vue-resource','router-config','layout','pagination','tab','catalogue','popup'], function () {

    var Vue = require('vue');

    // vue-routes
    var VueRouter = require('vue-router');
    Vue.use(VueRouter);
    var routes = require('router-config');
    var router = new VueRouter({
        routes:routes,
        //scrollBehavior (to, from, savedPosition) {
        //    return { x: 0, y: 0 }
        //}
    });

    // vue-resource
    var VueResource  = require('vue-resource');
    Vue.use(VueResource);
    Vue.http.options.emulateJSON = true;
    Vue.http.options.emulateHTTP = true;


    // 组件
    var pagination = require('pagination');
    var tab = require('tab');
    var catalogue = require('catalogue');
    var popup = require('popup');

    Vue.component('pagination',pagination);
    Vue.component('tab',tab);
    Vue.component('catalogue',catalogue);
    Vue.component('popup',popup);


    // layout
    var layout = require('layout');
    Vue.component('blog-header',layout.header);
    Vue.component('blog-footer',layout.footer);
    Vue.component('blog-aside',layout.aside);


    // 容器实例
    var blog = new Vue({
        el:"#blog",
        data:{
            blogHeader:layout.blogHeader,
            blogFooter:layout.blogFooter,
            showAside:layout.showAside,
            catalogue: [] ,
            isLoading: false,
        },
        router:router,
        methods:{
            toggleAside:function () {
                this.showAside = !this.showAside;
            },
            article: function (catalogue) {
                this.$set(this,'catalogue',catalogue);
            }
        },
        watch:{
            $route: function (to,from) {
                document.body.scrollTop = 0;

                if (to.name != 'articleDetail'){
                    this.catalogue = [];
                }
            }
        }
    });

    // 加载动画
    Vue.http.interceptors.push((request, next) => {
        blog.isLoading = true;
        next((response) => {
            blog.isLoading = false;
            return response
        });
    });

});
define("_blog", function(){});

