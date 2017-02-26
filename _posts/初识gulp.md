---
title: 初识gulp
date: 2016-09-21 22:46:41
tags:
	- gulp
	- 工程化
categories:
	- 工具
---

前端技术日新月异，现在在工作中也尝试着使用一些工具简化业务开发，比如Koala来编译SCSS，使用图好快来压缩图片等。这些工具十分方便，但是也存在一个问题：面对不同的需求需要尝试使用不同的工具，而各个工具之间却没有任何之间联系，相当于我们仍然要手动管理最基本的流程，这样就不可避免地会出现错误。碰巧最近被一个规模比较大的项目搞得心烦意乱（前期没有进行管理规划），痛定思过，开始捣鼓gulp。

<!--more-->

文章参考：
* [gulpjs](https://github.com/gulpjs/gulp)
* [gulp中文网](http://www.gulpjs.com.cn)

## 基础

### 安装
首先需要安装NodeJs环境，某些插件可能还需要其他环境（比如compass需要ruby），然后全局安装gulp，最后在项目目录下安装位本地依赖模块。

```
// 全局安装
npm install --global gulp

// 项目目录安装,首先新建一个package.json
npm init

// 安装本地依赖
npm gulp --save-dev

// 最后安装实际需求的相关插件
npm install gulp-livereload --save-dev
```

### 配置任务
安装成功之后，需要在项目文件夹根目录下创建一个名为`gulpfile.js`的文件，这个文件可以理解为gulp的配置文件，我们需要这个文件中引入相关插件，并指定任务需求

```javascript
var gulp = require("gulp");

// 创建一个hello gulp的任务
gulp.task('default', function() {
   console.log("hello gulp!");
});

```

在项目文件夹下打开控制台（windows下直接`shift + 右键`），输入`gulp default`，就会执行刚才的default任务，由于是default，因此该任务不需要指定任务名，直接敲入gulp也会执行。

### 简单思考
工作中简单反复的机械工作，比如编译SCSS，压缩文件，刷新浏览器等等，这些工作可以抽象成下面步骤让计算机自动处理：
* 监听文件的变化用来触发任务处理函数；
* 获取对应文件的内容，然后进行相关处理；或者只是简单执行某些逻辑操作；
* 如果需要的话，将处理后的文件输出到某个文件；

举个实例，比如我们需要将某些文件的内容拷贝到同一个文件下。如果需要挨个打开文件去手动复制粘贴，这肯定不是我们这些懒人的做法，因此我们可以用node写一个程序，读取相应文件夹下的文件内容，然后再依次追加到输出文件中。
gulp正是用来帮助我们实现这些事情的，更好的是，gulp本身提供的API和数量庞大的插件，可以很轻松地帮助我们完成工作，且不用关注具体的实现。


## 语法
gulp只有5个API：task,src,dest,watch和pipe，为我们提供了文件操作和观察的接口，通过组合使用这几个接口，我们基本上就可以实现大部分需求了。
但是，在学习这些接口之前，让我们先了解glob参数类型，这是gulp用来匹配我们需要处理的文件的手段。

### glob
glob实际上就是一种精简版的正则表达式，详情见[文档](https://github.com/isaacs/node-glob)，下面是基本的语法：
* `*`表示匹配或多个字符
* `?`表示匹配一个字符
* `*.*`匹配如：[hello.txt,123.doc];`?.*`匹配如：[1.css,2.js];`*.gif`匹配如：[x1.gif,2.gif]
* `[...]`匹配括号内的字符，如果其中第一个字符是`!`或者`^`则表示取反，即不匹配括号内的字符
* `!(pattern|pattern|pattern)` 匹配不包括分组中的表达式
* `?(pattern|pattern|pattern)`匹配0次或一次
* `+(pattern|pattern|pattern)`匹配一次或多次
* `*(a|b|c)`匹配0次或多次
* `@(pattern|pat*|pat?erN)`完全匹配

哈，确实像是精简版本的正则表达式，在gulp中，使用glob格式的字符串用来匹配相应的文件或文件夹的路径，这是整个自动化的基础。

### API
__gulp.src(globs[, options])__
`gulp.src('test/*.md')`，第一个参数接受一个golb模式的字符串或者数组，用于指定文件路径，并根据这个路径输出相应文件流（官方文档中成为stream），一般地会将这个文档数据流传递给其他插件进行处理（这个过程被称为pipe，跟前面的stream相呼应哦）。


__gulp.pipe()__
这个方法的参数接收某个插件，并且把gulp.src的输出作为该参数插件的输入，可以进行链式调用。
```javascript
// minify如名所示，是一个压缩插件
gulp.src(['1.md','2.md']).pipe(minify())
```

__gulp.dest(path[, options])__
我们通过dest方法来接收相关插件进行处理后的新数据流，这个方法的参数表示匹配一个或多个文件夹（没错，可以是多个文件夹，且均是相对于gulpfile的相对路径，可以通过第二个参数的cwd属性配置），并将数据输出到这些文件夹下面，如果某文件夹不存在，将会自动创建它。
同理，关于文档流的步骤，我们均可以使用链式调用来书写。
```javascript
gulp.src('test/1.md')
	.pipe(plugin1())
    .pipe(plugin2())
    .dest('build');
```

__gulp.task(name[, deps], fn)__
用来注册一个任务。这里的任务指的是我们需要完成的某些特定需求。一个gulpfile文件中可以注册多个任务：
* 第一个参数是任务的名字，如果需要在命令行中运行这些任务，则不要在名字中使用空格；此外前面提到，gulp的默认任务名是default。
* 第二个参数是一个包含任务列表的数组，这些任务会在当前任务运行之前完成（为了达到这个目的则必须确保所依赖的任务列表中的任务都使用了正确的异步执行方式：使用一个 callback，或者返回一个 promise 或 stream）。
* 第三个任务是一个回调函数，该函数定义任务所要执行的一些操作

### gulp.watch()
监视文件，并且可以在文件发生改动的时候(比如使用了`ctrl + s`保存文件)做一些事情（比如在保存了scss文件之后立即编译成css文件），在文件变动之后可以执行一个或多个任务
```javascript
gulp.watch(glob[, opts], tasks)
```
或者执行某个回调函数
```javascript
gulp.watch(glob[, opts, cb])
```
其中，该回调函数会被传入一个名为 event 的对象。这个对象描述了所监控到的变动，如果需要的话，可以根据事件对象的属性做对应的处理：
* event.type 发生的变动的类型：added, changed 或者 deleted。
* event.path 触发了该事件的文件的路径。

## 插件
最后在这里整理了常用的插件。

### livereload
livereload可以在不使用刷新浏览器的情况下即时预览页面结构和样式改动，显著延长F5键的寿命。这个插件需要配合谷歌浏览器的插件livereload使用，直接在谷歌应用商店搜索安装即可。
```javascript
var livereload = require('gulp-livereload');
gulp.task('watch', function() {
	#旧版本的var server = livereload()已经失效
    livereload.listen();
    #css/**/*.* 的意思是 css 文件夹下的 任何文件夹 的 任何文件 
    #也可以写成数组的形式
    gulp.watch('css/**/*.*', function(file) {
        livereload.changed(file.path);
    });
});
```




