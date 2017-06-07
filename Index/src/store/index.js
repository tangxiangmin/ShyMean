/**
 * Created by admin on 2017/3/4.
 */
import Vue from 'vue';
import Vuex from 'vuex'

import mutations from './mutations'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        test: "this is test",
        catalogue: [],
        isLoading: false,
        asideTabItems:[{
            slot:'website',
            title:'站点资料'
        }],
        // 缓存置顶文章
        stickiedArticles: [],
        // 缓存标签和分类
        tags: [],
        categories: [],

    },
    mutations,
});

export default store;
