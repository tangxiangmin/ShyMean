---
title: 初识Vue
date: 2016-11-04 20:42:29
tags:
	- vue
categories:
	- JavaScript
---

大约两个月前其实就已经去尝试学习了Vue(实际上就是看了看文档，云里雾里不知道什么意思)，最近在使用原生PHP后端开发，完成第一个留言板的小项目之后着实被混杂的PHP和HTML代码给恶心到了，开始折腾如何分离代码。后来在论坛上看见一位前辈说初级的话不用去折腾什么页面静态化smarty之类的，使用include就够了，PHP本身就自带模板标签，那么怎么解决数据遍历的问题呢？突然灵机一动，想到了Vue（暴殄天物，让唾沫来淹死我吧...）下面重新过一遍文档（貌似现在是V2.0了）。
<!--more-->
Vue跟jQuery直接操作数据库不同，他是直接操作数据来控制视图的，比如在jQuery中删除一个节点，使用remove()方法，而Vue删除一个遍历的节点，是找到对应的数组数据并根据节点的索引值使用数组原生的splice()方法，因此学习Vue，务必抛弃jQuery的思维方式...牢记“一切以数据为中心”的思想来学习Vue(MDZZ，这是我瞎掰的。)
## 渲染模板
Vue内置了一些十分方便的指令，用来处理数据的输出
### 分支
"v-if"主要用来控制元素是否显示在页面中，这里的“显示”不是简单的"display:none"（显示隐藏DOM元素可以使用v-show指令），而是真正意义上的插入/删除DOM节点，当指令v-if="exp"中的表达式exp的结果为假，则会将DOM节点删除。此外，还可以为v-if添加一个v-else模块。
```
	<div id="t1"  v-if="flag"></div>

    var t1 = new Vue({
        el:"#t1",
        data:{
            flag:true //设置为false则元素不会加入DOM树中
        }
    });
```


### 遍历
"v-for"主要用来遍历数组数据并批量生成节点。类似于for...in的功能。注意第二个参数index是对应元素的索引值，从0开始，在某些事件中需要操作对应元素的时候，应当使用该索引值操作员数据数组，这在篇头已经提到过。此外单条元素可带多个属性（比如数据库的元素，而现在PHP所需要做的就是拿出数据库的数据，然后echo赋值就可以了，简直爽!）
另外，在遍历的时候也可以为该条元素加上"v-if"判断，跟在页面上写了一个完整的for循环实现的功能完全没有区别，真是太神奇了。
```
     <div id="t2">
        <ul>
            <li v-for="(msg,index) in msgs" v-if="msg.flag">
                {{ msg.word }} --- {{index}}
            </li>
        </ul>
    </div>
    var t2 = new Vue({
        el: '#t2',
        data: {
            msgs: [{
                word: 'msg1',
                flag: true
            }, {
                word: 'msg2'
            }, {
                word: 'msg3'
            }]
        }
    })
```
## 数据解析
Vue中基本都是围绕数据进行操作，使用双大括号来处理数据，在双大括号中（这种语法叫做mustache）的内容会被当作JS表达式被解析，（注意只能是表达式而不是语句），此外还可以对表达式做进一步的处理
### 过滤器
表达式可以自定义一个过滤器（可以参考PHP中的date()格式化函数，将前面的表达式作为参数传递给过滤器并进行处理输出），Vue的过滤器语法采用的是"|"管道符，所有过滤器在构造函数参数的filters属性中定义。
由于过滤器实际上是一个函数，因此可以带上参数，但是，由于默认的第一个参数实际上是管道符前面的JS表达式，因此过滤器函数带的第一个参数是在该函数调用的第二个参数，不妨打印过滤器函数的arguments查看一下。
最后，多个过滤器可以连续使用管道符"|"进行串联。
```
    <div id="t2">
        {{num}}
        <br>
        {{num | mulTen}}
    </div>
    var t2 = new Vue({
        el: "#t2",
        data: {
            num: 10
        },
        filters: {
            mulTen: function(val) {
                return val * 10;
            }
        }
    })
```

### 修饰符
在指定绑定的时候可以使用修饰符来限定绑定的形式，使用"."修饰符，常见的修饰符有".prevent"等
```
v-on:click.prevent
```

### 计算属性
尽管可以在双大括号中进行表达式计算并输出正确的结果，但是如果逻辑比较复杂，则使用计算属性是一个更好的选择，在"computed"属性中定义相关的计算属性。
```
    <div id="t3">
        before computed: {{msg}}
        <br>
        after computed: {{msgSplit}}
    </div>

    var t3 = new Vue({
        el:"#t3",
        data:{
            msg:"test"
        },
        computed:{
            msgSplit:function(){
                return this.msg.split("").join("-").toString();
            }
        }
    })
```
可以看见，实际上也可以在methods中定义相关的方法，并在双大括号中调用方法并得到同样的效果。然而他们之间最大的区别在于："计算属性是基于它的依赖缓存，只有在它的相关依赖发生改变时才会重新取值"；然而每当重新渲染的时候，method 调用总会执行函数且返回同样的结果。
使用缓存在某个需要十分庞大的遍历和计算时特别有效。

