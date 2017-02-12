/**
 * Created by admin on 2017/2/12.
 */

define([], function () {

    return {
        props:['items'],
        template:`<div class="tab">
                    <ul class="tab_nav" v-if="items.length > 1">
                        <li
                            :class="['tab_item',{active:isActive == index}]"
                            v-for="(item,index) in items"
                            @click="active(index)">{{item.title}}
                        </li>
                    </ul>

                    <div
                        :class="['tab_panel',{active:isActive == index}]"
                        v-for="(item,index) in items"
                        >
                        <slot :name="item.slot"></slot>
                    </div>
                 </div>`,
        data: function () {
            return {
                isActive:0,
            }
        },
        methods:{
            active: function (index) {
                this.isActive = index;
            }
        }

    }
});