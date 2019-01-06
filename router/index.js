let router = require("./router")

// load controller
let Index = require("../controller/IndexController")()
let Profile = require("../controller/ProfileController")()
let Test = require("../controller/TestController")()
let Demo = require("../controller/DemoController")()
let Fragment = require("../controller/FragmentController")

// define router
router.get("/", Index.index)
router.get("/:page(\\d+)", Index.index)
router.get("/article/:title", Index.article)
router.get("/tags", Index.tags)
router.get("/archive", Index.archive)
router.get("/archive/:tag", Index.archive)
router.get("/fragment", Fragment.list)

router.get("/book", Index.book)

router.get("/about", Profile.about)
router.get("/friend", Profile.friend)
router.get("/message", Profile.message)
router.get("/version", Profile.version)

router.get("/demo", Demo.index)

router.get("/test", Test.index)

module.exports = router;
