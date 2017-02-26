---
title: SCSS进阶
date: 2016-11-22 22:53:18
tags:
	- SCSS
categories:
	- CSS
---
最近阅读了一个按钮样式库[`button.css`](http://www.bootcss.com/p/buttons/)，尽管源码是用scss写的，我却看懵了：别人写的scss和我写的完全不一样啊，各种数组各种循环...！原本以为会用混合器和继承就差不多了，实际上还差的远了去了。然而之前看的教程文档上也只有这些基础，然后一通查询，摸索了一些关于SCSS进阶的方法，整理如下。
<!--more-->

参考资料：
* [sass学习笔记-司徒正美](http://www.cnblogs.com/rubylouvre/p/3794292.html)。
* [scss中国](http://sass.bootcss.com/docs/sass-reference/)    
* [官方函数文档](http://sass-lang.com/documentation/Sass/Script/Functions.html)。

## 占位符
### 变量占位符
sass使用PHP风格的$开头的变量命名风格，使用ruby风格`#{ }`占位符，占位符非常强大，可以用来拼接相应的属性，属性值甚至是选择器名称，然而占位器最主要的作用是用来构建可重用的样式!
```
$base: '.txm';
#{$base}-list {
    list-style: none;
}
```
### 继承占位符
正确使用`extend`可以生成分组选择器，节省很多代码量，但是有时候，我们想使用extend的功能，却不想输出继承的那个父类，这时就可以使用`%`类占位符
```
%col {
    float: left;
}

.col-1 {
    @extend %col;
    width: 100px;
}
.col-2 {
    @extend %col;
    width: 200px;
}
// 这时就只会生成.col-1和.col-2，而不会生成单独的.col，十分方便
```
## 数据结构
### 数组
sass的数组,没有用使用[]包起来，而是通过空格来划分元素；如果是二维组数，则需要用到小括号与逗号。  
sass的数组有一个特点，，也不能用[]来取其中的某一个元素，而是使用`nth()`内置方法,其索引值是从1开始（而不是大多数编程语言的数组从0开始）。
```
$base: '.txm';
$list1: 5px 10px 15px 20px; // 一维数组
$list2: 5px 10px, 15px 20px; // 二维数组
$list3: (5px 10px) (20px 30px); // 同上，二维数组的另外一种表示方法
#{$base}-list {
    list-style: none;
    padding: nth($list1,1); // 5px
    margin: nth($list2,2); // 15px 20px
}
```
除了`nth`方法之外还有几个其他的常用方法:
* index($list, $value)，获取目标值的索引,从1开始
    ```
    $list1: 1px 2px 5px;
    index($list1,5px); // 3
    index($list1,10px); //找不到，则不会输出，应用该表达式的样式规则也不会在CSS文件中显示出来
    ```
* length($list)，获取数组长度，一般会搭配循环使用（实际上数组这个数据结构也许都是主要应用在循环生成多条样式规则上的）
    ```
    length($list1); // 3
    ```
* join($list1, $list2)，连接两个数组,第三个参数可以指定分割符(comma,space)。如果不指定则会自动判断使用逗号还是空格(貌似是根据第一个数组的类型来判断：一维数组则使用空格，二维数组则使用逗号。如果不确定，最好还是显式声明分割符。
    ```
    $list1: 1px , 2px;
    $list2: 3px 4px;
    join($list1, $list2); // 1px, 2px, 3px, 4px
    join($list1, $list2, space); //1px 2px 3px 4px
    join($list1, $list2, comma); // 1px 2px 3px 4px
    
    ```
### 对象
scss对象与JSON十分相似，区别在于使用`()`而不是`{}`来表示，对象提供了大量的函数，基本上都是以`map-`开头的
*  map-get(obj,key)获取对象的某个属性
``` 
$heading: (h1: 2em, h2: 1.5em, h3: 1.2em);
font-size: map-get($heading,h1); // 2em
```
* map-keys(obj)和map-values(obj)返回对象的全部键名或键值，以一维数组表示

## 流程控制
使用@if，@else, @for，@each和@while来表示流程控制
### 条件
@if后面的变量如果为真，则执行相应代码块，否则执行@else后面的代码块
```
$flag: true;
.list{
    @if $flag {
        list-style: square;
    }@else {
        list-style: none;
    }
}
```
此外除了@if逻辑运算符，还有一个函数if()，可用于模拟三目运算符
```
if(unitless($width), $width + px, $width); // 判断$width是否有单位，没有单位则添加'px'
```
### 循环
循环有三种形式：@for,@each和@while
for循环与JS类似，
```
$name: .t-col;
// to相当于开区间
@for $i from 1 to 5 {
    #{$name}-#{$i} {
        float: left;
        border: #{$i}px solid #dedede;
        width: percentage(1/$i);
    }
}
// through相当于闭区间，包含结束值，比to多执行一次
@for $i from 1 through 5 {
    #{$name}-#{$i} {
        float: left;
        border: #{$i}px solid #dedede;
        width: percentage(1/$i);
    }
}
```
@each 是用于遍历数组与对象的。如果是遍历对象，后面跟着两个变量，分别是键名与键值，逗号隔开，接着是in，最后是对象名。
```
$colorArr: red blue yellow;
@each $color in $colorArr {
	.bg-#{$color} {
		background-color: $color;
	}
}
@each $key, $val in (h1: 2em, h2: 1.5em, h3: 1.2em) {
	#{$key} {
		font-size: $val;
	}
}
```
@while循环与JS也十分相似
```
$nums: 4;
@while $nums > 0 {
	.while-#{$nums} {
		width: $nums * 10px;
	}
	$nums: $nums - 1;
}
```

## 函数
### 功能函数
整理了几个比较常用的函数：
```
unquote($string); // 去除字符串
quote($string); // 为字符串添加引号

percentage($number); // 生成百分数
round($number); // 四舍五入取最接近的整肃
ceil($number)；// 向上取整
floor($number); // 向下取整

join($list1,$list2[,separator]); // 连接数组
index($list,$val); // 返回对应元素的索引
length($list); // 返回数组长度

map-get($map,$key); // 获取相应键名的键值
map-keys($map); // 返回对象的键名数组
map-values($map); // 返回对象的键值数组

```

### 颜色函数
```
// 饱和度通过灰色成分调节，而亮度用加白加黑来调节。
desaturate($color,5%); // 减少颜色饱和度
saturate($color, $amount)； // 增减颜色饱和度
darken($color,6%); // 使颜色变暗
lighten(color,6%); // 使颜色变亮

```
### 自定义函数
SCSS允许我们自定义函数
```
@function double($n) {
　　@return $n * 2;
}
.test {
　　width: double(5px);
}
```
自定义函数是一个十分强大的功能，我目前使用到的最多的地方就是使用单位转换：
```
@function rem($pxVal){
	@return 1rem * $pxVal/75;
}
```
这样就不需要再使用其他插件或者计算，就可以轻松实现rem布局了，函数的其他作用我正在探索中。