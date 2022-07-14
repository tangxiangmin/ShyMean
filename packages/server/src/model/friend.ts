import mysql from '../core/mysql'


export default {
    async getFriendList() {
        let conn = await mysql.getConnection()
        let [list] = await conn.query(`select * from friend_link`)
        return list || []
    }
}
