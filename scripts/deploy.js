/**
 * 2018/12/2 下午9:41
 * 守护进程形式启动node服务器
 */

function deploy() {
    let shell = require('shelljs');

    let version = shell.exec('lsof -i:3000', {silent: true}).stdout;

    let rePid = /\s(\d+)\s/.exec(version)
    let pid = rePid && rePid[1]

    let script = [
        "git pull origin master",
        "npm run build",
        "forever stop 0",
        ( pid && `kill ${pid}`) || '',
        `forever start -c "npm run start" ./`
    ]

    shell.exec(script.join(";"));
}

deploy()
