/**
 * Created by admin on 2017/7/15.
 */
let Model = require("../core/Model");

let Article = new Model("article");
let Tag = require("./TagModel");
let ArticleTag = require("./ArticleTagModel");

Object.assign(Article, {
    count(){
        return this.select(["COUNT(*) AS total"]).then(res=>{
            return res && res[0] || 0;
        })
    },
    // 处理原始数据，标签分类等
    formatArticle(articles){
        const  { TYPE_TAG, TYPE_CATEGORY} = Tag;

        let tasks = [];
        articles.forEach(article=>{
            let articleId = article.id;
            article.tags = [];
            article.categories = [];

            tasks.push(ArticleTag.alias("a_t")
                .where("article_id", articleId)
                .join("tag as t", "t.id", "a_t.tag_id")
                .select("t.name, t.type").then(data=>{
                    if(Array.isArray(data)){
                        data.forEach(tag=>{
                            let { type, name} = tag;
                            if (type === TYPE_TAG){
                                article.tags.push(name);
                            }else if (type === TYPE_CATEGORY){
                                article.categories.push(name);
                            }
                        })
                    }else {
                        console.log(data)
                    }
                }))
        });

        return Promise.all(tasks).then(res=>{
            return articles;
        })
    },

    // 首页文章列表
    getArticles(size, page){
        return this.alias("a")
            .where("status", 1)
            .limit(size-0)
            .offset(page*size || 0)
            .orderBy("created_at")
            .select(["a.id", "a.title", "a.created_at", "a.browse", "a.abstract"])
            .then(data=>{
                if(Array.isArray(data)){
                    return this.formatArticle(data);
                }else {
                    return []
                }
            }).catch(e=>{
                console.log(e)
            })

    },
    // 归档
    getArchiveList(){
        return this.where("status", 1)
          .orderBy("created_at")
          .select([
            "id",
            "title",
            "created_at",
            "Year(created_at)AS year"
          ]);
    },

    // 标签筛选文章列表
    getArticleByTag(tagname){
        // todo 标签和分类不会出现名称相同的情形
        return this.alias("a")
          .distinct()
          .where("t.id", "a_t.tag_id")
          .join("tag AS t", "t.name", tagname)
          .join("article_tag AS a_t", "a.id", "a_t.article_id")
          .orderBy("created_at")
          .select([
            "a.id",
            "a.title",
            "a.created_at",
            "Year(a.created_at) AS year"
          ]);
    },


    // 文章详情
    getArticleByTitle(title){
        return this.alias("a")
            .where("a.title", title)
            .select(["a.id", "a.title", "a.abstract", "a.created_at", "a.browse", "a.content"])
            .then(data=>{
                return this.formatArticle(data).then(res=>{
                    return res && res[0]
                });
            })
    },
    getPrevArticle(created_at){
        return this.query("SELECT title FROM article WHERE created_at > ? LIMIT 1", [
            created_at
        ]).then(data=>{
            return data && data[0] || {};
        })
    },
    getNextArticle(created_at){
        return this.query("SELECT title FROM article WHERE created_at < ? ORDER BY created_at DESC LIMIT 1", [
            created_at
        ]).then(data=>{
            return data && data[0] || {};
        })
    },
    updateBrowse(id){
        // todo 文章自增
        return this.where("id", id).update({
            "browse": "browse + 1"
        })
    }
});



module.exports = Article;
