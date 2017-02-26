---
title: 在JS中遇见的一些BUG
date: 2017-01-15 21:55:29
tags:
	- Bugs
categories:
	- JavaScript
---
前面写了一篇记录遇见的CSS的BUG，这篇文章就用来整理和记录写JS遇见的坑。实际上项目基本上都使用了jQuery，因此绝大部分兼容性问题已经很少遇到了，然而，总还是有一些蛋疼的问题出现。

<!--more-->

## 兼容

### 移动端获取触摸坐标
由于代码都是在PC端使用模拟器进行测试的，一到真机上就嗝屁了。最初写了一个滑动图片的demo，手机上查看死活没反应，最后发现并不能使用`e.pageX`和`e.pageY`获取，而是`var startPoint = e.originalEvent.targetTouches[0].pageX;`获取...这个怎么能叫BUG！！

### 手指按住屏幕时UI，JS线程不会执行的
在IOS上发现的这个BUG，一个抢购倒计时，当手指按住屏幕的时候倒计时会暂停。
一通查询，这个问题貌似是JS执行线程，UI线程，事件线程之间的关系，办法就是使用事件线程来协调JS线程和UI线程，因为在JS执行的过程中如果触发了UI事件那么就会引起UI更新；
js中没有阻塞式的sleep。因为在浏览器中UI线程会随JS线程一起阻塞。如果JS阻塞了，界面也会失去响应，或者无法更新。
附原回答，这个问题我到现在都没有解决，（要不是今天整理笔记我都忘记这茬了）
* [问题1](https://www.zhihu.com/question/38337979)
* [问题2](http://www.cnblogs.com/liuliang-wifi/p/5431726.html)

### unbeforeunload不触发
如果事件回调函数中存在报错，则窗口会直接关闭而不是在控制台显示错误并阻止程序执行。
因此很难发现unbeforeunload不触发的问题，需要仔细排查！

### touchstart之后的click事件不生效
在使用touchstart之后页面上的链接都点击不了（后来发现是在touchend中使用了return false，实际上是e.preventDefault()导致整个页面的链接都失效。这个就是自己给自己挖坑了。
附：[问题1](http://www.cnblogs.com/lvmingyin/p/5372678.html)

## 语法
### 字符串转数字
之前写过的一端预约时间的的代码，采用的逻辑是根据后台传出的时间段及时间间隔，根据分数遍历出对应的option，但是360浏览器下的parseInt()有个很严重的BUG: `parseInt("01")`..`parseInt("07")`都会正确转换成1到7，但是
`parseInt("08")`,`parseInt("09")`却转换成了0,这是一个十分严重的BUG,硬生生的将预约时间增加了数个小时
解决办法是在使用使用隐式转换与显式转换，即`parseInt("09"-0)`，这样才能解决问题。

在阅读《JavaScript语言精粹》的时候终于知道了问题的缘由：parseInt()是一个把字符串转换成整数的函数，在遇见非数字时就会停止解析；然而如果第一个字符是0，则会默认按照八进制解析，由于8,9不是合法的八进制字符，因此会转换成0，产生了上面的BUG（在谷歌浏览器等先进浏览器下面已经解决了这个问题，因此没有发现这个问题）。解决办法是在使用parseInt的时候显式的指定第二个参数，即转换进制,parseInt('09',10);

### 函数返回true
一个函数如果没有返回值则默认返回undefined；因此在判断语句中使用return true和false时，需要显式地将return true声明，否则函数会一直返回false或者undefined。这是一个很简单的基础问题，我当时去花了半个多小时，真是醉了。
```
function checkPhone(tel){
    var re = /^1[358]{1}\d{9}$/;
    if (!tel || !re.test(tel)){
        alert("请输入正确的手机号");
        return false;
    }
    return true;
}
```
现在回过头看，明显应该修改判断条件，把`return true`写在判断里面，哎，想之前还写过`if {...} else { continue}`的代码呢。

## 小结
遇见的JS的问题还是比较少的，因为JS的代码写的比较少，也写的比较简陋，并且大部分问题都是前人碰见过的，总之，感谢互联网！
