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
import msgBoard from '@/pages/MsgBoard';
import book from '@/pages/Book';
import about from '@/pages/about';
import lab from '@/pages/lab';



export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/index/1',
        },
        {
            path: '/index/:active',
            name: 'index',
            component: blogIndex
        },{
            path: '/tags',
            component: tags
        },{
            path: '/articleList/:type/:name/:active',
            name: 'articleList',
            component: articleList
        },{
            path: '/title/:title',
            name: 'articleDetail',
            component: articleDetail
        },{
            path: '/msgboard',
            component: msgBoard
        },{
            path: '/book',
            component: book
        },{
            path: '/about',
            component: about
        },{
            path: '/lab',
            component: lab
        }
    ]
})
