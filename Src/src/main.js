// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Blog from './Blog'
import router from './router'
import store from './store'

Vue.config.productionTip = false;

import "./assets/fonts/iconfont.css";
import "./style/blog.scss";

let blog = new Vue({
    el: '#blog',
    components: {Blog},
    router,
    store,
    template: '<Blog/>',
});

// 请求拦截器
Vue.http.interceptors.push((request, next) => {

    blog.$store.commit("setLoading",true);
    next((response) => {
        blog.$store.commit("setLoading",false);
        return response
    });
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
