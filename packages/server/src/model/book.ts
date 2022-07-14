import mysql from '../core/mysql'


export default {
    async getBooks() {
        let conn = await mysql.getConnection()
        let [list] = await conn.query(`select * from book order by created_at DESC`)
        return list || []
    }
}
