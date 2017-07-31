/**
 * Created by admin on 2017/7/16.
 */
import { Router } from 'express'

let router = Router();

import Tag from "../model/Tag"

router.get('/tags', function (req, res, next) {

    Promise.all([
        Tag.getCategories(),
        Tag.getTags(),
    ]).then(data=>{
        res.json({
            categories: data[0],
            tags: data[1]
        });
    });
});
export default router