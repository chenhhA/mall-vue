import Vue from 'vue'
Vue.filter("formatDate", formatDate);
Vue.filter("formatDateReadable", formatDateReadable);
Vue.filter("formatDateTime",formatDateTime)
Vue.filter("formatPrice",formatPrice)
Vue.filter("formatArrayToText",formatArrayToText)
Vue.filter("countDownStr",countDownStr)
Vue.prototype.formatDate = formatDate;
Vue.prototype.formatDateReadable = formatDateReadable;
Vue.prototype.formatPrice = formatPrice;



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
    return year + "." + month + "." + day;
}

function formatArrayToText(array) {
    let str = ''
    for (let i = 0; i < array.length; i++) {
        str += array[i]+' '
    }
    return str;
}

function countDownStr(str) {
    if (str == null || str === '') {
        return
    }
    if (str.length >= 30)
        return str.substring(0,31)+'...'
    return str;
}

/**
 * 将数字格式化成字符串, 例如2.2 会被格式化为2.20
 * @param value 数字
 */
function formatPrice(value) {
    if (value == null)
        return '0.00'
    let pennyText
    let prices = value.toString().split(".") // 根据.分割为整数位和小数位两部分

    if (!prices[1]) // 不存在小数位
        pennyText ='00'
    else if (prices[1].length === 1)
        pennyText = prices[1]+'0'

    return `${prices[0]}.${pennyText}`
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


