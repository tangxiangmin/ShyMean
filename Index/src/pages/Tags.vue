<template>
    <div :class="['page','container']">
        <div class="classify">
            <div class="classify_hd">
                当前共 {{categories.length}} 个分类
            </div>
            <div class="category">
                <router-link
                    :to="{name:'articleList',params:{type:'category',name:category.category || 'tmp',active:1}}"
                    class="category_item"
                    v-for="category in categories"
                    :key="category"
                >{{category.category}} ({{category.category_num}})</router-link >
            
            </div>
        </div>
        <div class="classify">
            <div class="classify_hd">
                当前共 {{tags.length}} 个标签
            </div>
            <div class="tag">
                <router-link
                    :to="{name:'articleList',params:{type:'tag',name:tag || 'tmp',active:1}}"
                    :class="['hover-highlight','tag_item',{'text-xs':tag_num<=1},{'text-sm':tag_num>1 && tag_num <=3},{'text-md':tag_num>3 && tag_num<=6},{'text-lg':tag_num>6}]"
                    v-for="(tag_num, tag) in tags"
                    v-if="tag != 'length'"
                    :key="tag_num"
                >{{tag}}</router-link >
            
            </div>
        </div>
    </div>
</template>
<script>
    import { getTags } from "@/api/article"
    export default{
        name:"tags",
        data(){
            return {
                categories:[],
                tags:{},
            }
        },
        computed: {
        
        },
        mounted:function(){
            let tags = this.$store.state.tags,
                categories = this.$store.state.categories;
            
            // 由于tags保存的是一个对象，所以这里只判断categories了，实际上也够了
            if (categories.length){
                this.tags = tags;
                this.categories = categories;
            }else {
                this.getTags();
            }
        },
        methods: {
            getTags(){
                getTags().then(res=>{
                    // 暂时没有想到如何在数据库处理标签数据，因此目前只能采取这种折中的办法
                    let tags = {
                        length: 0,
                    };
                    let tagsNum = 0;
                    res.tags.forEach((val)=>{
                        let sigleTag = val['tags'].split(',');
                        sigleTag.forEach((val)=>{
                            val = val.trim();
                            if (val in tags) {
                                tags[val]++;
                            }else {
                                tags[val] = 1;
                                tags.length++;
                            }
                        });
                    });
    
                    // 更新标签
                    this.$set(this,'tags',tags);
                    this.$store.commit("setTags", tags);
    
                    // 更新分类
                    this.$set(this,'categories', res.categories);
                    this.$store.commit("setCategories", res.categories);
                });
            }
        },
      
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    @import "../style/import";

    .classify {
    
        margin-bottom: $basemargin*5;
        text-align: center;
        &_hd {
            margin-bottom: $basemargin;
            @include text-md;
        }
    
    }
    .category {
    
        &_item {
            display: inline-block;
            padding: 5px 10px;
            margin: 10px 5px;
            border: 1px solid $dark;
        
            @include text-sm;
            &:hover {
                background-color: $dark;
                color: #fff;
                border: 1px solid $dark;
            }
        }
    }
    .tag {
        word-wrap: break-word;
        &_item {
            display: inline-block;
            margin: 10px;
            &.text-xs {
                font-size: 12px;
            }
            &.text-sm {
                font-size: 15.6px;
            }
            &.text-md {
                font-size: 22.8px;
            }
            &.text-lg {
                font-size: 30px;
            }
        }
    }

</style>
