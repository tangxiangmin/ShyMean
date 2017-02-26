---
title: 使用Hexo
date: 2016-08-21 10:19:05
tags:
	- Hexo
categories:
	- 工具

---

Hexo是基于Node.js的静态博客框架，可以很快速地搭建个人博客。
今天把自己的博客整个搬到了Hexo，挂在github上，真是累死人了，准确的说是累并快乐着。改天抽空自己改主题吧，先用着Next的主题也是极好的...
<!-- more -->


## 配置环境
以下操作均在Windows10下进行。
* 需要安装Node.js环境，直接上官网下载即可，我使用的版本是V4.4.4稳定版。
* 需要安装Git环境，后面可以直接将博客挂在github上面

## 安装Hexo
新建一个文件夹（名称最好不要使用中文），进入文件夹并打开git bash，按顺序执行下列操作：
```
npm install -g hexo //安装Hexo
hexo init //初始化Hexo
//请耐心等待相关文件下载，当控制台出现下列信息说明安装成功
INFO Start blogging with Hexo
```
## 使用Hexo

### 生成静态页面
```
hexo generate
```

### 本地预览
首先开启本地服务器，默认端口号为4000
```
hexo server
```
然后在浏览器中输入 http://localhosr:4000/ 预览本地博客。

### 更换主题
Hexo支持多种主题，可以从github的众多项目中选择你自己喜欢的，然后将项目克隆到themes文件夹下
```
git clone https://github.com/iissnan/hexo-theme-yilia.git themes/nextTheme
```
然后修改主目录下的 **_config.yml** 文件中的 theme 属性值为刚才保存的主题文件夹名称 nextTheme 即可；

在切换主题之前，最好使用 __hexo clean__ 来清除Hexo的缓存，然后重新生成静态页面并发布;

关于相关主题的具体使用，建议查看其使用文档。

### 新建页面
每个主题所给定的导航栏可能不一样，比如现在我使用的Next主题，默认并未开启标签页面，此时可根据自己需要新建页面：
```
hexo new page "pageName" //新建页面
```
注意此时需要修改**主题配置文件**在导航栏开启页面的链接。
默认会生成一个index.md，可以将其删除之后新建index.html并将其修改成自己喜欢的风格

## 将Hexo部署到github上
部署之前，需要首先创建项目仓库，名字只能使用如下格式：
```
yourname.github.io //将yourname替换成你的github的名字
```
然后需要修改主目录下的_config.yml文件中的 deploy 属性值为下面格式：
```
deploy:
  type: git
  repository: git@github.com:tangxiangmin/tangxiangmin.github.io.git //改为自己的项目路径
  branch: master
```
然后发送部署命令
```
hexo deploy
```
待部署完成之后，在浏览器中输入 tangxiangmin.github.io 就可以看见整个博客了，然后就尽情的折腾去吧

## 进阶
### 几个快捷命令
```
hexo g ==  hexo generate
hexo d ==  hexo deploy
hexo s ==  hexo server
hexo n ==  hexo new
```

