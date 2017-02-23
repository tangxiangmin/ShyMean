/**
 * Created by Administrator on 2017/2/23 0023.
 */
define([],function () {
    return {
        props:[],
        template:`<div class="search" v-cloak>
            <div class="search_hd">
                <input type="text"
                       @input="input"
                       @focus="focus"
                       @keyup.enter="enter"
                       @keyup.up="up"
                       @keyup.down="down"
                       @blur="blur"
                       v-model="inputVal"
                       placeholder="数据库被删掉了..." class="search_input">
                <div class="search_icon">
                    <i class="iconfont icon-search"></i>
                </div>
            </div>

            <ul class="search_bd" v-if="isShow">
                <li v-for="(item, index) in tmps"
                    @click="select(item)"
                    :class="['search_item',{'hover':isHover == index}]">
                    <a href="#" class="block">{{item}}</a>
                </li>
            </ul>
        </div>`,
        data:function () {
            return {
                tmps:[],
                items:['1广东','1广东2','1广东3','湖南','广西','湖北','四川'],
                isShow: false,
                inputVal: '',
                isHover: -1
            }
        },

        methods:{
            focus(e){
                this.isShow = true;
            },
            blur(){
//                            this.isShow = false;
            },
            input(){
                this.tmps = [];
                let txt = this.inputVal;

                if (''.trim.call(txt) === ''){
                    return;
                }

                this.items.forEach((val)=>{
                    if (val.search(txt) != -1){
                        this.tmps.push(val);
                    }
                });
            },
            up(){
                if (this.isHover > -1){
                    this.isHover--;
                }
            },
            down(){
                if (this.isHover < this.tmps.length - 1){
                    this.isHover++;
                }
            },
            select(val){
                this.inputVal = val;
                this.isShow = false;
            },
            enter(){
                if (this.isHover != -1) {
                    this.inputVal = this.tmps[this.isHover];
                    this.input();
                }
                // 真正进行搜索的地方

            }
        }
    }
});