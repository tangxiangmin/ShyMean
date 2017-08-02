{{{{raw}}}}
<template>
    <div class="container">
        <div class="classify">
            <div class="classify_hd">
                当前共 {{categories.length}} 个分类
            </div>
            <div class="category">
                <router-link
                        :to="`/tags/${category.name}`"
                        class="category_item"
                        v-for="category in categories"
                        :key="category"
                >{{category.name}} ({{category.category_num}})</router-link >
        
            </div>
        </div>
        <div class="classify">
            <div class="classify_hd">
                当前共 {{tags.length}} 个标签
            </div>
            <div class="tag">
                <template v-for="tag in tags">
                    <router-link
                            :to="`/tags/${tag.name}`"
                            :class="['hover-highlight', 'tag_item', tagSize(tag.tag_num)]"
                            :key="tag">{{ tag.name }}</router-link >
                </template>
               
        
            </div>
        </div>
    </div>
</template>
{{{{/raw}}}}

<script>
    import axios from "~plugins/axios"
    
    export default{
        name: "tags",
        data(){
            return {
                categories:[],
                tags: {},
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
            tagSize(num){
                if (num <= 2) {
                    return "text-xs";
                } else if (num > 2 && num <= 5) {
                    return "text-sm";
                } else if (num > 5 && num <= 8) {
                    return "text-md"
                } else {
                    return "text-lg";
                }
            },
            getTags(){
                axios.get("/api/tags").then(res=>{
                    let { categories, tags } = res.data;
                    // 更新标签
                    this.tags = tags
                    this.$store.commit("setTags", tags);
                    
                    // 更新分类
                    this.categories = categories;
                    this.$store.commit("setCategories", categories);
                });
            }
        },

    }
    
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
