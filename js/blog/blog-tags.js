
/**
 * 文章详情页面
 */

define([], function () {
    return {
        template:`<div :class="['page_bd','container']">
				<div class="classify">
					<div class="classify_hd">
						当前共 {{categories.length}} 个分类
					</div>
					<div class="category">
					    <router-link
					    :to="{name:'articleList',params:{type:'category',name:category.category || 'tmp',active:1}}"
					    class="category_item"
					    v-for="category in categories">{{category.category}} ({{category.category_num}})</router-link >

					</div>
				</div>
				<div class="classify">
					<div class="classify_hd">
						当前共 {{tagsNum}} 个标签
					</div>
					<div class="tag">
					    <router-link
					        :to="{name:'articleList',params:{type:'tag',name:tag || 'tmp',active:1}}"
					        :class="['hover-highlight','tag_item',{'text-xs':tag_num<=2},{'text-sm':tag_num>2 && tag_num <=5},{'text-md':tag_num>5 && tag_num<=10},{'text-lg':tag_num>10}]"
					        v-for="(tag_num,tag) in tags"
					    >{{tag}}</router-link >

					</div>
				</div>
			</div>
			`,
        mounted:function(){
            this.$http.get('/Home/Blog/tags').then((res)=>{
                return res.json();
            }).then((res)=>{
                this.$set(this,'categories',res.categories);
                // 暂时没有想到如何在数据库处理标签数据，因此目前只能采取这种折中的办法
                let tags = {};
                let tagsNum = 0;
                res.tags.forEach((val)=>{
                    let sigleTag = val['tags'].split(',');
                    sigleTag.forEach((val)=>{
                        val = val.trim();
                        if (val in tags) {
                            tags[val]++;
                        }else {
                            tags[val] = 1;
                            tagsNum++;
                        }
                    });
                });
                this.$set(this,'tags',tags);
                this.$set(this,'tagsNum',tagsNum);
            });
        },
        data:function(){
            return {
                categories:[],
                tags:{},
                tagsNum:0
            }
        },
    };
});
