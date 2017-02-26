---
title: flex布局
date: 2016-12-01 21:46:14
tags:
	- flex
	- 布局
categories:
	- CSS
---
最近在掘金上看见了一个叫做`flex.css`的项目：使用flex进行移动端的快速布局。之前在学习CSS3的时候还挣扎在定位和浮动的困惑无法自拔，后面的项目也未曾想到使用flex。因此翻开CSS手册，准备整理一下关于flex的知识。
<!--more-->

## 兼容
在[Can I Use](http://caniuse.com/#search=flex)上可以看到，现在主流的浏览器都是支持`flex`属性的，关于之前需要使用的`-webkit-`前缀，貌似现在也是不需要了，因此，大胆地尝试一些新的东西吧。至于flex本身，也有`box-flex`（旧版本）和`flex`（新版本），现在肯定是学习最新的啦。

## 语法
进行flex布局需要先定义一个flex容器，其子元素成为该容器的项目，设置为Flex布局以后，子元素的`float`、`clear`和`vertical-align`属性将失效。
### 容器
```
display: -webkit-flex; // 现在已经不需要添加浏览器前缀了
display: flex;
```
一个声明为flex的容器，便可以添加下面六种属性（就我个人的观点，就像是操作单个文字一样操作容器下的项目）。
#### flex-direction
容器具有主轴和侧轴，全部的项目都根据轴进行布局的，`flex-direction`设置flex的主轴方向，即项目的排列方向，默认水平方向。（类似于文本的direction属性）
```
flex-direction: column | row | column-reverse | row-reverse;
```
#### flex-wrap
默认情况下，项目都排在一条线（又称"轴线"）上（每个项目会自动调节其宽度）。flex-wrap属性定义，如果一条轴线排不下，是否进行换行。（类似于文本的white-space属性）
```
flex-wrap: nowrap | wrap | wrap-reverse;
```
#### flex-flow
flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。
```
flex-flow: <flex-direction> || <flex-wrap>;
```

#### justify-content
定义了项目在主轴上的对齐方式（类似于文字对齐的text-align）。
需要注意的是：起点和终点都是由flex-direction的值决定的，也就是说如果改变了flex-direction的值，justify-content的结果也会发生变化。

```
justify-content: flex-start | center | flex-end;
```
除了起点，居中，终点之外，如果需要设置各项目之间的位置分布，还可以使用
```
justify-content: space-between | space-round;
```
其中，`space-between`表示两端对齐，项目之间的间隔都相等；`space-round`表示每个项目两侧的间隔相等（类似于把该行剩下的留白均分给每个项目的外边距，）。这两个属性都会使容器中的元素平均地分布在行内，区别在于如果只存在一个项目，则前者相当于`flex-start`，而后者相当于`center`。

#### align-items
定义项目在侧轴上的对齐方式（类似于设置文本行高与vertical-align的结合），跟`justify-content`类似，也有下面三种属性值
```
align-items: flex-start | flex-end | center ; // 垂直居中不要太简单
```
除了起点，居中，终点之外，此外还有
```
align-items: baseline | stretch
```
其中，`baseline`表示项目按照项目的第一行文字的基线对齐；`stretch`如果项目未设置高度或设为auto，将占满整个容器的高度（这个单词的意思就是拉伸）。
PS：如果要测试这个属性，最好显式地设置一下容器的高度，或者将项目设置不同的高度

#### align-content
用于多行的弹性盒模型容器轴线的对齐方式，只有定义了flex-wrap为wrap时才有效果，如果项目只有一根轴线，该属性不起作用，跟justify-content具有相似的属性值
```
align-content: flex-start | flex-end | center | space-between | space-around | stretch;
```

### 项目
处于flex容器下的项目可以应用下面几个属性（当然，项目也可以是flex容器）。
#### order
定义项目的排列顺序。数值越小，排列越靠前，默认为0。（类似于z-index一样使用数值达到排列在“前面”的效果）
```
order: <integer>;
```

#### flex-grow
定义项目的放大比例（所谓放大指如果项目宽度之和小于容器宽度，就会增加每个项目的宽度），默认为0，即如果存在剩余空间，也不放大。
```
flex-grow: <number>;
```
假设存在剩余空间，如果所有项目的flex-grow属性都为1，则它们将均分剩余空间。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍，以此类推，浏览器会自动计算每个项目的宽度。

#### flex-shrink
定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
```
flex-shrink: <number>;
```
如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。
* 如果一个项目的flex-shrink属性为0，空间不足时，则该项目的尺寸不缩小（这时就会发生项目溢出容器的情形）;
* 如果一个项目的flex-shrink属性为2，其他的项目flex-shrink属性为1，则当空间不足时，该的缩小程度为其他项目的2倍，以此类推（类似于一个靠近浮动元素的BFC）。

#### flex-basis
定义了在分配多余空间之前，项目占据的主轴空间（跟主轴方向有关）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的沿主轴方向上的自身尺寸。
```
flex-basis: <length> | auto;
```
它可以设为跟width或height属性一样的值，则项目将占据固定空间，且设置该属性之后，width的值会被自动覆盖（不论书写顺序的前后）

#### flex
是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
```
flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
```
该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。

#### align-self
align-self属性允许单个项目有与其他项目不一样的对齐方式，可用于覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。
```
align-self: auto | flex-start | flex-end | center | baseline | stretch;
```

## flex.css
由于我也是刚接触这个框架，大致查看了一下，主要是应用属性选择器直接在元素上进行布局声明。这样的写法之前很少遇见，但是感觉很有意思：布局完全跟CSS样式分离了，官方称作“声明式布局”，看HTML代码就可以大致了解整个页面的布局，怪不得说是移动端快速布局的神器。附上两个链接，学习去了：
* [flex.css官方地址](https://github.com/lzxb/flex.css)
* [flex.css快速入门--掘金](http://gold.xitu.io/post/582d991cc4c9710054407dc3?utm_medium=hao.caibaojian.com&utm_source=hao.caibaojian.com)