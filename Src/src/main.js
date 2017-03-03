// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Blog from './Blog'
import router from './router'

Vue.config.productionTip = false;
/* eslint-disable no-new */
let blog = new Vue({
    el: '#blog',
    router,
    template: '<Blog/>',
    components: {Blog}
});

Vue.http.interceptors.push((request, next) => {
  blog.isLoading = true;
  next((response) => {
    blog.isLoading = false;
    return response
  });
});
