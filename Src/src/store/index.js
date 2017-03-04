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
    },
    mutations,
});

export default store;
