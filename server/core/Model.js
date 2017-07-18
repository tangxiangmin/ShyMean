/**
 * 封装node-mysql基础模型
 * 实现链式调用和常用的数据处理接口
 */

let mysql = require("mysql");
let SqlString = require("sqlstring");

let config = require("./../config/db.json");


class Model {
    constructor(tableName = ""){
        this.config = config;
        this._tableName = tableName;

        this.reset();
        this.connect();
    }

    reset(){
        this._distinct = "";
        this._field = "*";
        this._where = "1";
        this._group = "";
        this._order = "";
        this._limit = "";
    }

    // 连接和关闭
    connect(){
        this.conn = mysql.createConnection(this.config);
        this.conn.connect();
    }

    close(){
        this.conn.end();
    }

    // 拼接查询字段
    getSelectSql(){
        return `SELECT ${this._distinct} ${this._field} FROM ${this._tableName} WHERE ${this._where} ${this._group} ${this._order} ${this._limit}`;
    }

    query(sql){
        return new Promise((resolve, reject)=>{
            this.conn.query(sql, (err, rows)=>{
                if (err) {
                    reject(sql);
                    // throw err;
                }
                resolve(rows);
                this.reset();
                // 这里断开连接的话下次查询就会失败，待解决
                // this.close();
            });
        })
    }

    // 链式操作
    where(params, logic = "AND"){
        logic = ' ' + logic;

        if (typeof params === "string"){
            this._where = params;
        }else if(typeof params === "object"){
            this._where = params ? SqlString.format(`?`, params).replace(",", logic) : "1";
        }

        return this;
    }

    field(fields = ""){
        this._field = fields ? fields : "*";
        return this;
    }

    distinct(){
        this._distinct = "DISTINCT";
        return this;
    }

    order(fields = "", logic = "DESC"){
        this._order = fields ? `ORDER BY ${SqlString.escapeId(fields)} ${logic}` : "";
        return this;
    }

    limit(num = 1, offset = 1){
        this._limit = `LIMIT ${num} OFFSET ${offset}`;
        return this;
    }

    group(fields = "") {
        this._group = fields ? `GROUP BY ${SqlString.escapeId(fields)}` : "";
        return this;
    }

    // CURD
    select(){
        let sql = this.getSelectSql();
        return this.query(sql);
    }
    find(){
        return this.select().then((data)=>{
            return data[0];
        })
    }

    // 按照指定字段对结果进行分组
    groupBy(field){
        return this.select().then((data)=>{
            let map = {};
            data.forEach((item)=>{
                let fieldVal = item[field];
                if (typeof map[fieldVal] === "undefined") {
                    map[fieldVal] = [item];
                }else {
                    map[fieldVal].push(item);
                }
            });

            return map;
        });
    }

    add(params){
        let sql = SqlString.format(`INSERT INTO ${this._tableName} SET ?`, params);
        return this.query(sql);
    }

    update(primarykey, params){
        let sql = SqlString.format(`UPDATE ${this._tableName} SET ? WHERE ${this._primarykey} = '${primarykey}'`, params);

        return this.query(sql).then((data)=>{
            let { affectedRows } = data;
            return { affectedRows };
        },(err)=>{
            console.log(err);
        });
    }

    remove(){
        let sql = SqlString.format(`DELETE FROM ${this._tableName} WHERE ${this._where}`);
        return this.query(sql).then((data)=>{
            let { affectedRows } = data;
            return { affectedRows };
        }, (err)=>{
            console.log(err);
        });
    }
    // 聚集函数
    count(){
        return this.field("COUNT(*) as total").find();
    }
}

module.exports = Model;

