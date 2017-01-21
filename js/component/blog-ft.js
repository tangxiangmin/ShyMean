/**
 * Created by admin on 2017/1/20.
 */
require.config({
    baseUrl:'/js/',
    paths:{
        'vue':'lib/vue'
    }
});

define(['vue'],function () {
    var Vue = require('vue');

    Vue.component('blog-ft', {
        props: ['msg'],
        template:`<footer class="bg-gray page-ft">
				<div class="container">
					<p>
						©Shymean 2016 - {{new Date().getFullYear()}}
					</p>
					<p v-if="msg.sign">{{msg.sign}}</p>
				</div>
			</footer>`,
        data:function(){
            return {

            }
        }
    });

    return Vue;
});