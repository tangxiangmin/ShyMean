// base model class


let Model = require("mysql-xmodel")
let dbConfig = require("../config/db.json")

// 创建连接池
Model.init(dbConfig)

module.exports = Model
