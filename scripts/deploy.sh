#!/bin/bash

git pull origin master
npm i
npm run build

# blog任务名称在package.json中start命令设置
pm2 reload blog
