/**
 * 2018/11/20 下午9:35
 * webpack entry
 */

require('./scss/blog.scss')

const System = require('SystemJS')
const Util = require('./js/util')

function showVersion() {
    console.clear()
    console.log("\n%c Shymean's Blog%cv0.5.1%c\n\n", "padding: 8px; background: #333; font-family: 'Sitka Heading'; font-weight: bold; font-size: large; color: white;", "padding: 8px; background: #999; font-family: 'Sitka Text'; font-size: large; color: #eee;", "")

    window.addEventListener('load', function () {
        console.log(`页面加载完毕消耗了${Math.round(performance.now() * 100) / 100}ms`);
    })
}

// 加载live-2d https://github.com/stevenjoezhang/live2d-widget
function loadLive2d() {
    System.import("L2Dwidget").then(() => {
        L2Dwidget.init({
            log: false,
            debug: false,
            model: {
                // jsonPath: "https://unpkg.com/live2d-widget-model-shizuku@latest/assets/shizuku.model.json",
                jsonPath: "https://cdn.jsdelivr.net/npm/live2d-widget-model-wanko@1.0.5/assets/wanko.model.json"
            },
            display: {
                position: "left",
            },
            react: {
                opacity: 0.5
            }
        });
    })
}

Promise.all([
    System.import("jquery"),
    System.import("swig"),
    // System.import("")
]).then(([]) => {
    showVersion()

    let app = require('./js/index')
    app.init();

    // PC端加载 L2Dwidget
    if (Util.pageType === 'pc') {
        loadLive2d()
    }
})



