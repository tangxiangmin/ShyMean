---
layout: page
---

这里整理了一些在编码生涯中编写的比较有趣的个人项目。

### 工具

* `Mock Server`，一个根据`mock`模板文件快速启动模拟数据服务器的命令行工具 [github](https://github.com/tangxiangmin/mock-server#readme)
* `oPic`，一个使用`electron`构建的快速将图片上传到七牛图床的应用 [github](https://github.com/tangxiangmin/oPic)
* `petty-spider`，使用`NodeJS`编写的爬虫工具，满足日常的爬取需求 [github](https://github.com/tangxiangmin/petty-spider)
* `web-skeleton-extension`，一个Chrome扩展程序，一键生成当前网页骨架屏 [github](https://github.com/tangxiangmin/web-skeleton-extension)
* `vite-plugin-vitepres-inline-sfc`，支持在markdown中编写内联的vue组件，就像这样 <Demo/> [github](https://github.com/tangxiangmin/vite-plugin-vitepres-inline-sfc)
* `vite-plugin-remote-module`，在`vite`开发项目中加载`http`远程模块 [github](https://github.com/tangxiangmin/vite-plugin-remote-module)

```vue {"component":true, "name":"Demo","lazy":true}
<template>
  <span class="bg-red-100 leading-20px text-12px px-4px py-5px rounded-6px cursor-pointer text-[#333]" @click="onClick">我是一个组件，可以被点击</span>
</template>
<script lang="ts" setup>
  function onClick(){
    alert("hello from inline vue component")
  }
</script>
```

### 项目

* `NeZha`，一个`mini React`框架 [github](https://github.com/tangxiangmin/NeZha)
* `vue-page-builder`，一个使用Vue3、Eggjs开发的、支持远程模块的低代码项目，包含前后端工程 [github](https://github.com/tangxiangmin/vue-page-builder)

### 游戏
* 合成大西瓜，2021年初比较火热的**合成大西瓜**`cocos`复刻版 [github](https://github.com/tangxiangmin/cocos-big-watermelon)
