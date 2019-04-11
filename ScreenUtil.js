/**
 * 屏幕工具类
 * ui设计基准,iphone 6
 * width:750px
 * height:1334px
 */
import { PixelRatio, Dimensions, Platform } from 'react-native'

export let screenW = Dimensions.get('window').width
export let screenH = Dimensions.get('window').height
const fontScale = PixelRatio.getFontScale()
export let pixelRatio = PixelRatio.get()
//像素密度
export const DEFAULT_DENSITY = 2
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
    if (time < 0) {
        return ['0', '0', '0', '0', '0', '0']
    }
    let year = Math.floor(time / (365 * 30 * 24 * 3600 * 1000)) //年

    let month = Math.floor(time / (30 * 24 * 3600 * 1000)) //月

    let days = Math.floor(time / (24 * 3600 * 1000)) //日
    let temp1 = time % (24 * 3600 * 1000)
    let temp2 = temp1 % (3600 * 1000)
    let minutes = Math.floor(temp2 / (60 * 1000)) //分
    let hours = Math.floor(temp1 / (3600 * 1000)) //时
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
    return (
        Platform.OS === 'ios' &&
        ((screenH === X_HEIGHT && screenW === X_WIDTH) ||
            (screenH === X_WIDTH && screenW === X_HEIGHT))
    )
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

    static getRemainingimeDistance2(distance) {
        return getRemainingimeDistance2(distance)
    }
}

export function formatDate(value, type, callback) {
    var type = type || '';
    var secondTime = parseInt(value); // 秒
    var minuteTime = 0; // 分
    var hourTime = 0; // 小时
    if (secondTime >= 60) {
        //如果秒数大于60，将秒数转换成整数
        //获取分钟，除以60取整数，得到整数分钟
        minuteTime = parseInt(secondTime / 60);
        //获取秒数，秒数取佘，得到整数秒数
        secondTime = parseInt(secondTime % 60);
        //如果分钟大于60，将分钟转换成小时
        if (minuteTime >= 60) {
            //获取小时，获取分钟除以60，得到整数小时
            hourTime = parseInt(minuteTime / 60);
            //获取小时后取佘的分，获取分钟除以60取佘的分
            minuteTime = parseInt(minuteTime % 60);
        }
    }
    var result = '00:' + checkTime(parseInt(secondTime)); //+ "秒";

    if (minuteTime > 0) {
        result = '' + checkTime(parseInt(minuteTime)) + ':' + checkTime(parseInt(secondTime));
    }
    if (hourTime > 0) {
        result = '' + checkTime(parseInt(hourTime)) + ':' + checkTime(parseInt(minuteTime)) + ':' + checkTime(parseInt(secondTime));
    }
    var data = {
        result: result,
        type: type
    }
    callback && callback(data);
    return result;
}


/** 时间格式化 */
function checkTime(i) {
    //将0-9的数字前面加上0，例1变为01
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}