
module.exports = {
    allowErrors: false,
    autoescape: true,
    cache: true,
    encoding: 'utf8',
    filters: {
        test(input){
            return input + input
        }
    },
    root: '/',
    tags: {},
    extensions: {},
    tzOffset: 0
}