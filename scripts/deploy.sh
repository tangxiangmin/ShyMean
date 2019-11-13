#!/bin/bash

git pull origin master
npm i
# npm run build:server
npm run build:ssr

# pm2任务名称在package.json中start命令设置
pm2 reload blog
pm2 reload blog_ssr
