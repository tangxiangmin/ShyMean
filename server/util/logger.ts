/**
 * 2018/11/25 下午11:07
 */


let log4js = require('log4js');
let logger = log4js.getLogger();
logger.level = 'debug';

log4js.configure({
    appenders: {base: {type: 'file', filename: './log/tmp.log'}},
    categories: {default: {appenders: ['base'], level: 'debug'}}
});

export default logger
