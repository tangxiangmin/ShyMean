/**
 * Created by admin on 2017/2/10.
 */

// 迁移本地Hexo博文到数据库，输出一条insert语句


let fs = require('fs');
var SqlString = require('sqlstring');

const  test = false;
// _posts文件夹为Hexo存放博文的目录
let floder = test?'test':'_posts';

let files = fs.readdirSync(floder,'utf-8');

// 正则

let reTitle = /title:\s*([^]*?)[\r\n]/;
let reDate = /date:\s*([^]*?)[\r\n]/;

let reCategory = /categories:\s*-\s*([^]*?)[\r\n]/;
let reTags = /tags:\s*-\s*([^]*?)[\r\n]/;
let re = /---([^]*?)---([^]*)/;


let ouputCount = 0;
let start = new Date();

// 重置测试文件
let output = 'output.txt';

if (fs.existsSync(output)){
    fs.unlink(output);
}

// 拆分头部信息和主要内容

files.forEach((file)=>{
    fs.readFile(floder+'/'+file,"utf-8",function (err,data) {
        if(err) throw err;

        let head = re.exec(data)[1];

        let content = re.exec(data)[2];
        // content = `Hel \ lo 'Wor"ld`;

        // 拆分头部信息
        let date = getMsg(head,reDate);

        // 将时间字符串转换成时间戳
        date = new Date(Date.parse(date.replace(/-/g, "/")));
        date = date.getTime()/1000;
        let post = {
            title: getMsg(head,reTitle),
            created_at: date,
            category: getMsg(head,reCategory),
            tags: getMsg(head,reTags),
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


