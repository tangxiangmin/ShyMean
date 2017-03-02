import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Index from '@/components/Index'

Vue.use(VueResource);
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index
        },
    ]
})
