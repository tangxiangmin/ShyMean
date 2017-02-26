---
title: JS模板引擎（初级篇）
date: 2016-12-31 18:22:22
tags:
	- 正则
	- 模板引擎
categories:
	- JavaScript
---

之前的项目中，通过ajax请求获得的数据，重新在页面上渲染出来，基本上都是采用字符串拼接或者定义一个`type/html`的script标签，然后通过jQuery查找结点然后插入数据的，在数据量不大的情况下，这么做貌似也没有什么问题。但是昨天遇见的情况是返回好评、中评、差评的多条数据，，且每天评论需要展示的内容十分多，因此考虑使用第三方的模板引擎库。

<!--more-->
我找了两个库`jquery.tmp`和`doT.js`，感觉都不太合适（没有for指令），但对于模板引擎的原理并不是十分了解（尽管在微擎的项目里遇见过N多使用模板引擎的地方），因此准备学习一下。
我在网上找到了一篇[《20行JS代码实现一个JS模板引擎》](http://blog.jobbole.com/56689/),真是妙不可言。下面是关于这个模板引擎的一些学习整理和思考，管中窥豹，大致也学到了关于模板引擎的基本原理。

## 基本思路
首先先理一理，写一个模板引擎的目的是什么？为了展示数据，详细一点，就是要在一段已经确定（样式已经确定）的HTML结构中展示数据，通过`innerHTML`就可以轻松完成。
```
var data = {'name':'txm', 'age':23};
var htmlStr = '<p>name is: ' + data.name + ' , age is : ' + data.age +'</p>';
$("#target").html(htmlStr)
```
或者稍微复杂一点的，可以使用`type/html`模板
```
// tpl
<script type="text/html" id="tpl">
    <p>name is : <span class="name"></span>, age is + <span class="age"></span></p>
</script>

// js
var dom = $($("#tpl").html());
dom.find(".name").text(data.name);
dom.find(".age").text(data.age);
$(dom).appendTo($("body"));
```
第一种方式的弊端显而易见，需要在JS代码中拼接大量的字符串。
第二种方式也不可避免的需要书写大量的JS代码来操作节点，且必须使用相应的标签来包裹对应的数据，虽然可以用下面这种方式取巧
```
var dom2 = $($("#tpl").html());
for (var key in data){
    dom2.find("."+key).text(data[key]);
}
$(dom2).appendTo($("body"));
```
必须按照一定的规律对相应数据包裹标签进行命名，这大大限制了扩展性。另外对于一些数据的判断和遍历，也必须书写相关的逻辑代码。

因此，模板引擎的作用就出来了。跟上面第二种方法类似，预留一个模板，模板中相应的数据使用模板标签标记，模板标签将按照引擎的规则进行解析，然后在需要的时候调用数据渲染对应的模板，最后输出在页面上。
整理一下思路：
* 按照需要的HTML结构定义一个模板
* 在模板中按照一定的语法填写模板标签
* 输入数据，并解析相应的模板标签，输出一段HTML结构
* 将结构插入到页面中，大功告成

由此可见，最主要的功能就是解析模板标签的语法，那么如何实现呢？使用__正则表达式__和`new Function()`。

## 简单实现

### 正则替换
使用正则表达式可以实现简单的字符串替换，即将变量占位符替换成实际的数据，这里直接使用原文中的例子，也采用了相同的`<%`和`%>`，只是改变了作者使用的正则表达式。
```
var data = {'name':'txm', 'age':23};
var tpl = '<p>Hello, my name is <%name%>. I\'m <%age%> years old.</p>';

var re = /<%([^]+?)(?=%>)%>/g;
var res = null;
while (res = re.exec(tpl)){
    var key = $.trim(res[1]); // 获取键名
    tpl = tpl.replace(res[0],data[key]);
}
console.log(tpl);
```
使用分组里面的值作为键名，获取到相应的数据，然后将模板字符串中的占位符进行替换。但是很明显，这种做法在存在嵌套数据的情况下不起作用，因为解析出来的`xx.prop`会被当作一个普通的字符串键名，这种情况下就会返回undefined。

### new Function
为了解决这个问题，作者使用了`new Function()`定义函数的方法（这真是太奇妙了，尽管之前知道这种创建函数的方法，但是没想到还能这样使用）。
```
var fn = new Function('a','console.log(a+1)');
fn(2); // 3
```
尽管解析的是一个字符串，但是在函数中是可以正常执行的，这样什么嵌套属性，`for,if`的问题都能解决了。
将一段可以执行解析数据功能的代码，当作`new Function`的构造参数传入，作为这个函数的函数体，然后调用这个函数，并返回数据解析后拼接成的字符串，大功告成。我们的目标已经从如何解析模板标签，缩小到如何拼接一段可以执行解析操作的代码字符串。
原文中使用了一个空数组，并借助一个保存偏移量的游标`cursor`，通过`push()`和`join('')`的方法拼接字符串，实际上，使用`+`进行拼接也是可以的（貌似现在`+`的速度更快）。

先不要纠结代码怎么写，而应该着眼于函数体的字符串实现的功能：一段可以执行的JS代码，输入的是一个数据（JSON），输出的是整个模板的内容。单纯的实现这个功能，伪代码如下
```
function fn(data){
    var str = '';
    str += 正常的模板内容（字符串）; // 可能会出现在多个地方
    // 解析数据
    str += data.数据;
    // 解析操作符
    for (...){
    	str += data.xx...
    }
    // 同解析操作符
    if (...){
    	str += data.xx...
    }
    // 返回模板内容
    return str;
}
```
下面来试一试如何拼接这段函数体代码的字符串呢（注意这里是拼接整个函数的代码块，而不是拼接模板内容的字符串，处理模板内容这个功能是在该函数中实现的，这里就当作是使用一种比较独特的方法来写函数）。来一个不包含条件和循环的简单例子:
```
var data = {'name':'txm', 'profile':{'age':23}};

var tpl = '<p>Hello, my name is <%data.name%>. I\'m <%data.profile.age%> years old.</p>';
var re = /<%([^]+?)(?=%>)%>/g;
var res = null;

// 拼接函数体字符串
var fnStr = 'var str = "";\n';
var cursor = 0;
// 解析模板
while (res = re.exec(tpl)){
    fnStr += 'str += "' + tpl.slice(cursor, res.index) + '";\n';
    fnStr += 'str += ' + res[1] + ';\n';

    // 挪动游标
    cursor = res.index + res[0].length;
}

fnStr += 'str += "' + tpl.substr(cursor) + '";';
fnStr += 'return str;';

// 构造函数
var fn = new Function('data',fnStr);

// 调用函数
console.log(fn(data));
```
哈，在函数体中，使用字符串拼接模板内容，比用数组貌似更直观。

### 解析语义标签
上面只是解决了基本的变量解析的问题，其实还有另外一个没有展示出来的问题，如果模板引擎中出现双引号，则拼接的代码字符串在插入函数体之后会报错，因此我们需要对引号进行转义。
```
// 将普通模板标签中的双引号转义
fnStr += 'str += "' + tpl.slice(cursor, res.index).replace(/"/g,"\'") + '";\n';
```
最后，只要稍微处理一下标签，将`str += ...`放在相应的代码块中间就可以完成对`for`,`if`等语句的解析，最后，整个模板引擎的解析如下
```
var data = {skills: ["js", "html", "css"]};
var tpl = 'My skills:' 
        + '<%for(var index in data.skills) {%>' 
        + '<a href="#"><%data.skills[index]%></a>' 
        +'<%}%>';

var re = /<%([^]+?)(?=%>)%>/g;
// 用于检测是否存在JS关键词
var jsExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g;
var res = null;

var fnStr = 'var str = "";\n';
var cursor = 0;

while (res = re.exec(tpl)){

    fnStr += 'str += "' + tpl.slice(cursor, res.index).replace(/"/g,"\'") + '";\n';

    if (jsExp.test(res[1])) {
    	// 如果存在则直接保留
        fnStr += res[1] + '\n';
    }else {
    	// 否则进入字符串拼接环节
        fnStr += 'str += ' + res[1] + ';\n';
    }

    cursor = res.index + res[0].length;
}

fnStr += 'str += "' + tpl.substr(cursor) + '";';
fnStr += 'return str;';

var fn = new Function('data',fnStr);

console.log(fn(data));

```
至此，一个简单的模板引擎原理剖析结束，剩下要做的就是将整个代码封装一下，传入数据，返回模板字符串，插入页面，大功告成。

## 最后
现在大概了解了一点模板引擎的原理，实际上，模板引擎的实现有多种方法，比如也可以使用`eval()`函数等。
另外，一个真正的模板引擎还应当是第一次运行执行模板解析后将模板字符串进行缓存，在之后的模板渲染过程中就不必再执行重复工作了（但是如果模板存在循环的话，则返回的模板字符串就不一定是固定的了）。
类似的优化应当还有很多，比如使用更严谨高效的正则，这些知识就等待接下来的学习吧。