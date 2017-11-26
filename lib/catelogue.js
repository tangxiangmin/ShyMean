

function formatCatalogue(content) {

    // 最多只考虑了3级目录，应该够用了。
    let re = /<(h[2|3|4])[^]*?>([^]*?)<\/\1>/g;
    let title = null;
    let count = {
        h2:0,
        h3:0,
        h4:0
    };
    let titleArr = [];
    try {
        while(title = re.exec(content)){
            let type = title[1];
            let orderNum = '';
            switch (type){
                case "h2":
                    count.h2++;
                    count.h3 = 0;
                    count.h4 = 0;
                    orderNum = count.h2 + '. ';
                    let h2 = {
                        h2:orderNum+title[2],
                        h3:[]
                    };
                    titleArr.push(h2);
                    break;
                case "h3":
                    count.h3++;
                    count.h4 = 0;
                    orderNum = count.h2 + '.' + count.h3 + '. ';
                    let h3 = {
                        h3:orderNum+title[2],
                        h4:[]
                    };
                    titleArr[titleArr.length - 1].h3.push(h3);
                    break;
                case "h4":
                    count.h4++;
                    orderNum = count.h2 + '.' + count.h3 + '.' + count.h4 + '. ';
                    let last = titleArr[titleArr.length - 1].h3;
                    last[last.length - 1].h4.push(orderNum+title[2]);
                    break;
                default:
                    console.log("oops~");
                    break;
            }
            let id = title[2];
            let str = `<${type} id='${orderNum + id}'>${orderNum + id}</${type}>`;
            content = content.replace(title[0],str);
        }
    }catch(e){
        console.log("BUGS~");
    }
    return {
        catalogue: titleArr,
        content,
    };
}

module.exports = formatCatalogue;