import { Router } from 'express'

import article from './article'
import tag from './tag'
import book from './book'
import visitor from './visitor'

let router = Router();

router.use(article)
router.use(tag)
router.use(book)
router.use(visitor)

export default router
