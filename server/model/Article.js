/**
 * Created by admin on 2017/7/15.
 */
let Model = require("../core/Model");

class Article extends Model{
    constructor(tableName){
        super();
        this._tableName = "shymean_article";
        this._primarykey = "id";
    }

    getArticles(size, page){
        let fields = "id, title, category, tags, FROM_UNIXTIME(created_at, '%Y-%m-%d %H:%i') AS created_at, browse, abstract";
        let offset = page*size || 0;
        return this.field(fields).order("created_at").limit(size, offset).select();
    }

    getArchiveList(){
        let fields = "id, title, FROM_UNIXTIME(created_at, '%Y-%m-%d %H:%i') AS created_at, Year(FROM_UNIXTIME(created_at)) AS year";

        return this.field(fields).order("created_at").select();
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
}

module.exports = new Article;