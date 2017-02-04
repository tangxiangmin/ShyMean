
/**
 * 文章详情页面
 */

define([], function () {
    return {
        template:`<div :class="['page-bd','container']">
				<div class="category-sec">
					<div class="sec-hd">
						当前共 {{categories.length}} 个分类
					</div>
					<div class="sec-bd category-type">
					    <router-link :to="{name: 'archives', params: { type: category.category}}" :class="['btn','btn-border']" v-for="category in categories">{{category.category}} ({{category.category_num}})</router-link >

					</div>
				</div>
				<div class="category-sec">
					<div class="sec-hd">
						当前共 {{tagsNum}} 个标签
					</div>
					<div class="sec-bd category-label">
					    <router-link
					        :to="{name: 'archives', params: { type: tag}}"
					        :class="['hover-hight',{'text-xs':tag_num<=2},{'text-sm':tag_num>2 && tag_num <=5},{'text-md':tag_num>5 && tag_num<=10},{'text-lg':tag_num>10}]"
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
