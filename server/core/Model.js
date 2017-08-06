/**
 * 封装node-mysql基础模型
 * 实现链式调用和常用的数据处理接口
 * https://github.com/tangxiangmin/mysql-xModel
 */

let Model = require("mysql-xmodel");
let config = require("../config/db.json");

Model.init(config);

module.exports = Model;

