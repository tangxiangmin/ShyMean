/**
 * Created by admin on 2017/1/1.
 */
require.config({
    baseUrl: "/assets/js/app",
    path:{
        'base':'base'
    }
});


require(['base'],function () {
    var base = require('base');

    base.changeRem();
});
