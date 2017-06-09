ShyMean
===
之前的博客是基于Hexo生成静态页面，然后挂在github下面的。
后来打算将整个博客迁移到自己的虚拟主机上，方便在后台做一些事情（统计啥的），因此开始了博客的折腾。
* [博客链接](http://shymean.com)
* [开发记录](./doc/)

## 目录结构
```
shymean/ 
    |-APP/             接口
        |- Config
        |- Controller
        |- Middleware
        |- Model
        |- route.php
    |-Core/           PHP框架核心
        |- Common
        |- Lib
        |- Core.php
    |-Index/          vue-cli项目
        |- src        前端源码
        |- ...
    |-plugin/         一些开发插件
        |- hexo2mysql
        |- ...
    |-dist/           webpack输出目录
    |-docs/           开发记录
    |-index.php       入口文件
    |-...
```

## 版本记录

### V0.3.0
换了阿里云服务器，域名也已经备案了，因此尝试进一步更新。

### V0.2.0
由于之前改动比较频繁，项目十分散乱，现在决定使用`Vue-cli`重写相关部分，包括组件和样式等部分，同时准备学习`webpack`。

### V0.1.0
由于虚拟主机的限制，后端使用PHP响应请求及提供数据，前端使用JavaScript进行页面渲染和数据处理，前后端基本分离。

前端：

* 使用`Require.js`管理前端模块，使用`r.js`进行模块打包，使用`gulp`管理整个项目
* 使用了包括`Vue.js`,`Vue-router`,`Vue-resource`，基于Vue实现了包括数据分页，博文目录等多个组件
* 基本样式使用Hexo下的Next主题作为参考，使用Rem布局，使用BEM进行样式命名，并实现了响应式导航，动态按钮等UI组件
* 使用`maked.js`和`highlight.js`，在客户端对markdown文档转义及代码语法高亮。

后端:
* 封装了一个简易的MVC框架
* 实现了自定义路由，模型类，控制器类等

迁移：
由于需要将之前的Hexo博客文档迁移到数据库，因此编写了一个插件`hexo2mysql`，读取`_posts`下的全部markdown文档，获取相关的字段信息，拼接成Mysql语句，最后导入数据库。
