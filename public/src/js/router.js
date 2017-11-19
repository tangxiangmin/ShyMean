
class Router {
    constructor(){
        this.map = {
            '/tags': '/views/_page/tags.swig'
        };
        this.cache = {
            '/tags': ''
        }
    }
}

module.exports = Router;