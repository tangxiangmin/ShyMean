/**
 * Created by admin on 2017/7/16.
 */
import { Router } from 'express'

let router = Router();

import visitor from "../model/Visitor"

router.get("/visitor", function (req, res, next) {
    let ip = req.headers['x-forwarded-for'] ||
        req.ip ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress || '';

    if(ip.split(',').length > 0){
        ip = ip.split(',')[0]
    }

    let { referrer } = req.query;

    if (ip !== "127.0.0.1"){
        visitor.saveVisitRecord(ip, referrer).then(data=>{
            res.json({
                status: 200,
                message: "Hello, 偷偷记录一下, 想必您不会介意吧~",
            });
        })
    }else {
        res.json({
            status: 304,
            ip
        });
    }
});

export default router