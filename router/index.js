
let router = require("./router")

// load controller
let Index = require("../controller/IndexController")()
let Profile = require("../controller/ProfileController")()

// define router
router.get("/", Index.index)
router.get("/:page(\\d+)", Index.index)
router.get("/article/:title", Index.article)
router.get("/tags", Index.tags)
router.get("/archive", Index.archive)
router.get("/archive/:tag", Index.archive)

router.get("/book", Index.book)

router.get("/about", Profile.about)
router.get("/friend", Profile.friend)
router.get("/message", Profile.message)
router.get("/version", Profile.version)

//api router
router.get("/api/tags", Index.tags)


module.exports = router;
