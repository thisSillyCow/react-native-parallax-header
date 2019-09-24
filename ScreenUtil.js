/**
 * 屏幕工具类
 * ui设计基准,iphone 6
 * width:750px
 * height:1334px
 */
import { PixelRatio, Dimensions, Platform, StatusBar } from 'react-native'
export let screenW = Dimensions.get('window').width
export let screenH = Dimensions.get('window').height
export let pixelRatio = PixelRatio.get()
//像素密度
export const DEFAULT_DENSITY = 1
//px转换成dp
//以iphone6为基准,如果以其他尺寸为基准的话,请修改下面的750和1334为对应尺寸即可.
const w2 = 750 / DEFAULT_DENSITY
//px转换成dp
const h2 = 1334 / DEFAULT_DENSITY
// iPhoneX
export const X_WIDTH = 375
export const X_HEIGHT = 812
//iPhoneX底部高度
export const IPHONEX_BOTTOM_HEIGHT = 54;

export const STATUS_HEIGHT = Platform.OS === 'ios' ? 20 : (Platform.Version > 19 ? StatusBar.currentHeight : 0);

// 边缘圆角
export const radiusNum = scaleSize(5);
/**
 * 设置字体的size（单位px）
 * @param size 传入设计稿上的px
 * @returns {Number} 返回实际sp
 */
export function setSpText(size) {
    isIphoneX()
    let scaleWidth = screenW / w2
    let scaleHeight = screenH / h2
    let scale = Math.min(scaleWidth, scaleHeight)
    size = Math.round(size * 2 * scale + 0.5)
    return size / DEFAULT_DENSITY
}
export const getUrlParam = (name) => {
    const that = this
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg)
    if (r != null) {
        return r[2]
    }
}

export const getParams = (params, name) => {
    const that = this
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = params.substr(1).match(reg)
    if (r != null) {
        return r[2]
    }
}

/**
 * 屏幕适配,缩放size
 * @param size
 * @returns {Number}
 */
export function scaleSize(size) {
    isIphoneX()
    let scaleWidth = screenW / w2
    let scaleHeight = screenH / h2
    let scale = Math.min(scaleWidth, scaleHeight)
    size = Math.round(size * 2 * scale + 0.5)
    return size / DEFAULT_DENSITY
}

/**
 * 判断android API是否小于19(4.4以下)，如果是则不能使用沉浸状态栏
 *
 */
export function isLT19() {
    return Platform.OS === 'android' && Platform.Version < 19
}

//时间处理
Date.prototype.format = function (format) {
    let date = {
        'M+': this.getMonth() + 1,
        'd+': this.getDate(),
        'h+': this.getHours(),
        'm+': this.getMinutes(),
        's+': this.getSeconds(),
        'q+': Math.floor((this.getMonth() + 3) / 3),
        'S+': this.getMilliseconds()
    }
    if (/(y+)/i.test(format)) {
        format = format.replace(
            RegExp.$1,
            (this.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
    }
    for (let k in date) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(
                RegExp.$1,
                RegExp.$1.length === 1
                    ? date[k]
                    : ('00' + date[k]).substr(('' + date[k]).length)
            )
        }
    }
    return format
}

export function TimesAgo(timestamp) {
    var mistiming = Math.round(new Date() / 1000) - timestamp;
    var arrr = ['年', '个月', '星期', '天', '小时', '分钟', '秒'];
    var arrn = [31536000, 2592000, 604800, 86400, 3600, 60, 1];
    for (var i = 6; i >= 0; i--) {
        var inm = Math.floor(mistiming / arrn[i]);
        if (inm != 0) {
            return inm + arrr[i] + '前';
        }
    }
}

//获取时间差 current:1497235409744 当前时间  start:1497235419744 开始时间
export function getRemainingime(current, start) {
    let time = start - current
    return time / 1000 //["0", "0", "2", "7", "33", "30"]0年0月2日 7时33分30秒
}

//1497235419
export function getRemainingimeDistance(distance) {
    let time = distance * 1000
    if (time < 0) {
        return ['0', '0', '0', '0', '0', '0']
    }
    let year = Math.floor(time / (365 * 30 * 24 * 3600 * 1000)) //年
    let month = Math.floor(time / (30 * 24 * 3600 * 1000)) //月
    let days = Math.floor(time / (24 * 3600 * 1000)) //日
    let temp1 = time % (24 * 3600 * 1000)
    let hours = Math.floor(temp1 / (3600 * 1000)) //时
    let temp2 = temp1 % (3600 * 1000)
    let minutes = Math.floor(temp2 / (60 * 1000)) //分
    let temp3 = temp2 % (60 * 1000)
    let seconds = Math.round(temp3 / 1000) //秒

    let strs = [
        year,
        toNormal(month),
        toNormal(days),
        toNormal(hours),
        toNormal(minutes),
        toNormal(seconds)
    ]
    return strs //["0", "0", "2", "7", "33", "30"]0年0月2日 7时33分30秒
}

export function toNormal(time) {
    return time >= 10 ? time : '0' + time
}

//转换成日期
export function toDate(timestamp, format1 = 'yyyy-MM-dd hh:mm:ss') {
    try {
        let date = new Date()
        date.setTime(timestamp)
        return date.format(format1) //2014-07-10 10:21:12
    } catch (erro) {
        return ''
    }
}

