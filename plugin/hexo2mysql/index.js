/**
 * Created by admin on 2017/2/10.
 */
var test = function () {
    console.log("success in hexo2mysql");
};

var transform = function (inputFloder,output) {
    "use strict";

    let fs = require('fs');
    let SqlString = require('sqlstring');

    let floder = inputFloder;
    // 重置测试文件
    output = output || 'output.sql';
    if (fs.existsSync(output)){
        fs.unlink(output);
    }
    let files = fs.readdirSync(floder,'utf-8');

    // 正则

    let reTitle = /title:\s*([^]*?)[\r\n]/;
    let reDate = /date:\s*([^]*?)[\r\n]/;

    let reCategory = /categories:\s*-\s*([^]*?)[\r\n]/;
    // let reTags = /tags:\s*(-\s*([^]*?))*(?=categories)/g;
    let reTags = /tags:\s*-\s*([^]*?)(?=categories)/;
    let re = /---([^]*?)---([^]*)/;


    let count = 0;
    let ouputCount = 0;
    let start = new Date();



    files.forEach((file)=>{
        fs.readFile(floder+'/'+file,"utf-8",function (err,data) {
            if(err) throw err;

            // 拆分头部信息和主要内容

            let head = re.exec(data)[1];
            let content = re.exec(data)[2];

            // 拆分头部信息
            let date = getMsg(head,reDate);

            // 将时间字符串转换成时间戳
            date = new Date(Date.parse(date.replace(/-/g, "/")));
            date = date.getTime()/1000;

            let tags = getMsg(head,reTags);
            if (tags === ''){
                console.log("wtf: " + file);
                console.log(head);
            }
            tags = tags.replace(/\-/g,',').replace(/[\t\n\r]/g,'');


            let post = {
                title: getMsg(head,reTitle),
                created_at: date,
                category: getMsg(head,reCategory),
                tags: tags,
                content: content
            };

            let sql = SqlString.format('INSERT INTO shymean_article SET ?', post);
            sql += ';\r\n';
            fs.appendFile(output, sql, function(err){
                if (err) throw err;
                ouputCount++;
                console.log(ouputCount);
                // console.log("成功获取 " + file);
                if (ouputCount == files.length) {
                    let end = new Date();
                    console.log("成功转移 "+ouputCount+" 条数据，总计："+ (end - start) / 1000 + '秒');
                }
            })
        })
    });
    function getMsg(str,re) {
        let res = re.exec(str);
        return res && res[1] || '';
    }
};
exports.test = test;
exports.transform = transform;





