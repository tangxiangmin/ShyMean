---
layout: page
---

这里记录了`shymean.com`博客的历史版本迭代，源码托管在[github](https://github.com/tangxiangmin/ShyMean)上。

版本时间依据 Git 标签、版本提交及开发日志还原，均为提交作者时间（UTC+8）。早期版本没有完整的 Release 记录，以下时间表示目前可确认的版本节点。

## 0.9 

版本时间：2024-05-06 11:42:44（[提交 `aaf485d`](https://github.com/tangxiangmin/ShyMean/commit/aaf485d)，0.9.0 重构提交）

回归静态博客，使用`VitePress`构建`markdown first`的博客，按文件夹组织文章分类，使用`cloudfare`部署

[开发日志](/article/博客v0.9迭代记录)

## 0.8

版本时间：2022-07-14 16:24:14（[提交 `0b537b8`](https://github.com/tangxiangmin/ShyMean/commit/0b537b8)，0.8.0 重构提交）

写了一个`React`与`Vue`语法结合的库[react-vue](https://github.com/tangxiangmin/react-vue)，搭配`vite-ssr`重构博客，实现`store`、`router`等核心库，使用`Docker`部署

[开发日志](/article/博客v0.8迭代记录)

## 0.7

版本时间：2020-01-10 21:32:59（[提交 `e558bb1`](https://github.com/tangxiangmin/ShyMean/commit/e558bb1)，UI 更新上线）

写了一个`mini React`库 [NeZha](https://github.com/tangxiangmin/NeZha)重构博客，实现SSR、Nax、NeZhaRouter等核心能力

[开发日志](/article/将博客重构为SSR渲染)

## 0.6

版本时间：2019-05-05 22:10:34（[提交 `f86b889`](https://github.com/tangxiangmin/ShyMean/commit/f86b889)，版本页首次列出 0.6.0，并完成自动部署）

使用`TypeScript`重构服务端主要模块，重写`model`层，并增加Webhook自动部署

[开发日志](/article/博客v0.6迭代记录)

## 0.5

版本时间：2019-01-15 14:06:57（[提交 `f5f6fd7`](https://github.com/tangxiangmin/ShyMean/commit/f5f6fd7)，加入 0.5.0 开发日志）

重构了静态资源开发环境，优化打包部署流程，前后端同构渲染解耦

[开发日志](/article/优化博客开发环境和页面响应)

## 0.4

版本时间：2017-11-07 23:21:27（[提交 `c2bf03a`](https://github.com/tangxiangmin/ShyMean/commit/c2bf03a)，0.4.0 Koa 重构提交）

从SSR迁移到koa同构渲染，提升用户体验和页面性能，优化`SEO`

[开发日志](/article/博客同构渲染实践)

## 0.3

版本时间：2017-07-16 23:52:15（[提交 `237d386`](https://github.com/tangxiangmin/ShyMean/commit/237d386)，完成向 Nuxt SSR 迁移）

换了阿里云服务器，域名也已经备案了，因此尝试进一步更新，使用`Vue SSR`完成服务端渲染。

[开发日志](/article/博客SSR实践总结)

## 0.2

版本时间：2017-07-14 23:52:16（[标签 `V0.2.0`](https://github.com/tangxiangmin/ShyMean/releases/tag/V0.2.0)，对应提交 `294ed64`）

由于之前改动比较频繁，项目十分散乱，现在决定使用`Vue-cli`重写项目，包括组件和样式等部分，同时学习`webpack`。

[开发日志](/article/博客v0.2迭代记录)

## 0.1

版本时间：2017-02-27 11:42:05（[标签 `V0.1.0`](https://github.com/tangxiangmin/ShyMean/releases/tag/V0.1.0)，对应提交 `266fd46`）

后端使用`PHP`响应请求及提供数据，前端使用`RequireJS`处理`Vue`模块进行页面渲染和数据处理，前后端基本分离。

[开发日志](/article/博客v0.1迭代记录)
