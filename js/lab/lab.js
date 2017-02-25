/**
 * Created by Administrator on 2017/2/23 0023.
 */

require(['/js/base/config.js'], function () {
    require(['vue','vue-resource','search'], function () {
        let Vue = require('vue');
        let vueResource = require('vue-resource');

        Vue.use(vueResource);

        let search = require('search');
        Vue.component('search', search);

        let vm = new Vue({
            el:"#lab",
            mounted:function () {
                this.$http.get('lab_demoList').then((res)=>{
                    return res.json();
                }).then((data)=>{
                    this.$set(this,'items',data);
                })
            },
            data:{
                items:[]
            },
        })
    })
});