
let router = require("./router")

// load controller
let Index = require("../controller/IndexController")()


// define router

router.get("/", Index.index)




module.exports = router;
