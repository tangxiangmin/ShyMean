/**
 * Created by admin on 2017/2/11.
 */
// 整个项目的脚本路径管理

require.config({
    baseUrl:'/js',
    paths:{
        // 框架依赖
        'vue':'lib/vue',
        'vue-router':'lib/vue-router',
        'vue-resource':'lib/vue-resource.min',
        // 全局路由配置
        'router-config':'blog/route',
        //插件
        'marked':'lib/marked',
        'highlight':'lib/highlight.pack',
        // 辅助函数
        'xm':'base/function',
        // 布局
        'index':'blog/blog-index',
        'articleDetail':'blog/blog-articleDetail',
        'tags':'blog/blog-tags',
        'articleList':'blog/blog-articleList',
        'layout':'blog/layout',
        // 组件
        'pagination':'component/pagination',
        'tab':'component/tab',
        'catalogue':'component/catalogue',

    }
});