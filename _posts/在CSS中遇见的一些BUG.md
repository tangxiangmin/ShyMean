---
title: 在CSS中遇见的一些BUG
date: 2017-01-15 21:15:47
tags:
	- Bugs
categories:
	- CSS
---

今天打开有道云笔记，发现不知不觉中记录了不少关于CSS的BUG，有的问题在遇见的时候就成功解决了，有的却是采用某些折衷的办法进行处理。里面还有几个挺有趣的问题，一并整理一番，另外还有一篇是关于JS的浏览器的BUG。
<!--more-->
按照怎样的格式来记录这些问题，这也是一个问题。然后我就把笔记上的原话搬过来了，有的是几个月前的问题了，画风有些出入...
## 兼容

### 缓动动画与fixed
当为元素设置缓动动画（或其他动画？）时，其子元素如果设置了fixed，则改fixed属性会失效。后来搜索的时候发现有人遇见了同样的问题
* [问题1](http://www.cnblogs.com/skyweaver/p/4369276.html)
* [问题2](http://meyerweb.com/eric/thoughts/2011/09/12/un-fixing-fixed-elements-with-css-transforms/)

回帖有人说是“父类元素 含有 transform,或者 will-chanage之类，会单独建立 gpu层，导致 子元素fixed，或者zIndex 之类失效”，这个问题有点深奥了，暂时还没有深究。

### ie与form
ie下面的form 嵌套div，在某些情况下会重复出现一个div，这个BUG的原因并没有查到，有说是由于form规范的问题。出现问题的是一个登陆页面，客户用IE8登陆发现的问题（为毛还是IE8！！！），找BUG的时候是一行一行删代码找的，泪奔...最后的解决办法是去掉了form标签（因为数据是直接通过ajax提交的，所以这也算是个很扯淡的解决办法）。

### CSS样式数值在浏览器显示为小数
好吧，记录这个问题的时候我脑袋抽风了，因为这个问题是由于使用了浏览器的缩放功能引起的，然后比如边框宽度等大小都会重新计算为一个小数，这不是BUG而是浏览器做的处理，因此遇见这种问题最好检测浏览器的默认缩放大小是不是100%。好气哦，但还是要保持微笑...

### iphone5下面的flex与内联子项
iphone5下面的flex容器中，如果子项是内联或内联块状元素，则justify属性貌似不会生效，也没有其他解决办法，只能将那段span和strong都写上了`display:block`，如果后面的同事去维护的话看见了希望不要骂我是傻Ⅹ。

### IOS下input光标
如果Input的高度和行高一致，则在ios上出现输入时光标不垂直居中的问题（光标靠上边框），解决办法是移除行高。事实上，没必要为button和input这些元素设置行高的...

### 在火狐和360下的select高度
接上一个问题，在chrome中只需要设置line-height就可以使select得高度撑开，但是在火狐和360等浏览器下不行，必须显式地设置高度，否则在浮动的情况下出现卡位的情况，（论多浏览器测试的重要性，然而我很不情愿换除了谷歌浏览器之外的其他浏览器进行测试，因！为！肯！定！有！问！题！）。

### IE下背景图片不生效
维护一个学校的项目，发现低版本的IE上背景图片不生效。起初以为是png的问题，然后发现根本没毛关系，上万能的互联网一搜，发现有个回答说，no-repeat两边需要加上空格！上源文件一看果然是这个问题尼玛!!! 另外ie9之前的不支持background-size。




## 属性
### translate
`translate`这个属性对于内联元素无效，但是在HBuilder中却可以预览播放（现在我还是转向使用Webstrom了），实在是坑啊。

### nth-of-type
在写一个签到页面的时候发现的问题。无法根据元素索引使用正确的样式。
实际上描述的type是标签类型，并不是类名，因此，如果兄弟元素都为div但是类名不同，使用这种方法无法得到正确的结果。折衷的解决办法是使用不同的标签。切记切记！！！。

### overflow-y hidden
使用overflow-y hidden容器自动换行，这个问题是为了写一个水平加载图片的插件发现的，记录的比较详细：
```
<!--css-->
.wrap {
    overflow-x: hidden;
	width: 500px;
	/* height: 110px; */
	margin:  200px auto;
	border: 1px solid red;
}
.box {
    box-sizing: border-box;
	float: left;
	width: 100px;
	height: 100px;
	border: 1px solid #000;
}
.box img {
	height: 100px;
	display: block;
}


<!--html-->
<div class="wrap">
	<div class="box">
		<img src="head.jpg" height="100" alt="">
	</div>
	<div class="box">
		<img src="head.jpg" height="100" alt="">
	</div>
	<div class="box">
		<img src="head.jpg" height="100" alt="">
	</div>
	<div class="box">
		<img src="head.jpg" height="100" alt="">
	</div>
	<div class="box">
		<img src="head.jpg" height="100" alt="">
	</div>
</div>
```

这是因为总容器`wrap`显式地设定了`overflow-x:hidden`，导致`overflow-y`属性变成了auto的原因
> W3C : The computed values of ‘overflow-x’ and ‘overflow-y’ are the same as their specified values, except that some combinations with ‘visible’ are not possible: if one is specified as ‘visible’ and the other is ‘scroll’ or ‘auto’, then ‘visible’ is set to ‘auto’. The computed value of ‘overflow’ is equal to the computed value of ‘overflow-x’ if ‘overflow-y’ is the same; otherwise it is the pair of computed values of ‘overflow-x’ and ‘overflow-y’.

[参考资料](http://caibaojian.com/overflow-x.html)

此时，`wrap`某个内部子元素高度大于其父元素的高度（这里是图片高度100px，box的高度是98px），导致本来能在同一行显示所有的box，最后一个box却换行显示了。

解决办法是：设置所有元素的高度都能容纳其子元素（增加box的高度或者`height:auto`）

因此这里可以
* 增加box的高度或者设定box高度`height:auto`
* 增加wrap的高度或者设定box高度`height:auto`

实际上只需要不限定父元素的高度就可以了，但是实际开发中总会遇见需要设定高度的地方，因此了解这个问题还是很有用的。

## 小结
还有一些其他的问题，现在回过头看是当时脑子短路了，就不贴上来了，另外这篇文章就用来记录之前及今后遇见的CSS的BUG吧。
另：说是BUG，实际上大多数都是自己学艺不精造成的，无话可说。

