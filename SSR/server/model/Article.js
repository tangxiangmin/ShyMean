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
        return this.field(fields).limit(size, page*size).select();
    }
}

module.exports = new Article;