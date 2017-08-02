export default {
    setCatalogue: (state, catalogue)=>{
        state.catalogue = catalogue;
    },

    // 保存置顶文章
    setStickiedArticles(state, articles){
        state.stickiedArticles = articles;
    },
    // 缓存标签
    // 缓存分类
    setTags(state, tags){
        state.tags = tags;
    },
    setCategories(state, categories){
        state.categories = categories;
    },
    // 缓存畅言留言板
    setChangyanTpl(state, html){
        state.changyanTpl = html;
    }
}
