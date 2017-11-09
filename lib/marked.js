// format markdown

let marked = require("marked")
let highlight = require("highlight.js")


marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code) {
        return highlight.highlightAuto(code).value;
    },
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
})

module.exports = marked