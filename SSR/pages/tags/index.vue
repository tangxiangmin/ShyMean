{{{{raw}}}}
<template>
    <div class="container">
        <div class="classify">
            <div class="classify_hd">
                当前共 {{categories.length}} 个分类
            </div>
            <div class="category">
                <router-link
                        :to="`/category/${category.category}`"
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
                        :to="`/tags/${tag}`"
                        :class="['hover-highlight','tag_item',{'text-xs':tag_num<=1},{'text-sm':tag_num>1 && tag_num <=3},{'text-md':tag_num>3 && tag_num<=6},{'text-lg':tag_num>6}]"
                        v-for="(tag_num, tag) in tags"
                        v-if="tag != 'length'"
                        :key="tag_num"
                >{{tag}}</router-link >
        
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
            getTags(){
                axios.get("/api/tags").then(res=>{
                    let { data } = res;
                    // 暂时没有想到如何在数据库处理标签数据，因此目前只能采取这种折中的办法
                    let tags = {
                        length: 0,
                    };
                    
                    let tagsNum = 0;
                    data.tags.forEach((val)=>{
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
                    this.$set(this,'categories', data.categories);
                    this.$store.commit("setCategories", data.categories);
                });
            }
        },

    }
    
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
