/**
 * Created by admin on 2017/7/16.
 */
import { Router } from 'express'

let router = Router();

import book from "../model/Book"

router.get("/books", function (req, res, next) {
    book.getBooks().then(data=>{
        res.json(data)
    })
});

export default router