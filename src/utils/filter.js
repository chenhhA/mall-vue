import Vue from 'vue'
Vue.filter("formatDate", formatDate);
Vue.filter("formatDateReadable", formatDateReadable);
Vue.filter("formatDateTime",formatDateTime)
Vue.prototype.formatDate = formatDate;
Vue.prototype.formatDateReadable = formatDateReadable;


// todo
// 1. 了解vue过滤原理
/**
 * 转换日期为字符串 格式为yyyy-mm-dd
 * @param value
 * @returns {string}
 */
function formatDate(value) {
    if (value == null) {
        return
    }
    var date = new Date(value);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    return year + "-" + month + "-" + day;
}

/**
 * 将日期转化为字符串 格式为 mm月dd日
 * @param value
 * @returns {string}
 */
function formatDateReadable(value) {
    if (value == null) {
        return
    }
    var date = new Date(value);
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    return  month + "月" + day + "日";
}

function formatDateTime(value) {
    if (value == null) {
        return
    }
    var date = new Date(value);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute  = date.getMinutes();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    return year + ":" + month + ":" + day + ":"+hour +':'+ minute;
}
// Vue.filter("formatDateTime", function formatDateTime(value) {
//     var date = new Date(value);
//     var year = date.getFullYear();
//     var month = date.getMonth() + 1;
//     var day = date.getDate();
//     var hours = date.getHours();
//     var minutes = date.getMinutes();
//     if (month < 10) {
//         month = "0" + month;
//     }
//     if (day < 10) {
//         day = "0" + day;
//     }
//     return year + "-" + month + "-" + day + " " + hours + ":" + minutes;
// });


