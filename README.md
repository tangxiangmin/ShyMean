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