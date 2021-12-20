const Router = require("koa-router")

const router = new Router()

// load controller
import Index from '../controller/IndexController'
// import Profile from '../controller/ProfileController'

// define router
router.get("/", Index.index)
router.get("/:page(\\d+)", Index.index)
router.get("/article/:title", Index.article)
router.get("/tags", Index.tags)
router.get("/archive", Index.archive)
router.get("/archive/:tag", Index.archive)

router.get("/book", Index.book)
router.get("/friends", Index.friends)
router.get("/rss", Index.rss)


// router.get("/about", Profile.about)
// router.get("/friend", Profile.friend)
// router.get("/message", Profile.message)
// router.get("/version", Profile.version)
//
// router.get("/demo", Profile.demo)


export default router
