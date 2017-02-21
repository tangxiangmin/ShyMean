/**
 * Created by Administrator on 2017/2/21 0021.
 */

define([],function () {
    return {
        props:['type','show'],
        template:`<div class="popup" v-show="show">
                <div class="loading" v-if="type == 'loading'">
                    <div class="loading_dot"></div>
                    <div class="loading_dot"></div>
                    <div class="loading_dot"></div>
			    </div>
                </div>`,
        mounted(){},
        data(){
            return {

            }
        },
    }
});