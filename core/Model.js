// base model class

// todo
let instance = null

class Model {

    constructor(table){
        this.table = table;
    }

    static getInstance(){
        if (!instance){
            instance = new Model(table);
        }

        return instance;
    }
}


