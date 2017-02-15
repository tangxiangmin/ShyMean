
// 将READEME.md中的文件按日期输出

"use strict";
let fs = require('fs');

fs.readFile('/README.md',"utf-8",function (err,data) {

    let re = /(\d{4}-\d{1,2}-\d{1,2})([^]*?)(?=[#]{3})/g;
    let res = null;
    let date = [], content = [];
    while(res = re.exec(data)){
        date.push(res[1]);
        content.push(res[2]);
    }

    let catalogue = '';

    const dir = '/doc/dairy/';

    for (let i = 0, len = date.length; i< len; ++i) {
        content[i] = "### " + date[i] + "\r\n" +　content[i];
        catalogue += `* [${date[i]}](${dir + date[i]}.md) \r\n`;

        fs.writeFile(date[i]+'.md',content[i] ,function (err) {
            if(err) throw err;
        })
    }

    fs.writeFile("catalogue.md",catalogue,function (err) {
        if (!err) {
            console.log(success);
        }
    });
});

