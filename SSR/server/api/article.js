import { Router } from 'express'

let router = Router();

// Mock Users
import article from "../model/Article"

router.get('/articleSize', function (req, res, next) {
    article.count().then((data)=>{
        res.json(data);
    })
});

router.get('/article/:page/:size', function (req, res, next) {
    let { page, size } = req.params;
    page--;

    article.getArticles(size, page).then((data)=>{
        res.json(data);
    })

});

export default router
