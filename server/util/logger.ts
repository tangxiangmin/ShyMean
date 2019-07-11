/**
 * 2018/11/25 下午11:07
 */

let path = require('path')
let log4js = require('log4js');
let logger = log4js.getLogger();
logger.level = 'debug';

function createDateLogFileName() {
    let now = new Date()
    let y = now.getFullYear()
    let m = now.getMonth() + 1
    let d = now.getDate()
    return `${y}_${m}_${d}.log`
}

log4js.configure({
    appenders: {base: {type: 'file', filename: path.resolve('./log', createDateLogFileName())}},
    categories: {default: {appenders: ['base'], level: 'debug'}}
});
module.exports = logger
