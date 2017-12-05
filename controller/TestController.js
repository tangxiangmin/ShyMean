

let Pagination = require("../lib/pagination")

class TestController {

    async index(ctx, next){

        let paginate = new Pagination(103, 2, 10);

        ctx.body = paginate.init();
    }
}

module.exports = ()=>{
    return new TestController()
}