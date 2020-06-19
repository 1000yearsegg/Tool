"use strict";

/**
 * JS工具类
 */
function JSTool() {
    if(typeof this.millisecond2Date !== "function") {
	    /**
	     * 时间戳（毫秒）格式化为指定的日期格式
	     * @param  {[all]} millisecond 毫秒值
	     * @param  {[type]} format 日期格式
	     */
	    JSTool.prototype.millisecond2Date = function(millisecond, format) {
	        var millisecondInt = parseInt(millisecond);
	        if (!isNaN(millisecondInt)) {
	            var millisecondLen = millisecondInt.toString().length;
	            if (millisecondLen === 10) {
	                millisecondInt = millisecondInt * 1000;
	            }
	            if (millisecondLen !== 10 && millisecondLen !== 13) {
	                return millisecond;
	            }
	            var date = new Date(millisecondInt);
	            var map = {
	                'M': date.getMonth() + 1, // 月份
	                'D': date.getDate(), // 日
	                'W': date.getDay(), // 星期几
	                'h': date.getHours(), // 小时
	                'm': date.getMinutes(), // 分
	                's': date.getSeconds(), // 秒
	                'q': Math.floor((date.getMonth() + 3) / 3), // 季度
	                'S': date.getMilliseconds() // 毫秒
	            };
	            format = format.replace(/([YMDhmsqSW])+/g, function(all, t) {
	                var v = map[t];
	                if (v !== undefined) {
	                    if (all.length > 1) {
	                        v = '0' + v;
	                        v = v.substr(v.length - 2);
	                    }
	                    // 如果是星期格式
	                    if (t === 'W') {
	                        var weekArray = new Array("日", "一", "二", "三", "四", "五", "六"),
	                            week = weekArray[date.getDay()];
	                        v = week;
	                    }
	                    return v;
	                } else if (t === 'Y') {
	                    return (date.getFullYear() + '').substr(4 - all.length);
	                }

	                return all;
	            });
	            return format;
	        } else {
	            return millisecond;
	        }
	    };
    }

    if(typeof this.getQueryVariable !== "function") {
	    /**
	     * 获取url中的参数
	     * @param  {[string]} variable 参数名
	     */
		JSTool.prototype.getQueryVariable = function(variable) {
	        var query = window.location.search.substring(1);
	        var vars = query.split("&");
	        for (var i = 0; i < vars.length; i++) {
	            var pair = vars[i].split("=");
	            if (pair[0] == variable) { return pair[1]; }
	        }
	        return (false);
	    }
    }
}