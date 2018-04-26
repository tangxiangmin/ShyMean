let Cache = require('../core/Cache')

let article = {
    title: 'test',
    content: '这是一个晴朗的早晨'
}


Cache.getArticle({id: 1}).then(res => {
    console.log(res)
})

// Cache.saveArticle(article).then(_ => {
//     Cache.getArticle(1).then(res => {
//         console.log(res)
//     })
// })
