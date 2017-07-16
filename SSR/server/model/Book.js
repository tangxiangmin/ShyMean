/**
 * Created by admin on 2017/7/15.
 */
let Model = require("../core/Model");

class Book extends Model{
    constructor(tableName){
        super();
        this._tableName = "shymean_book";
        this._primarykey = "id";
    }

    getBooks(){
        let fields = "";
        return this.order("created_at").select();
    }

}

module.exports = new Book;