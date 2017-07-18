/**
 * Created by admin on 2017/7/15.
 */
let Model = require("../core/Model");

class Visitor extends Model{
    constructor(tableName){
        super();
        this._tableName = "shymean_visitor";
        this._primarykey = "id";
    }

    saveVisitRecord(ip, referrer){
        return this.add({
            ip,
            referrer,
            created_at: Date.now()/1000
        });
    }
}

module.exports = new Visitor;