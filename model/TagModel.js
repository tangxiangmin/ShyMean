/**
 * Created by admin on 2017/7/31.
 */
let Model = require("../core/Model");

let tag = new Model("tag");

Object.assign(tag, {
    TYPE_TAG: 1,
    TYPE_CATEGORY: 2,
    getCategories(){
        return this.alias("t")
            .where("type", this.TYPE_CATEGORY)
            .join("article_tag AS a_t", "t.id", "a_t.tag_id")
            .groupBy("t.id")
            .select(["t.name", "t.id", "COUNT(*) AS category_num"]).then(data=>{
                return data
            });
    },
    getTags(){
        return this.alias("t")
            .where("type", this.TYPE_TAG)
            .join("article_tag AS a_t", "t.id", "a_t.tag_id")
            .groupBy("t.id")
            .select(["t.name", "t.id", "COUNT(*) AS tag_num"]);
    }

});

module.exports = tag;