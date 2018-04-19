module.exports = {
    src: "./public/src",
    dist: "./public/dist",
    webpack: function (PAGE_SCRIPT_PATH) {
        return {
            entry: {
                index: PAGE_SCRIPT_PATH + "/index.js",
            },
            output: {
                filename: "[name].js"
            },
            module: {
                loaders: [
                    {
                        test: /\.js$/,
                        loader: "babel-loader?presets=env",
                    }
                ]
            },
            externals: {
                jquery: "window.jQuery",
                swigjs: "window.swig",
                marked: "window.marked",
                'highlight.js': "window.hljs"
            },
        }
    }
}