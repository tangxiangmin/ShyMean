/**
 * 初始化mysql
 */

let mysql = require('mysql2/promise')
let connection: any

import config from '../config/db'


export default {
    async getConnection() {
        if (!connection) {
            try {
                connection = await mysql.createConnection(config)
                console.log('The mysql is connected!')
            } catch (e) {
                console.log("mysql连接失败", e)
            }
        }


        return connection
    }
}

