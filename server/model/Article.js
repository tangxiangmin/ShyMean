/**
 * Created by admin on 2017/7/15.
 */
let Model = require("../core/Model");

let Article = new Model("shymean_article");
let Tag = require("./Tag");

Object.assign(Article, {
    count(){
        return this.select(["COUNT(*) AS total"]).then(res=>{
            return res[0];
        })
    },
    // 处理原始数据，标签分类等
    formatArticle(res){
        const  { TYPE_TAG, TYPE_CATEGORY} = Tag;

        let articles = {};
        res.forEach(item=>{
            let { id, name, type} = item;
            if (!articles[id]){

                articles[id] = item;
                articles[id].tags = [];
                articles[id].categories = [];
            }
            if (type === TYPE_TAG){
                articles[id].tags.push(name);
            }else if (type === TYPE_CATEGORY){
                articles[id].categories.push(name);
            }
        });

        let arr = [];
        for(let key in articles){
            if (articles.hasOwnProperty(key)){
                arr.push(articles[key]);
            }
        }
        return arr;
    },

    // 首页文章列表
    getArticles(size, page){
        return this.alias("a")
            .join("shymean_article_tag AS a_t", "a.id", "a_t.article_id")
            .join("shymean_tag AS t", "t.id", "a_t.tag_id")
            .limit(size-0)
            .offset(page*size || 0)
            .orderBy("created_at")
            .select(["a.id", "a.title", "FROM_UNIXTIME(a.created_at, '%Y-%m-%d %H:%i') AS created_at", "t.name", "t.type", "a.browse", "a.abstract"])
            .then(data=>{
                return this.formatArticle(data);
            })

    },
    // 归档
    getArchiveList(){
        return this.orderBy("created_at")
            .select(["id", "title", "FROM_UNIXTIME(created_at, '%Y-%m-%d %H:%i') AS created_at", "Year(FROM_UNIXTIME(created_at)) AS year"]);
    },

    // 标签筛选文章列表
    getArticleByTag(tagId){
        return this.alias("a")
            .where("a_t.tag_id", tagId)
            .join("shymean_article_tag AS a_t", "a.id", "a_t.article_id")
            .orderBy("created_at")
            .select(["a.id", "a.title", "FROM_UNIXTIME(a.created_at, '%Y-%m-%d %H:%i') AS created_at", "Year(FROM_UNIXTIME(created_at)) AS year"])
    },


    // 文章详情
    getArticleByTitle(title){
        let field = "id, title, FROM_UNIXTIME(created_at, '%Y-%m-%d %H:%i') AS created_at, content, tags, browse, category";
        return this.alias("a")
            .where("a.title", title)
            .join("shymean_article_tag AS a_t", "a.id", "a_t.article_id")
            .join("shymean_tag AS t", "t.id", "a_t.tag_id")
            .select(["a.id", "a.title", "FROM_UNIXTIME(a.created_at, '%Y-%m-%d %H:%i') AS created_at", "t.name", "t.type", "a.browse", "a.content"])
            .then(data=>{
                return this.formatArticle(data)[0];
            })
    },
    getPrevArticle(created_at){
        return this.where("created_at", ">", created_at)
            .orderBy("created_at")
            .limit(1)
            .select("title")
            .then(data=>{
                return data && data[0] || {};
            });
    },
    getNextArticle(created_at){
        return this.where("created_at", "<", created_at)
            .orderBy("created_at")
            .limit(1)
            .select("title")
            .then(data=>{
                return data && data[0] || {};
            });
    },
    updateBrowse(id){
        // todo 文章自增
        return this.where("id", id).update({
            "browse": "browse + 1"
        })
    }
});

/*class Article extends Model{
    constructor(tableName){
        super();
        this._tableName = "shymean_article";
        this._primarykey = "id";
    }

    getCategoryList(category){
        let fields = "id, title, FROM_UNIXTIME(created_at, '%Y-%m-%d %H:%i') AS created_at, Year(FROM_UNIXTIME(created_at)) AS year";

        return this.field(fields).where({
            category
        }).order("created_at").select();
    }

    getTagList(tag){
        let fields = "id, title, FROM_UNIXTIME(created_at, '%Y-%m-%d %H:%i') AS created_at, Year(FROM_UNIXTIME(created_at)) AS year";
        return this.field(fields).where(`tags LIKE '%${tag}%'`).order("created_at").select();
    }

    // 文章详情
    getArticleByTitle(title){
        let field = "id, title, FROM_UNIXTIME(created_at, '%Y-%m-%d %H:%i') AS created_at, content, tags, browse, category";
        return this.field(field).where({ title }).find();
    }
    getPrevArticle(created_at){
        return this.field("title").where(`created_at > ${created_at}`).order("created_at").find();
    }
    getNextArticle(created_at){
        return this.field("title").where(`created_at < ${created_at}`).order("created_at").find();
    }
    updateBrowse(id){
        return this.increment(id, "browse");
    }
}*/

module.exports = Article;