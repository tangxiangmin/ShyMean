<template>
    <div class="tab">
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
    </div>
</template>
<script>
    export default{
        name:"tab",
        props:['items'],
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
</script>
<style lang="scss" rel="stylesheet/scss">
    @import "../style/import";
    .tab {
        font-size: 16px;
        &_nav {
            height: 40px;
            @include list-unstyle;
            @include fx;
        }
        
        // 选项卡
        &_item {
            @include fx-grow;
            line-height: 40px;
            margin: 0 10px;
            color: $text-gray;
            text-align: center;
            cursor: pointer;
            
            @include border-b;
            
            &.active {
                color: $basecolor;
            }
        }
        
        // 选项面板
        &_panel {
            display: none;
            width: 100%;
            padding-top: 30px;
            
            &.active {
                display:  block;
            }
        }
    }


</style>
