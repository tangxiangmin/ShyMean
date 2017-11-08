
let router = require("./router")

// load controller
let Index = require("../controller/IndexController")()
let Profile = require("../controller/ProfileController")()

// define router
router.get("/", Index.index)
router.get("/tags", Index.tags)
router.get("/archive", Index.archive)
router.get("/book", Index.book)

router.get("/about", Profile.about)
router.get("/friend", Profile.friend)

module.exports = router;
