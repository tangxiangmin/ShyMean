/**
 * Created by admin on 2017/7/16.
 */
import { Router } from 'express'

let router = Router();

import article from "../model/Article"

router.get('/tags', function (req, res, next) {
    let categories = article.field("category, COUNT(category) AS category_num").group("category").select();
    let tags = article.field("tags").select();
    Promise.all([categories, tags]).then(data=>{
        console.log(data);
        res.json({
            categories: data[0],
            tags: data[1]
        });
    })
});
export default router