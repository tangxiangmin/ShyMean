import { Router } from 'express'

import article from './article'
import tag from './tag'

let router = Router();

router.use(article)
router.use(tag)

export default router
