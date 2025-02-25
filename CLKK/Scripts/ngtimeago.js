﻿'use strict';

var catalyst = angular.module('ngtimeago', []);


catalyst.filter('timeago', function() {
    return function (input, p_allowFuture) {
            var nowDate = (new Date()),
             date = (new Date(input));
            var days = (nowDate-date) / (1000 * 60 * 60 * 24);
            var diff = Math.round(days);
            var strper = "";
            if (nowDate.getDate() == date.getDate()) {
                //strper = "hôm nay";
            } else if (diff==1) {
                strper = "hôm qua";
            } else {
                if (date.getFullYear() === nowDate.getFullYear()) {
                    strper = moment(date).format('DD/MM');
                } else {
                    strper = moment(date).format('DD/MM/YYYY');
                }
            }
            return moment(date).format('HH:mm') + " " + strper;
		    //
            var substitute = function (stringOrFunction, number, strings) {
                    var string = angular.isFunction(stringOrFunction) ? stringOrFunction(number, dateDifference) : stringOrFunction;
                    var value = (strings.numbers && strings.numbers[number]) || number;
                    return string.replace(/%d/i, value);
                },
                nowTime = (new Date()).getTime(),
                date = (new Date(input)).getTime(),
                //refreshMillis= 6e4, //A minute
                allowFuture = p_allowFuture || false,
                strings= {
                    prefixAgo: '',
                    prefixFromNow: '',
                    suffixAgo: "trước",
                    suffixFromNow: "from now",
                    seconds: "mới 1 phút trước",
                    minute: "khoảng 1 phút",
                    minutes: "%d phút",
                    hour: "khoảng 1 giờ",
                    hours: "khoảng %d giờ",
                    day: "1 ngày",
                    days: "%d ngày",
                    month: "khoảng 1 tháng",
                    months: "%d tháng",
                    year: "khoảng 1 năm",
                    years: "%d năm"
                },
                dateDifference = nowTime - date,
                words,
                seconds = Math.abs(dateDifference) / 1000,
                minutes = seconds / 60,
                hours = minutes / 60,
                days = hours / 24,
                years = days / 365,
                separator = strings.wordSeparator === undefined ?  " " : strings.wordSeparator,
            
               
                prefix = strings.prefixAgo,
                suffix = strings.suffixAgo;
                
            if (allowFuture) {
                if (dateDifference < 0) {
                    prefix = strings.prefixFromNow;
                    suffix = strings.suffixFromNow;
                }
            }

            words = seconds < 45 && substitute(strings.seconds, Math.round(seconds), strings) ||
            seconds < 90 && substitute(strings.minute, 1, strings) ||
            minutes < 45 && substitute(strings.minutes, Math.round(minutes), strings) ||
            minutes < 90 && substitute(strings.hour, 1, strings) ||
            hours < 24 && substitute(strings.hours, Math.round(hours), strings) ||
            hours < 42 && substitute(strings.day, 1, strings) ||
            days < 30 && substitute(strings.days, Math.round(days), strings) ||
            days < 45 && substitute(strings.month, 1, strings) ||
            days < 365 && substitute(strings.months, Math.round(days / 30), strings) ||
            years < 1.5 && substitute(strings.year, 1, strings) ||
            substitute(strings.years, Math.round(years), strings);
			//console.log(prefix+words+suffix+separator);
			prefix.replace(/ /g, '')
			words.replace(/ /g, '')
			suffix.replace(/ /g, '')
			return (prefix+' '+words+' '+suffix+' '+separator);
            
        };
    });

    
