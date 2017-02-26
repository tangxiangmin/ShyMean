---
title: 使用Node.js写爬虫（初级篇）
date: 2016-12-25 20:18:40
tags:
	- NodeJS
	- 爬虫
	- 正则
categories:
	- JavaScript
---
最近两周，写爬虫写出魔怔了。很早之前就打算用Python写爬虫，可一直没有时间重新学习Python。刚好现在正在学习Nodejs，用JS写爬虫，实际上也很酷炫。额当然我现在也只会爬一些很简单的静态爬虫，这篇文章主要是整理一下这两周的心得，由于我也是爬虫菜鸟，如果有错误的地方还请指正，感激不尽。

<!--more-->
## 什么是爬虫
下面是百度百科的关于爬虫的定义:
> 网络爬虫（又被称为网页蜘蛛，网络机器人，web crawler），是一种按照一定的规则，自动地抓取万维网信息的程序或者脚本。

没必要去记住这些定义，我觉得，在浏览网页的时候，我们自己就是一个爬虫，在互联网上获取想要的信息，只是我们浏览网页的速度很慢，而预先写一个脚本，先将相关网页上的信息整理出来，这种获取数据的方式可以节省大量的时间————更重要的是，这真的很酷！
过去的几天，我爬了糗事百科，暴走日报以及某个表情包网站。想一想，短短几秒钟就可以获取数千条笑话和表情图片，这让我感觉到满满的成就感（哈哈我就这点追求了）。

## 基础
那么，言归正传，一个爬虫可以工作可以拆分为两步：
* 获取目标网页的内容
* 分析并提取网页的内容
* 保存收获的内容

先来学习最基本的爬虫吧。
### 获取网页内容
跟我们访问网页一样，爬虫也是通过向Web服务器发起HTTP请求，然后等待并接收响应报文的。我们要做的就是提供一个url，剩下的事情（包括怎么建立TCP连接，怎么发送和接收报文，怎么传输数据）都不用我们管了。我们使用浏览器输入网址访问网页，不也是一样的嘛~
```javascript
// http模块用于发起和接收http请求
var http = require('http');

// 提供一个url
var href = 'http://www.qiushibaike.com/';

// 发起请求并接收响应
http.get(href,function (res) {
	// 存放网页数据
    var pageData = '';

    // 在data事件中持续接收数据
    res.on('data',function (chunk) {
        pageData += chunk;
    });
    
    res.on("error",function () {
        console.log('something wrong!');
    })
	// end事件表明整个网页数据已经下载完成
    res.on("end",function (err,res) {
        if (err) throw err;
        
        //整个网页的数据都保存在pageDate变量中等待下一步处理
        console.log(pageData);
    })
});
```

你看，整个爬去网页的过程完全不用我们干些什么。稍微思考一下，网站中的数据分页，其URL都是按照一定规律组成的（一般都是拼页码的GET参数），使用一个循环，就可以获取很多链接并使爬虫在极短的时间内完成对相应页面内容的下载。
再思考一下，一个网页并不是独立的存在于网站中：页面中包含大量的a标签，我们可以从获取到的数据中提取出相关的链接，然后重复爬取相应链接的页面，如此重复，爬取整个互联网的全部网页，指日可待了！（哈哈，当然事情远比这复杂的多，不过，最基本的爬虫原理大概就是这样）

### 提取网页内容
从页面中提取所需要的信息至关重要，这时候就要用到酷炫的正则表达式了。一般情况下（绝大部分情况下），需要的信息都被某个特定的标签所包围或者是就保存在某个标签的属性中，这些标签具有特定的类名或者id名（这对于我们这些切页面的来说实在是太熟悉了）。可以使用开发者工具快速确定所需信息所处的标志标签，再使用一个分组，就可以完美地将信息提取出来。

```html
// 通过观察可以发现，我们需要的信息如下嵌在页面中
<div class="content-text">
    <a href="/article/118257676" onclick="_hmt.push(['_trackEvent', 'list_content', 'chick']);" >
        <div>
            <span>

            有一个爱打麻将的老妈是一种怎样的体验呢？<br/>开店中，生意不大好。老妈打电话来说，店里生意怎样啊，不好吧，不好就抓紧回来吃饭，你大姨和大姨夫被留在这吃饭了，三缺一啊。。。。<br/>心好累

            </span>
        </div>
    </a>
</div>
```
于是可以封装一个函数从页面中提取全部有用的信息。
```javascript
function getInfo(htmlStr) {
    var info = '';
    var re = /class="content-text"[^]*?<span>([^]*?)<\/span>/g;
    var res = null;
    while (res = re.exec(htmlStr)){
        info += res[1] + '\r\n';
    }

    return info;
}
```
在循环中可以对单条数据进行一些其他操作比如换行，编号等你想做的任何操作。
提取网页信息最重要的操作就是学会正则表达式，在某些时候，如果一次性写出合适的正则比较困难，可以通过多个正则表达式从大范围缩小到具体的标签，然后再进行处理，拿上面段HTML代码举例：
```javascript
var re = /class="content-text"([^]+?)<\/div>/g;
var re2 = /<span>([^]+?)<\/span>/;
var res = null;
var info = '';
while(res = re.exec(htmlStr)){
    info +=  '\r\n' + re2.exec(res[1])[1].trim() + '\r\n';
}
```
尽管在这个例子不太明显，在某些时候这种办法还是挺有效的，因为所需信息的标识各不相同，因此这些爬虫的正则一般都是一次性的，对于出学者而言，提取到正确信息才是最重要的。当然，处于性能和学习的目的，深入学习正则表达式是很有必要的（我现在只是一个菜鸡...）

