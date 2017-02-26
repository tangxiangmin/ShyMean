---
title: JS面向对象之原型继承
date: 2016-06-27 22:43:33
tags:
	- 面向对象
	- 原型
categories:
	- JavaScript
---
前面理清了JS面向对象中的构建对象，其中谈论到了原型的概念，以及使用组合构造函数和原型模式的方法来创建对象。接下来总结一下关于JS中继承的问题，继承可分为接口继承（只继承方法签名）和实现继承（继承具体方法）两种。
<!--more-->
由于JS中的变量是松散类型，且JS中的函数不限制参数个数，参数类型和参数顺序，因此函数并没有函数签名，因此JS只支持实现继承，且主要依靠原型链来实现的。

## 原型链继承
### 原型链
首先来理一理原型链。（接下来的语言十分啰嗦，只是为了让自己理清整个思路，敬请谅解。）
从原型模式构建对象可知，每个构造函数都有一个原型对象，而原型对象有一个属性constructor指向该构造函数，且每个构造函数的实例对象都有一个指向原型对象的指针（__proto__），所有实例对象共享原型对象的方法和属性（默认情况下原型对象只有constructor属性，根据需求自行添加），那么问题来了：如果让构造函数A的原型对象等于另外一个构造函数B的实例时，会发生什么情况呢？
答案是显而易见的：构造函数A的原型对象（也就是构造函数B的实例对象）含有一个指向构造函数B的原型对象的指针（__proto__），且构造函数A的所有实例对象都可以访问构造函数B的原型对象所具有的属性和方法。如此层层递进，则构成了实例与原型的链条，这就是原型链的基本概念。下面我用一个图来简单的描述这个过程。
![原形链](uploads/object.png)

### 实现原型链继承
实现原型链有一种十分简单的方式，直接显式地将父构造函数的实例对象赋值给子构造函数的原型对象（与其说赋值，不如说将子构造函数的原型对象重新指向新的父实例对象），用来替换其原本的原型对象（所有函数的原型对象都是Object的实例）。
```
    function f(name){
        this.name = name;
    }
    f.prototype = {
        say:function(){
            alert(this.name);
        }
    }
    function s(age){
        this.age = age;
    }
    s.prototype = new f("tang");//替换子构造函数的原型对象
    s.prototype.show = function(){
        alert(this.age);
    }
    var t = new s(18);
    t.say();//使用father原型对象的方法
    t.show();//使用son原型对象的方法
```
通过原型链可以实现子实例对象访问父原型对象的属性和方法，但是有时候需要覆盖某个方法，或者是为子对象（子实例对象或者子原型对象）添加某个方法，直接在子对象上添加或重写属性和方法即可，惟一需要注意的地方是这些代码一定要放在“使用父实例对象替换子原型对象”的操作之后，否则在添加方法之前原型链根本就没有形成，而形成原理链的赋值过程会重写子构造函数的原型对象，导致之前所添加或修改的方法无法生效。
```
    s.prototype.show = function(){
        alert(this.age);
    }
    s.prototype = new f("tang");
    var t = new s(18);
    t.say();
    t.show();//由于子原型对象被后替换，因此show方法无法被使用，这儿会报错
```
同样的原因，在通过原型链实现继承的时候，无法使用对象字面量来创建原型，这样也会重写整个原型链，导致之前的继承原型链被破坏。
### 问题
使用原型链是JS中实现继承的主要手段，但是仍然存在一些问题：
* 由于是使用实例作为子原型对象，则该实例中的引用数据会被其子实例对象共享（即使该引用数据在父实例对象之间是各自独有的），无法达到封装的要求；
* 也是由于是使用实例作为子原型对象，则该父实例对象在创建过程中已经向其构造函数中传递参数，生成的父实例对象的值已经固定，在使用子构造函数创建子实例对象的时候，再也无法通过向父构造函数传参的方式改变子原型对象（父实例对象）的属性。
```
    function f(){
        this.firends = ["Jack","Rose"];
    }
    function s(){
    }
    s.prototype = new f();

    var t1 = new s();
    alert(t1.firends);//Jack,Rose
    var t2 = new s();
    t2.firends.pop();

    alert(t1.firends);//Jack
    alert(t2.firends);//Jack
```

## 借用构造函数继承
解决上述问题采用一种叫做“借用构造函数继承”的技术（也叫做经典继承），即在子构造函数的内部使用call或者apply调用父构造函数，相当于将创建父实例对象的时间延迟到创建子实例对象的时候，并在创建每个子实例对象的时候都会调用父构造函数，且可以向父构造函数传入参数。
但是采用这种经典继承的方法无法避免的问题就是在父构造函数中定义的方法在每个子实例对象都有一份副本。
```
    function f(){
        this.firends = ["Jack","Rose"]
        this.say = function(){
            alert(this.firends);
        }
    }
    function s(){
        f.call(this,name);
    }
    var t1 = new s();

    var t2 = new s();
    t2.firends.pop();

    alert(t1.say == t2.say);//false
    alert(t1.firends);//Jack,Rose
    alert(t2.firends);//Jack
```
## 组合继承
由于经典继承的一些问题，在实际中最常用的继承方法是将原型链和经典继承方法结合起来，使用原型链实现对原型属性和方法的继承，使用构造函数来实现对实例属性的继承，既保证了原型上方法的公用，又保证了每个实例都有它自己的属性。
```
    function f(name){
        this.name = name
        this.firends = ["Jack","Rose"]
    }
    f.prototype.say = function(){
        alert(this.name);
    }
    function s(name,age){
        f.call(this,name);
        this.age = age;
    }
    s.prototype = new f();

    var t1 = new s("tang",1);

    var t2 = new s("zhang",2);
    t2.firends.pop();

    alert(t1.say == t2.say);//true
    alert(t1.firends);//Jack,Rose
    alert(t2.firends);//Jack
```
组合继承避免了原型链继承和构造函数继承的缺点，融合了他们的优点，是最常用的继承手段。

## 其他
此外还有原型式继承和寄生式继承，目前只是稍微地了解了一下，因此不敢妄下结论。