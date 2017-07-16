import { Router } from 'express'

import article from './article'
import tag from './tag'
import book from './book'

let router = Router();

router.use(article)
router.use(tag)
router.use(book)

export default router
