shymean
===

个人博客[www.shymean.com](http://www.shymean.com)

## 相关指令

### 准备步骤

* 需要软连接博客的目录，或者创建`views/article`并在该文件夹下面管理博客markdown文章

### 初始化相关数据

```
npm run init
```
该操作会在根目录下创建`data/`文件夹，包含启动服务需要的原始数据，如`pathRewrites`、`archive`、`meta`等数据。

### 开发
```
npm run dev
```

### 打包
```
npm run build
```

### 部署

初期 暂时手动部署到cloudflare上面

后续由于构建文件数量超过1000个，需要使用wrangler 命令行上传

安装wrangler并登录
```
npm i wrangler -g
wrangler login
```
后续部署时使用
```
npm run deploy
```

