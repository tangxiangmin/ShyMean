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
    let { page, size} = req.params;
    page--;

    article.getArticles(size, page).then((data)=>{
        res.json(data);
    })
});

router.get('/article/:title', function (req, res, next) {
    let { title } = req.params;

    req.socket.on("error", function() {
        console.log(req.params);
    });

    article.getArticleByTitle(title).then(data=>{
        let created_at = (new Date(data.created_at)).getTime()/1000;
        Promise.all([
            article.getPrevArticle(created_at),
            article.getNextArticle(created_at),
            // article.updateBrowse(data.id)
        ]).then((siblings)=>{
            res.json({
                article: data,
                prev: siblings[0],
                next: siblings[1],
            });
            res.end();
        }).catch(e=>{
            console.log(e);
        })
    })

});

router.get("/articleList/:type/:name", function (req, res, next) {
    let { type, name } = req.params;
    let getArticlesList;

    switch (type){
        case "category":
            getArticlesList = article.getArticleByTag(name);
            break;
        case "tag":
            getArticlesList = article.getArticleByTag(name);
            break;
        case "archive":
            getArticlesList = article.getArchiveList();
            break;
        default:
            throw error("类型不存在");
    }

    article.reset();
    let getCount =  article.count();

    Promise.all([
        getArticlesList,
        getCount
    ]).then((data)=>{
        res.json({
            lists: data[0],
            page: data[1],
        })
    });
});

export default router
