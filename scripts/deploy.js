/**
 * 2018/12/2 下午9:41
 * 守护进程形式启动node服务器
 */

function deploy() {
    let shell = require('shelljs');

    let version = shell.exec('lsof -i:3000', {silent: true}).stdout;
    let pid = /\s(\d+)\s/.exec(version)[1]

    let script = [
        "git pull origin master",
        "npm install",
        "npm run build",
        "forever stop 0",
        `kill ${pid}`,
        `forever start -c "npm run start" ./`
    ]

    shell.exec(script.join(";"));
}

deploy()