### 保存网页内容
实际上保存提取的信息已经不能算在是爬虫的范围内了，因为我们可以采用多种方式保存数据：从基本的文本文件到系统的数据库，都可以用来保存信息。根据各自的需求，选取合适的保存方式。
我现在爬取的都是简单的文本和图像，因此直接保存使用文本和文件夹来保存在本地的，
```javascript
// 引入nodejs的文件系统
var fs = require('fs');

res.on("end",function () {
    pageInfo = getContent(pageDate);
    // 保存所需信息
    fs.appendFile('demo2.html',pageInfo,function (error) {
        if (error) throw error;
        console.log("success");
    })
})
```
关于文件保存这一块，现在并没有深入地了解，只是大致看了相关的API，因此有待学习。

### 小结
看吧，一个简单的爬虫就这么完成了，并不是什么高级复杂的东西。用到的知识也就是有：
* HTTP请求与响应
* 正则表达式
* 文件IO

实际上，现在已经有很多成熟的爬虫框架（或工具），这些框架能够让我们更好地专注于所需要获取的信息，而不是爬虫代码方面的东西（当然，了解爬虫的原理还是很有学习意义的）。

## NodeJS爬虫工具
社区里面提供了大量的爬虫工具，有专门用于网页请求的，有处理请求并发的，有解析页面内容的等等，数不胜数，我在最近的学习中，接触到了几个比较好用的工具

### superagent
[SuperAgent](http://visionmedia.github.io/superagent/)，一个用于发起网页请求和接受响应的库，提供链式的KPI接口，可以使用它替代基础的http模块
```javascript
var superanget = require('superagent');
var href = 'http://www.qiushibaike.com/';

superanget.get(href).end(function (err,res) {
	// 网页内容保存在res.text属性中
    console.log(res.text);
});
```
superagent提供的方法远不止这些基础的请求，诸如爬去需要cookie验证登陆的网站（知乎，微博等），就需要对爬虫做进一步的处理，这是我接下来的学习任务之一。

### cheerio
[cheerio](https://github.com/cheeriojs/cheerio)，当作服务端的jQuery使用，学DOM的用处终于体现出来，提取数据真的太方便了。
使用cheerio，我们甚至不需要写一行正则表达式，就可以通过向操作DOM树一样，快速的解析目标信息，最关键的是，cheerio提供了jQuery一模一样的接口！
```javascript
// 初始化$对象，当然也可以取个其他的名字
var $ = cheerio.load(res.text);
// 真的是一模一样的用法哦
$(".content span").each(function () {
    pageInfo += $(this).text() + '\r\n';
})

console.log(pageInfo);
```
使用cheerio似乎可以完全不用再学习正则表达式了，然而，写爬虫的乐趣之一不就是处理文本的成就感嘛（对我来说）。不过对于使用NodeJs写爬虫的前端来说，cheerio跟我们的日常习惯真的是太搭了，哈哈。

### eventproxy
[eventproxy](https://github.com/JacksonTian/eventproxy)，用于解决回调地狱的一个方案，通过事件监控异步程序，以一种优雅的方式解决多重异步嵌套的问题。


NodeJs里面使用了大量的回调来实现异步，但是，如果后面的操作需要异步的结果才能进行（比如先爬去获得了网页上所有图片的链接，然后去根据链接去爬取每个图片），之前的解决办法是多重嵌套实现。这样做的话，代码看起来会非常恐怖。

eventproxy通过事件来解决这个问题的。NodeJS里面的事件系统十分重要，然而我也还没有开始学习，接下来又有事情做了。

## 总结
最近正在阅读《计算机网络》和学习NodeJs，而之前又学习了一段时间的正则表达式，恰好碰在一起，写爬虫真是太合适不过了。爬虫是一件很有意思的事情，期待之后的学习发现更多有意思的事情。我还打算学习一些Canvas，然后写小游戏玩玩...


