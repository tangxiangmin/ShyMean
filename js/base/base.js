/**
 * 加载基础文件
 */

require.config({
    baseUrl:'/js/',
    paths:{
        'vue':'lib/vue',
        'vue-resource':'lib/vue-resource.min',
    }
});

define(['vue','vue-resource'],function () {
    var Vue = require('vue');
    var VueResource  = require('vue-resource');

    Vue.use(VueResource);

    return Vue;

});