import mysql from '../core/mysql'


export default {
    TYPE_TAG: 1, // 常规标签
    TYPE_CATEGORY: 2, // 分类标签
    async getTypeTags(type: number) {
        let conn = await mysql.getConnection()
        let [list] = await conn.query(`select t.name, t.id, COUNT(*) as num from tag AS t JOIN article_tag as a_t ON t.id = a_t.tag_id WHERE t.type = ? GROUP BY t.id`, [type])
        return list
    },
    async getCategories() {
        return this.getTypeTags(this.TYPE_CATEGORY)
    },
    async getTags() {
        return this.getTypeTags(this.TYPE_TAG)
    },
    async getTagByName(name: string) {
        let conn = await mysql.getConnection()
        let [res] = await conn.query(`SELECT id FROM tag where name = ?`, [name])
        return res && res[0]
    },
    // 增加标签
    async addTag(name: string, type: number) {
        let conn = await mysql.getConnection()
        let [res] = await conn.query(`INSERT INTO tag (name, type) VALUES (?, ?)`, [name, type])
        return res && res.insertId
    },
    // 关联标签和文章
    async bindArticleTag(tagId: number, articleId: number) {
        let conn = await mysql.getConnection()
        let [res] = await conn.query(`INSERT INTO article_tag (article_id, tag_id) VALUES (?, ?)`, [articleId, tagId])
        return res && res.insertId
    }
}
