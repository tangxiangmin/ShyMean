/**
 * Created by admin on 2017/7/15.
 */
let Model = require("../core/Model");

let Book = new Model("shymean_book");

Object.assign(Book, {
    getBooks(){
        return this.orderBy("created_at")
            .select();
    }
});

module.exports = Book;