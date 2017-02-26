---
title: JavaScript中构建对象
date: 2016-06-20 22:35:36
tags:
	- 面向对象
	- 原型
categories:
	- JavaScript
---
JS中的面向对象与C++中的面向对象有很大不同。由于不存在类的概念，在初学JS的面向对象时略感困惑。《JS高级程序设计中》关于这一块讲的十分精彩。先来整理一下关于JS创建对象的方法。
<!--more-->

## 对象字面量
可以使用对象字面量来创建一个对象。
```
    var bird = {
        name:"crow",
        age:3,
        fly:function(){
            alert("I'm "+this.name+", I'm flying "+this.age+" years!");
        }
        }
    bird.fly();
```
* 优点：直接明了，相当于只是创建了一个引用数据类型的变量；
* 缺点：只限于一个对象，当使用同一个接口创建多个对象时，会产生大量重复的代码；

## 工厂模式
可以创建一个函数，并在其中创建一个空对象，将需要的属性值作为参数赋给对象属性，并将获得值之后的属性返回。
```
    function createBird(name,age){
        var o = new Object();
        o.name = name;
        o.age = age;
        o.fly = function(){
            alert("I'm "+this.name+", I'm flying "+this.age+" years!");
        }
        return o;
        }
    var bird = createBird("crow",3);
    bird.fly();
```
* 优点：抽象了创建具体函数的过程，可以创建多个相似的对象；
* 缺点：无法知道对象的类型（只能是Object）。

## 构造函数
构造函数与工厂模式类似，只是在其外部采用new调用，在其内部采用this代替显式创建空对象。构造函数名称首字母一般大写。
```
    function Bird(name,age){
        this.name = name;
        this.age = age;
        this.fly = function(){
            alert("I'm "+this.name+", I'm flying "+this.age+" years!");
        }
    }
    var bird = new Bird("crow",3);
    bird.fly();
```
* 优点：可以识别实例对象的自定义类型（即构造函数名）。
* 缺点：所有的实例对象无法共享相同的属性和方法，造成内存的浪费。

## 原型模式
prototype是函数中一个非常重要的属性，接下来重点理清这个问题。
* 首先需要明白，无论什么时候，只要新建了一个函数，就会为该函数创建一个prototype属性，这个属性指向了函数的原型对象；
* 其次，JS中的所有对象都有原型对象， 而所有的原型对象都有一个constructor属性，这个属性是一个指向prototype属性所在函数的指针；因此Bird.prototype.constructor就指向了构造函数Bird本身。
* 当自定了一个构造函数时（使用new调用），这个构造函数的原型对象默认只会获取到constructor属性，并继承Object的属性和方法；
* 当使用该构造函数实例一个对象时，这个对象内部将包含一个指向其构造函数的原型对象的指针（__proto__或者[[prototype]]），需要注意的是这个属性是连接实例对象与其构造函数的原型对象，而不是连接实例对象与构造函数。

关于原型对象有几个比较重要的知识点，如下。
### 查询
* 当代码读取对象的某个属性时，会逐步搜索该属性名：
* 首先从实例对象本身开始，如果找到则返回；
* 如果没有找到，则搜索__proto__指针所指向的原型对象，如果找到则返回；
* 可以使用in操作符判断对象是否拥有该属性值（无论是自定义的还是从原型继承而来的）。

### 赋值
* 可以通过搜索查询原型对象中的值（包括属性和方法），却无法通过对象实例修改原型对象中的值；
* 当为实例对象添加了一个属性，如果原型对象中存在同名属性，则会被实例对象的属性所覆盖；
* 如果原型对象中不存在该同名属性，该属性也只是该实例对象所独有的，并不能被原型对象下的其他实例对象所共享；
* 在添加的属性之后又希望重新访问原型对象中同名属性的值，可以使用delete删除实例对象中覆盖的属性并恢复对于原型对象中属性的访问。
* 可以通过hasOwnProperty()方法检测属性是实例对象所独有的还是继承自原型对象的，返回true表示该属性为实例对象所独有。

### 简化原型对象
* 每次使用Bird.prototype.pro就显得十分麻烦，更常见的做法是采用一个包含所有属性和方法的对象字面量来重写整个原型对象，即Bird.prototype = {...}；
* 这么做相当于重写了这个prototype，并且其constructor属性会指向Object函数而不是自定义的Bird构造函数，解决这个问题的办法是显示的声明prototype的constructor属性值。

### 原型的动态性
* 由于对实例对象的属性查询是一个搜索过程，且每次查询都会执行该搜索过程，因此可以在程序中随时为原型对象增加属性和方法，并在之后的代码中实例对象中访问这些共享的属性和方法（即使这个实例对象先于新增属性而创建）；
* 尽管可以随时为原型添加属性和方法，并在修改之后可以被所有的实例对象所访问；但是如果重写整个原型对象（比如采用对象字面量赋值的方式），会切断前面创建的实例对象与原型对象之间的联系（他们是通过__proto__指针相关联的，而对象是引用数据类型，采用赋值会将原型对象重新指向了另一块堆内存，因此实例对象的__proto__属性仍指向先前的原型对象“所指的内存”，理解可能有误，请批评指正），而先前的实例对象，引用的仍然是最初的原型对象。
```
    function Bird(){
        Bird.prototype.name = "crow";
        Bird.prototype.age = 3;
        Bird.prototype.home = ["tree","grass"]
        Bird.prototype.fly = function(){
            alert("I'm "+this.name+", I'm flying "+this.age+" years!");
        }
    }
    var bird1 = new Bird();
    var bird2 = new Bird();
    bird1.fly();//crow
    bird2.name = "duck";
    bird2.fly();//duck

    bird1.home[0] = "appleTree"
    alert(bird2.home[0]);//appleTree
```

最后是使用原型模式的优缺点：
* 优点：所有实例对象都共享原型的全部属性及方法。
* 缺点：也是由于其共享的特点，对于基本数据类型而言还好，可以通过自定义属性的方法进行覆盖；而对于引用数据类型而言，在一个实例对象上对其进行修改，其结果同样会出现在另外一个实例对象上，违背了面向对象的封装原则。

## 构造函数与原型组合
采用构造函数定义各自的实例属性，采用原型定义方法与共享的属性。
```
    function Bird(name,age){
        this.name = name;
        this.age = age;
        this.home = ["tree","grass"]
    }
    Bird.prototype = {
        showhome:function(){
            alert(this.home);
        },
        fly:function(){
            alert("I'm "+this.name+", I'm flying "+this.age+" years!");
        }
    }

    var bird1 = new Bird("crow",3);
    var bird2 = new Bird("duck",5);
    bird1.fly();//crow
    bird2.name = "swan";
    bird2.fly();//duck

    bird1.home[0] = "appleTree"
    bird2.showhome();//tree,grass
```
这样，每个实例对象都会有自己独立的属性，并共享原型对象的方法和属性，最大程度节省了内存。
## 其他
### 寄生构造函数
与工厂模式类似，仅仅是封装创建对象的代码，但是又采用new调用该函数。书上建议在可以使用其他构造模式的情况下不要采用这种方法。
### 稳妥构造函数
所谓稳妥指没有公共属性，稳妥构造函数中对象的方法不引用this，因此无法通过其他方法访问该构造函数中的变量。也不建议使用。
## 最后
JS中创建对象虽然有多种模式，但是最常见的还是对象字面量创建以及组合构造函数与原型模式这两种方式来创建对象。原型是JS中需要深入掌握的一个概念，接下来的学习内容是大名鼎鼎的原型链继承。