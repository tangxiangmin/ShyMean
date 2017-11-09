## 样式表

配置scss编译，[文档地址](https://nuxtjs.org/api/configuration-css)

```
css: [
    '~assets/css/main.css',
    {
        src: '~assets/scss/blog.scss',
        lang: "scss"
    }
],
```

## 接口

接口统一以`/api`开头，因为前端和后台都公用的`3000`接口，所以使用`api`前缀区分后台数据接口和前端路由，这里坑了两次



## 环境

* 后台的`hotreload`有时候会延迟，不知道是不是我的电脑性能不足的问题，有时候记得检测编译是否同步了
* 使用`webstrome`的时候，修改文件会自动检索相应的文件并同时修改，但是这里经常出现文件修改错误的情况，建议关闭这个功能，不然很坑的，问题死活找不到的时候建议去查看相关的配置文件是否被修改了

## 部署

### node

由于后台使用了`backpack`，因此需要`nodeV6.0`以上的版本，之前的ubuntu下版本太低了需要重新升级，但是发现使用`n stable`升级无效，最后重新卸载安装node然后就可以用了

记得重新配置npm镜像，否则node-sass那里安装会出错

```
npm config set registry http://registry.npm.taobao.org/
```

### nginx

#### 安装

```
# 安装
sudo apt-get install nginx 

# 修改默认端口号 80->88 ，防止与apache2冲突
sudo vim /etc/nginx/sites-available/default

# 启动nginx
sudo service nginx start
# 查看状态，如果显示not running则可能需要关闭apache
sudo service nginx status
```

然后在浏览器访问`localhost:88`就可以看见ngnix欢迎界面了，由于我这边开的是vmware虚拟机，也可以通过ip地址访问虚拟主机

```
# 获取虚拟主机ip
ifconfig -a
```

由于需要频繁修改配置，记得在修改之后重启服务器

```
nginx -s reload
```

#### 反向代理

nuxt默认是在3000的端口，因此需要设定反向代理。找到nginx的安装目录

```
cd /etc/nginx/sites-enabled
vim default
```

然后添加一项`server`配置即可

```
server {
        listen 80;
        server_name www.ssr.com;
        root shymean-ssr;
        index index.html index.htm;

        location / {
                proxy_pass http://127.0.0.1:3000;
        }
}


```

因为是测试，所以需要修改windows的hosts文件

```
192.168.1.6     www.ssr.com
```



### 项目编译

将开发的项目包相关资源拷贝到服务器上

```
# 安装时最好使用root账户，否则node-sass会报错
npm i

# 编译
npm run build

# 启动服务器
npm run start
```

现在在window访问虚拟机上的www.ssr.com即可，大功告成

### 阿里云

万万没想到阿里云上面安装了一个node什么鬼的软件，然后apt-get一直只能安装v0.10的nodejs版本，折腾半天最后只能通过源码安装，最后发现居然没有npm，没办法又重新使用curl安装，最后将npm升级到最新版本，一路趟坑真是刺激



### 守护进程

在开发时用`npm run dev`啥的就行了，但是到服务器上面肯定需要持续运行进程，查到了使用`forever`来管理用户进程，但是遇见官方的demo是

```
forever start app.js
```

由于nuxt的`npm run start`命令配置了`cross-env`和`NODE_ENV`等环境变量，虽然使用`--help`命令找到了配置环境参数的配置`-c`，但仍旧不能使用上面的方法，百度查了半天没找到解决办法，最后用谷歌`forever start npm scripts`第一条搜索结果就找到了[答案](https://github.com/foreverjs/forever/issues/540)

```
forever start -c "npm run start" ./
```

呃~论科学上网的重要性



### mysql

之前远程连接mysql，部署到线上替换成localhost，密码记得更换哦~

## 小结

至此，整个项目部署就基本完成了