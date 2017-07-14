/**
 * Created by admin on 2017/3/4.
 */
import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex);

import mutations from './mutations'
import state from  "./state"

export default new Vuex.Store({
    state,
    mutations,
});
