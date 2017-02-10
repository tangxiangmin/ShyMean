## 记录

### 2016-12-31
准备写一个很酷的个人站点，整合之前的`100animation`和`css-utils`还有`shymeanblog`这三个项目，赶在跨年前把环境搭好了，新年快乐。

### 2017-1-1
添加了`_flex.css`，参考之前[flex.css](https://github.com/lzxb/flex.css.git)这个项目的声明式语法，，使用scss重新写了一遍，修改了部分属性调用方式，并在子项上添加了网格系统，移除了全部的快捷属性命令（top，bottom等）。

整个项目中的图标，使用的是阿里的[iconfont](http://www.iconfont.cn/)


### 2017-1-2
整理了之前仿着写的PHP框架，当时还没有写完，现在一并把坑填了吧。
框架的大致流程是：
入口文件 -> 核心文件 -> 路由类解析路由 -> 加载对应控制器，调用方法 -> 方法中调用模型获取数据 -> 加载对应视图并赋值

节前买了两本PHP的书还没到，接下来打算先把PHP的基础搞好，不然轮着用TP,laravel写东西心里都是虚的。

### 2017-1-9
重新梳理了框架的流程，打算只在后端中转路由和提供数据接口，其余的逻辑操作放在前端处理，打算使用Vue和Require来做，并没有这方面的经验，就当是瞎折腾吧。


### 2017-1-12
最近在实际项目中使用声明式布局的flex，感觉这种声明式布局语法并不是十分合适，不太恰当地讲，跟写行内并没有什么区别。
现在实践得到的使用方式还是用混合器和继承来弄吧，另外，貌似flex的兼容现在确实还不错了，在iphone5上面，加上前缀都能跑起来，除了flex-wrap有点问题。
因此打算重新写样式表和页面，使用rem和flex来布局，整合了scss文件夹，开动吧~~

### 2017-1-21
已经完全确定了使用的技术框架和逻辑流程:

__项目逻辑__
项目主要分为了“实验室”，“博客”和“书架”三个板块：
* 实验室包括学习过程中的一些尝试和练习，包括之前`100animation`中的部分demo
* 博客包括学习过程中的笔记和思考，将之前`hexo`博客迁移过来
* 书架包括阅读书籍和读后感。

__技术框架__
* 后端使用原生PHP搭建的简单框架，提供数据接口；
* 前端使用`Vue`框架，通过`Vue-resource`请求数据，通过`Vue-router`请求数据，然后再渲染页面

### 2017-1-22

#### 模块化的思考
被一个问题坑了很久：一个Vue实例的DOM结构中再实例一个Vue对象，控制台不会报错，但是数据和事件就“混乱了”，导致使用`vue-resource`回调函数中无法改变响应式数据。
正确的做法应该是，一个Vue实例中引入其他Vue实例，应当使用组件的形式。而之前为了方便布局，采用的结构是
```
<div id="blog" v-cloak >
    <main :class="['page-mn',{'active':showAside}]">
        <blog-hd v-bind:msg="blogHeader"></blog-hd>
        <div class="container" id="blog-index">
            <article-item v-for="article in articles" :article="article"></article-item>
            <pagination :page="page"></pagination>
        </div>
        <blog-ft v-bind:msg="blogFooter"></blog-ft>
    </main>
    <blog-sd @aside="toggleAside"></blog-sd>
</div>
```
这样相当于外面有一个`#blog`实例，内部还有一个`#blog-index`实例，导致回调函数中改变数据状态无效（具体的原因还没有找到）。现在改变了之前`requirejs`的调用方式，每个页面只保留一个`#app`的实例，然后内部模块拼接。
```
<div id="blog" v-cloak >
    <main :class="['page-mn',{'active':showAside}]">
        <blog-hd v-bind:msg="blogHeader"></blog-hd>
        <blog-index :articles="articles" :page="page"></blog-index>
        <blog-ft v-bind:msg="blogFooter"></blog-ft>
    </main>
    <blog-sd @aside="toggleAside"></blog-sd>
</div>
```
由于`blog-hd`,`blog-ft`,`blog-sd`,这几个组件是所有页面公有的，因此新建了一个`layout.js`的文件，加载这几个模块，并请求对应的数据，最后在页面文件中引入公共的`layout`文件，然后处理单独的逻辑即可，比如分页，选项卡等颗粒化的模块也可以单独提取出来。
不知道我这种处理模块化开发的思路是不是正确的（只针对于JS，而CSS我还是习惯使用scss`@import`的方式来管理），这一路踩过的坑，想想都觉得刺激啊。

#### 数据库
本来之前想先封装好一个数据库类，然后再直接使用模型获取数据；现在突然感觉有一些本末倒置了，现在是出于学习的目的，应当先从SQL语句写起，而不是一步登天，因此决定先将数据库类放一放，直接使用最原始的PDO来实现数据库的操作，反正最主要的逻辑操作都放在前端处理的。

### 2017-2-2
过完年啦~~今天使用准备使用`vue-route`搭建整个博客：
`layout.js`用于搭建整体布局，然后定义各个页面的组件，在每个组件初始化时向后台请求数据，在`route.js`中配置路由并加载相关组件。
整个项目都是在摸索中前进的，总之，又将整个项目文件重新折腾了一番。

`vue-route`的使用流程如下：
* 使用`router-link`指定路由链接
* 定义路由数组，并作为`VueRouter`构造参数实例化路由对象
* 在`vue`实例的`router`属性中关联路由对象
* 在`vue`实例的视图中定义`router-view`作为路由跳转加载页面的容器

最主要的步骤是定义路由数组，需要指定路由名称以及每个路由对应的组件。

### 2017-2-3
假期又重新翻阅了《Mysql必知必会》，收获是：
* 数据库语句由子句组成，子句又分为必需子句和可选子句
* 必需子句实现增删改查的功能，可选子句用来修饰必需子句，即修饰增删改查的结果
* 可选子句之间的顺序需要按照一定的规则进行搭配，否则会出问题

根据这三点收获重新设计了模型类，主要包括
* 相关的私有变量
* 功能方法如`query`,`sql`等
* 必选子句如`select`,`delete`等CURD方法
* 可选子句如`distinct`,`orderBy`等

现在项目的进行方式是：在前端定义好相关组件，然后再组件`mounted`期向后端请求该组件所需的数据，然后再渲染出来，因此模型类的方法根据需求正在逐步完善。
由于现在控制器的方法只提供单独的数据，因此之前打算在独立的表模型类中提供数据接口，然后在控制器方法中处理并返回数据的方法有一些累赘，直接在控制器中调用模型基类的方法直接获取和处理数据就好了，如何取舍应当实践几天再做决定。

### 2017-2-4
今天能把整个项目的博客部分搞完，只不过还用的之前Laravel搭建的后台。感觉后端用Vue来搭建会更加方便。

由于需要在前端处理分页，因此整理一下整个思路：
* 初始化时由后台传递数据总数和单页数量
* 在`pagination`组件中根据这两个数据生成页面和路由链接，在路由链接中传递当前页面到后端
* 后端根据当前页面和单页数量计算偏移量并重新输出数据

遇见的问题是路由加载的模块都在当前页面，根据参数进行区分，造成组件实例被复用，组件的生命周期钩子函数无法被重新调用，查文档发现了解决办法:
复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch（监测变化） $route 对象。


### 2017-2-5

#### 模块化思考
之前的组件定义方式存在一点认知误区，我直接在组件文件如`blog-hd.js`文件中引入了`vue`文件，然后直接调用了`Vue.component`方法定义组件，最后返回的是`Vue`构造函数，我现在发现不应该这样处理，而是应该在组件文件中定义一个对象字面量，保存组件的构造参数，然后返回该对象自面临，最后在基础文件文件中注册组件，这样将所有组件的注册统一在一起管理。
现在的做法是将`hd`,`ft`,`sd`这三个布局组件在`layout.js`中定义，然后作为layout对象的属性返回，最后在`blog.js`文件中进行注册.
这么做也会产生一个新的问题（之前的方式同样存在）：我感觉组件文件应当是根据路由按需加载的，而不应该是第一次进入页面就加载全部的JS文件，因为访问者不可能点击全部的链接，怎么处理这个问题暂时还没有想好

#### 样式
由于是单页面应用，每个组件的高度并不是固定的，切换路由的时候在某些组件上回出现滚动条，而在某些组件上不会出现，连续切换时页面产生“闪烁”的情况
，十分恶心，最后使用最简单的方法`::-webkit-scrollbar{width:0;}`处理，至于兼容什么的，我的地盘我做主，哈哈。

### 2017-2-6
整个项目的博客前端部分已经完成，今天开始搭建项目的后台。后台是用样式框架还是自己写呢...好吧，直接用Bootstarp吧，也不用ACE了。
额，我最后还是打算自己写一个样式库。

### 2017-2-10
这两天又重新在纠结CSS的文件管理和样式命名，最终下定决定使用`BEM`。然而后台还没有开始写，由于之前的测试数据太少了。趁着今晚的功夫用`Node`写了一个脚本，将之前`hexo`保存在本地的`_posts`目录下的博客文章全部导出到一个`sql`文件中，然后移动到数据库。
遇见的一个小问题是没有转义内容中的引号和双引号，导致插入数据库出现错误。
```
/**
 * Created by admin on 2017/2/10.
 */


let fs = require('fs');

let floder ='test';
let files = fs.readdirSync(floder,'utf-8');

// 正则

let reTitle = /title:\s*([^]*?)[\r\n]/;
let reDate = /date:\s*([^]*?)[\r\n]/;

let reCategory = /categories:\s*-\s*([^]*?)[\r\n]/;
let reTags = /tags:\s*-\s*([^]*?)[\r\n]/;
let re = /---([^]*?)---([^]*)/;


let count = 0;
let ouputCount = 0;
let start = new Date();

// 重置测试文件
let output = 'output.txt';

if (fs.existsSync(output)){
    fs.unlink(output);
}

// 拆分头部信息和主要内容
let sql = 'INSERT INTO shymean_article(`title`, `content`, `category`, `tags`, `created_at`) VALUES';
fs.writeFile(output,sql,function (err) {
    if (err) throw err;

    files.forEach((file)=>{
        fs.readFile(floder+'/'+file,"utf-8",function (err,data) {
            let value = '(';
            if(err) throw err;

            let head = re.exec(data)[1];
            let content = re.exec(data)[2];
            content = content.replace(/'/g,"\"");
            // 拆分头部信息
            let title = getMsg(head,reTitle);
            let date = getMsg(head,reDate);
            let category = getMsg(head,reCategory);
            let tags = getMsg(head,reTags);

            // 将时间字符串转换成时间戳
            date = new Date(Date.parse(date.replace(/-/g, "/")));
            date = date.getTime();

            // console.log(title);
            // console.log(date);
            // console.log(category);
            // console.log(tags);

            value += `'${title}','${content}','${category}','${tags}','${date}'`;

            value += ')';

            count++;
            if (count != files.length) {
                value += ',';
            }

            fs.appendFile(output, value, function(err){
                if (err) throw err;
                ouputCount++;
                // console.log("成功获取 " + file);
                if (ouputCount == files.length) {
                    let end = new Date();
                    console.log("总计："+ (end - start) / 1000 + '秒');
                }
            })
        })
    });
});



function getMsg(str,re) {
    let res = re.exec(str);
    return res && res[1] || '';
}



```
