
/**
 * 文章详情页面
 */

define([], function () {
    return {
        template:`<div :class="['page-bd','container']">
				<div class="category-sec">
					<div class="sec-hd">
						当前共 7 个分类
					</div>
					<div class="sec-bd category-type">
					    <router-link to="/" :class="['btn','btn-border']" v-for="category in categories">{{category}}</router-link >

					</div>
				</div>
				<div class="category-sec">
					<div class="sec-hd">
						当前共 20 个标签
					</div>
					<div class="sec-bd category-label">
					    <router-link to="/" :class="['hover-hight','text-xs']" v-for="tag in tags">{{tag}}</router-link >
						<a href="#" class="hover-hight text-xs">Vue</a>
						<a href="#" class="hover-hight">Scss</a>
						<a href="#" class="hover-hight text-sm">box-shadow</a>
						<a href="#" class="hover-hight">Vue</a>
						<a href="#" class="hover-hight text-md">Scss</a>
						<a href="#" class="hover-hight">box-shadow</a>
						<a href="#" class="hover-hight">Vue</a>
						<a href="#" class="hover-hight text-lg">Scss</a>
						<a href="#" class="hover-hight">box-shadow</a>
					</div>
				</div>
			</div>
			`,
        mounted:function(){
            this.$http.get('/Home/Blog/tags').then((res)=>{
                return res.json();
            }).then((res)=>{
                let categories = [], tags = [];
                console.log(res);
                res.forEach((val)=>{
                    console.log(val);
                });
            });
        },
        data:function(){
            return {
                categories:['Javascript','Html'],
                tags:['SCSS','Code','Rex'],
            }
        },
    };
});
