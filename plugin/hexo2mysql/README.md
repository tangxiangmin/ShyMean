## 说明
这个脚本完全是为了将本地的Hexo保存的md文件迁移到MYSQL中，因此十分严格的按照下面的格式（也就是hexo的文章格式）来编写的，大部分字段和正则都采用了硬编码的方式。
```
---
title: BFC及其应用
date: 2016-05-28 11:21:38
tags:
	- BFC
	- 布局
categories:
	- CSS
---

最初在看见BFC，两眼一愣，这是个什么玩意，看过的两本书上都没有谈论到。于是balabala一顿谷歌，现在勉强能弄懂了（然后又是满屏幕的overflow hidden，这是病得治啊！），然后就整理了一下。
<!--more-->

## 调用方式
```javascript
var hexo2mysql = require('hexo2mysql');

// 第一个参数是存放md文章的文件夹，第二个参数是输出文件，默认为`ouput.mysql`

hexo2mysql.transform('test');
```