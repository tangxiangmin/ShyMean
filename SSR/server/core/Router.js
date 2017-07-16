let server = require("../api/server");

class Router{
    constructor(model){
        this.model = model;
        this.name = "/" + model.name;

        this.all();
        // this.one();
        this.add();
        this.edit();
        this.remove();
    }

    all(){
        server.get(this.name, this.model.all);
    }
    one(){
        server.get(this.name + "/:id", this.model.one);
    }
    add(){
        server.post(this.name, this.model.add);
    }
    edit(){
        server.put(this.name, this.model.edit);
    }
    remove(){
        server.del(this.name, this.model.remove);
    }
}

module.exports = Router;
