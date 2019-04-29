/**
 * 初始化mysql
 */

let mysql = require('mysql2/promise')
let connection: any

import config from '../config/db'

try {
    ~(async () => {
        connection = await mysql.createConnection(config)
        console.log('The mysql is connected!')
    })()
} catch (e) {
    console.log("mysql连接失败", e)
}

export default {
    getConnection() {
        if (!connection) {
            throw Error('no available connection')
        }
        return connection
    }
}
