
// 功能函数
// 命名空间为xm

define([], function () {


    /**
     *
     * @param UNIX时间戳
     */
    var dateFormat = function (val) {
        var date = new Date(val*1000);

        var year = date.getFullYear();

        var month = date.getMonth() + 1;
        month = getTwo(month);

        var day = date.getDate();
        day = getTwo(day);

        function getTwo(n){
            n = '' + n;
            return  n[1]?n:'0'+n;
        }

        return year + '-' + month + '-' + day;
    };


    return {
        dateFormat: dateFormat
    }
});