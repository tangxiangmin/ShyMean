<template>
    <div class="catalogue">
        <ul v-for="h2 in data" class="catalogue_group">
            <li>
                <a href="javascript:void(0)" class="catalogue_item" @click="goAnchor(h2.h2)">{{h2.h2}}</a>
                <ul v-for="h3 in h2.h3" class="catalogue_group">
                    <li>
                        <a href="javascript:void(0)" @click="goAnchor(h3.h3)" class="catalogue_item">{{h3.h3}}</a>
                        <ul class="catalogue_group">
                            <li v-for="h4 in h3.h4">
                                <a href="javascript:void(0)" @click="goAnchor(h4)" class="catalogue_item">{{h4}}</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
        
        </ul>
    </div>
</template>
<script>
    export default {
        name:'catalogue',
        props:['data'],
        methods:{
            goAnchor(val){
                val = val.replace(/\d\./g,'');
                val = '#' + val.trim();
                var anchor = document.querySelector(val);
                document.body.scrollTop = anchor.offsetTop
            }
        },
        computed:{
            data(){
                return this.$store.state.catalogue;
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    @import "../style/import";
    .catalogue {
        text-align: left;
        font-size: 16px;
        
        // 侧边栏滚动条待修改
        
        max-height: 90vh;
        .catalogue_group {
            margin: 0 0 0 20px;
            padding: 0;
            list-style: none;
        }
        
        .catalogue_item {
            line-height: 30px;
            @include block;
            @include text-overflow;
            &:hover {
                color: #fff;
            }
        }
    }
</style>
