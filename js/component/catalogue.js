/**
 * Created by admin on 2017/2/12.
 */
// 文章目录的组件
// 考虑到侧边栏的宽度，只定义了3级目录，如果无限级的话需要改成递归
// todo：滚动监听

define([], function () {
    return {
        props:['data'],
        template:`<div class="catalogue">
            <ul v-for="h2 in data" class="catalogue_group">
            <li>
                <a href="javascript:void(0)" class="catalogue_item" @click="goAnchor(h2.h2)">{{h2.h2}}</a>
                <ul v-for="h3 in h2.h3" class="catalogue_group">
                    <li>
                        <a href="javascript:void(0)" @click="goAnchor(h3.h3)"  class="catalogue_item">{{h3.h3}}</a>
                        <ul class="catalogue_group">
                            <li v-for="h4 in h3.h4">
                                <a href="javascript:void(0)" @click="goAnchor(h4)"  class="catalogue_item">{{h4}}</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>

        </ul></div>`,
        methods:{
            goAnchor(val){
                val = val.replace(/\d\./g,'');
                val = '#' + val.trim();
                var anchor = document.querySelector(val);
                document.body.scrollTop = anchor.offsetTop
            }
        },
        filters:{
            anchor(val){
                // 去除序号和开头的空格，返回正确的锚点

            }
        }
    }
});