### 观察属性
在有些时候需要监控某个数据的变化并做出处理时，可以使用观察"watch"，当wathc对象中的某个属性发生变化时就会调用对应的处理函数，观察者最主要的目的是用来观察数据的变化，实际的处理也可以放在methods中。
```
    <div id="t4">
        <p>{{msg}}</p>
        <input type="text" v-model="msg">
    </div>
    var t4 = new Vue({
        el:"#t4",
        data:{
            msg:"test"
        },
        watch:{
            msg:function(){
                console.log("change:"+this.msg);
            }
        }
    })
```

## 绑定属性
首先必须抛弃jQuery操作DOM节点的思维方式，Vue为元素绑定属性采用了完全不同的方法。
### 基础
"v-bind"为DOM节点设置属性，类似于attr的效果，除了为节点本身的属性进行设置（比如title,class等），也可以设置自定义属性。
由于绑定属性使用十分频繁，因此可以使用简写":name"来绑定对应属性。
需要注意的是，在指令的赋值实际上是会在所属 Vue 实例的数据作用域下作为 JavaScript 表达式被解析，而非一个单纯的字符串中（我想到的是eval()函数，然而内部实现是什么样子的呢？待日后深究）。
比如下面的例子，将元素的title属性设置的值是msg变量所对应的字符串，而不是'msg'，如果不定义msg变量（在data中定义），就会报错；而如果将代码改写成v-bind:title="'msg'"的话，就相当于将字符串'msg'赋给元素的title属性，当然，单引号和双引号是可以互换的。

```
    <div id="t3">
        <div v-bind:title="msg">
            t3
        </div>
        <div :title="msg">
            t3
        </div>
    </div>

    var t3 = new Vue({
        el:"#t3",
        data:{
            msg:"test title"
        }
    });
```

### 类名与样式
如前面所提到的，可以是用v-bind:class/style=""来绑定类名或者行内样式。由于样式是页面中十分重要的部分，因此Vue对这个部分也有增强。
#### 类名
首先可以给v-bind:class绑定一个对象{active:isAcitve}，表示只有当isActive为真时才将active类绑定在元素上，当isActive变化时，会动态切换类名，多个类名只需要在对象上添加对应的键名即可。可以绑定返回对象的计算属性，十分方便的控制元素的类名。
也可以对v-bind:class绑定一个数组，指明多个类名，数组的元素也可以是对象，用来切换类名的存在与否，十分方便。
#### 行内样式
至于行内样式，先在data中声明一个样式对象，再将样式对象绑定到对应的v-bind:style上是一个更好的选择，通常结合返回对象的计算属性使用，用来为元素添加特定的行内样式。
```
data:{
	styleObj:{
    	color:'red',
        font-size: '12px'
    }
}
```



### 数据双向绑定
在表单输入和应用状态的即时改变中也可以同时改变数据（可以理解为表单为数据源），使用"v-model"指令来实现，效果类似于监听了输入框的“oninput”事件（实现的原理难道也是？肯定不是啦）
```
    <div id="t5">
        <p>{{msg}}</p>
        <input type="text" v-model="msg">
    </div>
    var t5 = new Vue({
        el:"#t5",
        data:{
            msg:"placeholder"
        }
    });
```


### 事件处理
事件是DOM中非常重要的部分，在Vue中使用"v-on:事件名"来注册事件处理函数，跟原生的"onclick"非常相似，但是，注册的事件的作用域是当前元素而非全局对象。因此，如果想要在引号中使用onclick="alert(1)"这样的效果时，如果没有在methods属性中声明对应的alert方法，会报方法未定义的错误，这里需要掌握的就是Vue中的作用域（都是限制在对应的new Vue对象中？）。
此外，关于事件绑定还可以使用v-on的简写简写"@click"，
```
    <div id="t4" v-on:click="clickHandle">t4</div>
    var t4 = new Vue({
        el:"#t4",
        data:{
            // msg:"test title"
        },
        methods:{
            clickHandle:function(){
                console.log("click");
            }
        }

    });
```


## 组件系统
我曾经花了很长一段时间来思考CSS选择器命名和样式重用（当然现在也还没有理清楚）。实际上Vue的组件系统可以让我们使用独立的小组件来构建整个项目，就跟搭积木一样，最重要的是“积木”是可以重用的！

### 组件
根据定义，一个组件实际上就是一个实例化的Vue对象，通过配置template属性定义组件的HTML结构，配置props属性将父元素中的数据传递给子组件（这里需要注意的是必须同时在页面的组件上使用v-bind:name = "value"的方式显式绑定数据）
```
    <div id="t1">
        <ul>
            <cpt-1></cpt-1>
        </ul>
        <cpt-2></cpt-2>
    </div>
	// 注册组件
    Vue.component('cpt-1',{
        template:'<li>this is li</li>'
    })
    Vue.component('cpt-2',{
        props:['msg'],
        template:'<p>{{msg}}</p>'
    })

    var t1 = new Vue({
        el:"#t1",
        data:{
            msg:"this is a message in p!"
        }
    })
```

