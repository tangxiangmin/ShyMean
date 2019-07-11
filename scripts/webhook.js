/**
 * 2019/5/5 下午9:55
 * 参考 https://www.npmjs.com/package/github-webhook-handler
 */
let http = require('http');
let createHandler = require('github-webhook-handler');
let shelljs = require('shelljs')

function initServer() {
    // 下面填写的myscrect跟github webhooks配置一样，下一步会说；path是我们访问的路径
    let handler = createHandler({path: '/web_hooks', secret: 'shymean_blog'});

    http.createServer(function (req, res) {
        handler(req, res, function (err) {
            res.statusCode = 404;
            res.end('no such location');
        })
    }).listen(3001);

    handler.on('error', function (err) {
        console.error('Error:', err.message)
    });

// 监听到push事件的时候执行我们的自动化脚本
    handler.on('push', onPush);
}

function onPush(event) {
    try {
        shelljs.exec('sh ./deploy.sh')

        console.log('Received a push event for %s to %s',
            event.payload.repository.name,
            event.payload.ref);
    } catch (e) {
        console.log(e)
    }

}

initServer()