//1970/1/1至今的秒数
export function toTimestamp(date) {
    let timestamp = Date.parse(date)
    return timestamp / 1000 // 1497233827569/1000
}

//CST时间=>转换成日期yyyy-MM-dd hh:mm:ss
export function getTaskTime(strDate) {
    if (null == strDate || '' == strDate) {
        return ''
    }
    let dateStr = strDate.trim().split(' ')
    let strGMT =
        dateStr[0] +
        ' ' +
        dateStr[1] +
        ' ' +
        dateStr[2] +
        ' ' +
        dateStr[5] +
        ' ' +
        dateStr[3] +
        ' GMT+0800'
    let date = new Date(Date.parse(strGMT))
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    m = m < 10 ? '0' + m : m
    let d = date.getDate()
    d = d < 10 ? '0' + d : d
    let h = date.getHours()
    let minute = date.getMinutes()
    minute = minute < 10 ? '0' + minute : minute
    let second = date.getSeconds()
    second = second < 10 ? '0' + second : second

    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
}

//1497235419
export function getRemainingimeDistance2(distance) {
    let time = distance
    let days = Math.floor(time / (24 * 3600 * 1000))
    let temp1 = time % (24 * 3600 * 1000)
    let hours = Math.floor(temp1 / (3600 * 1000))
    let temp2 = temp1 % (3600 * 1000)
    let minutes = Math.floor(temp2 / (60 * 1000))
    if (time <= 60 * 1000) {
        minutes = 1
    }
    let temp3 = temp2 % (60 * 1000)
    let seconds = Math.round(temp3 / 1000)
    return [hours, minutes] //["0", "0", "2", "7", "33", "30"]0年0月2日 7时33分30秒
}

/**
 * 判断是否为iphoneX
 * @returns {boolean}
 */
export function isIphoneX() {
    const dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896))
    )
}


export function isIphoneNum(mun) {
    const dimen = Dimensions.get('window');
    var topMum = mun;
    if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS
        && ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896))) {
        topMum = mun + 20;
    }
    return scaleSize(topMum)
}

/**
 * 根据是否是iPhoneX返回不同的样式
 * @param iphoneXStyle
 * @param iosStyle
 * @param androidStyle
 * @returns {*}
 */
export function ifIphoneX(iphoneXStyle, iosStyle = {}, androidStyle) {
    if (isIphoneX()) {
        return iphoneXStyle
    } else if (Platform.OS === 'ios') {
        return iosStyle
    } else {
        if (androidStyle) return androidStyle
        return iosStyle
    }
}


export function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
}
export function Accuracy(num, len) {
    const wordCount = num + ''
    var countNum = num;
    if (wordCount.length > 4 && wordCount.length < 9) {
        countNum = parseInt(wordCount.substring(0, wordCount.length - 4) + '.' + wordCount.substring(wordCount.length - 4, wordCount.length)).toFixed(len || 0)
    } else if (wordCount.length > 8) {
        countNum = parseInt(wordCount.substring(0, wordCount.length - 8) + '.' + wordCount.substring(wordCount.length - 8, wordCount.length - 7)).toFixed(len || 0)
    }
    return countNum;
}
export function AccuracyNUm(num) {
    const wordCount = num + ''
    var countNum = '';
    if (wordCount.length > 4 && wordCount.length < 9) {
        countNum = '万'
    } else if (wordCount.length > 8) {
        countNum = '亿'
    }
    return countNum;

}

export function insertionSort(array) {
    for (var i = 1; i < array.length; i++) {
        var key = array[i];
        var j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
        }
        array[j + 1] = key;
    }
    return array;
}
export function insertionSortJSON(array) {
    for (var i = 1; i < array.length; i++) {
        var key = array[i];
        var j = i - 1;
        while (j >= 0 && array[j].seqNum > key.seqNum) {
            array[j + 1] = array[j];
            j--;
        }
        array[j + 1] = key;
    }
    return array;
}

export default class ScreenUtil {
    static screenW = screenW
    static screenH = screenH
    static pixelRatio = pixelRatio
    static DEFAULT_DENSITY = DEFAULT_DENSITY
    static setSpText(size) {
        return setSpText(size)
    }

    static scaleSize(size) {
        return scaleSize(size)
    }

    static getRemainingimeDistance(distance) {
        return getRemainingimeDistance(distance)
    }

    static toDate(timestamp, format1 = 'yyyy-MM-dd hh:mm:ss') {
        return toDate(timestamp, format1)
    }

    static toTimestamp(date) {
        return toTimestamp(date)
    }

    static getTaskTime(strDate) {
        return getTaskTime(strDate)
    }
    static guid() {
        return guid()
    }

    static Accuracy(num) {
        return Accuracy(num)
    }
    static AccuracyNUm(num) {
        return AccuracyNUm(num)
    }
    static getRemainingimeDistance2(distance) {
        return getRemainingimeDistance2(distance)
    }
    static insertionSort(array) {
        return insertionSort(array)
    }
    static insertionSortJSON(array) {
        return insertionSortJSON(array)
    }
}


