import mysql from '../core/mysql'


export default {
    TYPE_TAG: 1,
    TYPE_CATEGORY: 2,
    async getTypeTags(type: number) {
        let conn = await mysql.getConnection()
        let [list] = await conn.query(`select t.name, t.id, COUNT(*) as category_num from tag AS t JOIN article_tag as a_t ON t.id = a_t.tag_id WHERE t.type = ? GROUP BY t.id`, [type])
        return list
    },
    async getCategories() {
        return this.getTypeTags(this.TYPE_CATEGORY)
    },
    async getTags() {
        return this.getTypeTags(this.TYPE_TAG)
    }
}
