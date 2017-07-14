import "@/assets/fonts/iconfont.css";
import "@/style/blog.scss";

import Vue from 'vue'
import Blog from '@/Blog'

import router from '@/router'
import store from '@/store'

// 请求拦截器
import "@/api"

// // axios下这个Bug貌似一直没有修复，下面配置无法生效
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

Vue.config.productionTip = false;

let blog = new Vue({
    el: '#blog',
    components: { Blog },
    template: '<Blog/>',
    router,
    store,
});

changyan.api.config({
    appid: 'cyt6VyDws',
    conf: 'prod_0c399ea5f3cc9a3cae8a9fdf7820aabb'
});

// 路由
router.beforeEach((to, from, next) => {
    let asideTabItems = [{
        slot:'website',
        title:'站点资料'
    }];

    if (to.name == 'articleDetail'){
        asideTabItems.unshift({
            slot:"catalogue",
            title:"文章目录"
        });
    }

    blog.$store.commit("setAsideTabItems",asideTabItems);

    next();
});
