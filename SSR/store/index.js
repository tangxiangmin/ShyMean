/**
 * Created by admin on 2017/7/16.
 */
import Vuex from 'vuex'


import state from "./state"
import mutations from "./mutations"

const store = () => new Vuex.Store({
    state,
    mutations
})

export default store