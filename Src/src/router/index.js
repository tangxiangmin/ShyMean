import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(Router);
Vue.use(VueResource);

Vue.http.options.emulateJSON = true;
Vue.http.options.emulateHTTP = true;


import blogIndex from '@/pages/Index';
import articleDetail from '@/pages/Detail';
import tags from '@/pages/Tags';
import articleList from '@/pages/Archives';


export default new Router({
    routes: [
        // {
        //     path: '/',
        //     name: 'index',
        //     component: blogIndex
        // },
        {
            path: '/index/:active',
            name: 'index',
            component: blogIndex
        },{
            path: '/articleDetail/:id',
            name: 'articleDetail',
            component: articleDetail
        },{
            path: '/tags',
            component: tags
        },{
            path: '/articleList/:type/:name/:active',
            name: 'articleList',
            component: articleList
        }
    ]
})
