/**
 * Created by admin on 2017/2/10.
 */

let fs = require('fs');
let SqlString = require('sqlstring');


class Hexo2Mysql{
    constructor(input = "_posts", output = 'output.sql'){
        this.input = input;
        this.output = output;

        this.init();
    }

    init(){
        let output = this.output;
        fs.existsSync(output) &&  fs.unlink(output);
    }

    transform(input = "_posts", type = 1){
        this.input = input;
        this.type = type;
        this.files =  fs.readdirSync(input, 'utf-8');

        this.files.forEach((file)=>{
            this.getInfo(file)
        });
    }

    getInfo(file){

        fs.readFile(this.input + '/' + file, "utf-8", (err, data) => {
            if (err) throw err;
            let re = /---([^]*?)---([^]*)/;
            // 拆分头部信息和主要内容
            let head = re.exec(data)[1];
            let content = re.exec(data)[2];

            // 合并数据
            let postData = {
                title: this.getTitle(head),
                created_at: this.getDate(head),
                category: this.getCategory(head),
                tags: this.getTags(head),
                abstract: this.getAbstract(content),
                content: content
            };

            let sql = this.formate(postData);
            this.write(sql);
        })
    }

    // 将数据转换成sql语句
    formate(data){
        let type = this.type,
            sql;

        if (type == 1){
            sql = SqlString.format(`UPDATE shymean_article SET ? WHERE title = ?`, [data, data.title]);
        }else if (type == 2){
            sql = SqlString.format(`INSERT shymean_article SET ? `, [data]);
        }

        sql += ';\r\n';

        return sql;
    }

    // 写入sql语句
    write(sql){
        fs.appendFile(this.output, sql, (err)=>{
            if (err) throw err;
        })
    }

    getMsg(str, re) {
        let res = re.exec(str);
        return res && res[1] || '';
    }

    getAbstract(content) {
        let reMore = /<!--more-->/,
            res = reMore.exec(content),
            index = res && res.index || 0;

        return content.substr(0, index);
    }

    getTags(content){
        let reTags = /tags:\s*-\s*([^]*?)(?=categories)/;
        return this.getMsg(content, reTags).replace(/\-/g, ',').replace(/[\t\n\r]/g, '');
    }

    getCategory(content){
        let reCategory = /categories:\s*-\s*([^]*?)[\r\n]/;
        return this.getMsg(content, reCategory);
    }
    getDate(content){
        let reDate = /date:\s*([^]*?)[\r\n]/;
        let date = (new Date(this.getMsg(content, reDate))).getTime();

        return Math.floor(date / 1000);
    }
    getTitle(content){
        let reTitle = /title:\s*([^]*?)[\r\n]/;

        return this.getMsg(content, reTitle);
    }
}


module.exports =  new Hexo2Mysql();





