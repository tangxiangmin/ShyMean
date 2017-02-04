
/**
 * 文章归档
 */
require.config({
    baseUrl:'/js',
    paths:{
        'pagination':'component/pagination',
    }
});

define(['pagination'], function () {
    return {
        template:`<div :class="['page-bd','container']">

				<div class="archives-wrap">
				    <div class="archives-count">OK!目前共计43篇日志。继续努力。</div>
					<div class="archives-title">
						<strong>2016</strong>
					</div>
					<div class="archives-item">
						<a href="#"><span class="post-time">12-01</span> 日志标题</a>
					</div>
					<div class="archives-item">
						<a href="#"><span class="post-time">12-01</span> 日志标题</a>
					</div>
					<div class="archives-item">
						<a href="#"><span class="post-time">12-01</span> 日志标题</a>
					</div>
					<div class="archives-title">
						<strong>2016</strong>
					</div>
					<div class="archives-item">
						<a href="#"><span class="post-time">12-01</span> 日志标题</a>
					</div>
					<div class="archives-item">
						<a href="#"><span class="post-time">12-01</span> 日志标题</a>
					</div>
					<div class="archives-item">
						<a href="#"><span class="post-time">12-01</span> 日志标题</a>
					</div>
				</div>
				<pagination :page="page"></pagination>
			</div>
			`,
        mounted:function(){

        },
        data:function(){
            return {
                page:{
                    total:5,
                    active:1
                },
            }
        },
    };
});
