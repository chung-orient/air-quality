document.addEventListener('DOMContentLoaded', function () {
    if (Notification.permission !== "granted")
        Notification.requestPermission();
});
//document.onkeypress = function (event) {
//    event = (event || window.event);
//    if (event.keyCode == 123 || event.ctrlKey) {
//        //alert(‘No F-12’);
//        return false;
//    }
//}
//document.onmousedown = function (event) {
//    event = (event || window.event);
//    if (event.keyCode == 123 || event.ctrlKey) {
//        //alert(‘No F-keys’);
//        return false;
//}
//document.onkeydown = function (event) {
//    event = (event || window.event);
//    if (event.keyCode == 123 || event.ctrlKey) {
//        return false;
//    }
//}
//============================== Format Report =================================
function returnDate(string) { //string "dd/MM/yyyy"
    let dd = string.split("/")[0];
    let mm = parseInt(string.split("/")[1]) - 1;
    let yyyy = string.split("/")[2];
    let stringToDate = new Date(yyyy, mm, dd);
    return stringToDate;
}
function autoGenHtml(data) { //-data: it's my data convert to html . -isExport: it's print or export excel. -isType: it's used when exists $stateParams.id
    var htmltable = "";
    htmltable = "<font face='Times New Roman'>";
    htmltable += "<div style='text-align: center; margin: 0 auto;'>";
    data.forEach(function (row, k) {
        //==================================== Convert =====================================
        //let defaultFormat = $scope.formatFinal.find(x => x.valueFormat === row.valueFormat);
        let setPadding = '';
        //    = "padding: 0 75px 0 120px";
        //if (defaultFormat.text === 'table') setPadding = "padding: 0 85px 0 130px";
        htmltable += "<table style='" + setPadding + ";margin: 0 auto;border-spacing:0;' border='0' width='1024 !important' cellpadding='10'>";
        switch (row.valueFormat) {
            case 4:
                htmltable += "<tbody><tr>";
                htmltable += bindTextColumn(row);
                htmltable += "</tr></tbody>";
                break;
            case 1:
                htmltable += "<tbody>";
                htmltable += bindTextRow(row);
                htmltable += "</tbody>";
                break;
            case 2:
                htmltable += "<tbody><tr>";
                htmltable += bindTextColumn(row);
                htmltable += "</tr></tbody>";
                break;
            case 3:
                htmltable += "<thead>";
                htmltable += bindTheadTable(row);
                htmltable += "</thead>";
                htmltable += "<tbody>";
                htmltable += bindTbodyTable(row);
                htmltable += "</tbody>";
                break;
        }
        htmltable += "</table>";
        //==================================== Row =====================================
    });
    htmltable += "</div>";
    htmltable += "</font>";
    return htmltable;
};
function formatText(type, value) {
    switch (type) { //Format type value text
        case 1: //In hoa chữ đậm
            value = "<span style='font-weight:bold;'>" + value + "</span>";
            break;
        case 2: //datetime
            if (value != null && value != '') value = returnDate(value);
            value = "<span>" + ("0" + value.getDate()).slice(-2) + " tháng " + ("0" + (value.getMonth() + 1)).slice(-2) + " năm " + value.getFullYear() + "</span>";
            break;
        case 3: //underline
            value = "<div style='border-top:1.5px solid #000;margin:0px 100px;'></div>";
            break;
        case 4: //Tyle
            value = value + " %";
            break;
        case 5: //style italic
            value = "<span style='font-style: italic;'>" + value + "</span>";
            break;
        default:

            break;
    }
    return value;
};
function bindTextRow(row) {
    let html = "";
    row.dataChild.forEach(function (child) {
        let text = "";
        if (child.value != null) {
            text = child.value;
        }
        let textFormat = formatText(child.type, text);
        if (child.name && row.valueFormat === 0) {
            html += "<tr><td rowspan='" + child.rowspan + "' colspan='" + child.colspan + "' width='50%' style='" + child.style + ";padding: 0;font-size:16px;font-size:" + child.font_size + ";text-align: " + child.align + "; font-weight: " + child.font_weight + "; font-style: " + child.font_style + "; text-transform: " + child.text_transform + "; padding: " + child.padding + "'><span style='word-wrap:break-word;'>" + child.name + ": " + textFormat + "</span></td></tr>";
        }
        else if (child.name && !child.data) {
            html += "<tr><td rowspan='" + child.rowspan + "' colspan='" + child.colspan + "' width='50%' style='" + child.style + ";font-size:16px;font-size:" + child.font_size + ";text-align: " + child.align + "; font-weight: " + child.font_weight + "; font-style: " + child.font_style + "; text-transform: " + child.text_transform + "; padding: " + child.padding + "'><span style='word-wrap:break-word;'>" + child.name + ": " + textFormat + "</span></td></tr>";
        }
        else if (!child.name && !child.data) {
            html += "<tr><td rowspan='" + child.rowspan + "' colspan='" + child.colspan + "' width='50%' style='" + child.style + ";font-size:16px;margin-top:0;font-size:" + child.font_size + ";text-align: " + child.align + "; font-weight: " + child.font_weight + "; font-style: " + child.font_style + "; text-transform: " + child.text_transform + "; padding: " + child.padding + "'><span style='word-wrap:break-word;'>" + textFormat + "</span></td></tr>";
        }
    });
    return html;
};
function bindTextColumn(row) {
    let html = "";
    row.dataChild.forEach(function (child) {
        let text = "";
        if (child.value != null) {
            text = child.value;
        }
        let textFormat = formatText(child.type, text);
        if (child.name && !child.data) {
            html += "<td rowspan='" + child.rowspan + "' colspan='" + child.colspan + "' width='" + (100 / row.dataChild.length) + "%' style='font-size:16px;" + child.style + "; font-size:" + child.font_size + ";text-align: " + child.align + "; font-weight: " + child.font_weight + "; font-style: " + child.font_style + "; text-transform: " + child.text_transform + "; padding: " + child.padding + "'><span style='word-wrap:break-word;'>" + child.name + ": " + textFormat + "</span></td>";
        }
        else if (!child.name && !child.data) {
            html += "<td rowspan='" + child.rowspan + "' colspan='" + child.colspan + "' width='" + (100 / row.dataChild.length) + "%' style='font-size:16px;" + child.style + ";font-size:" + child.font_size + ";text-align: " + child.align + "; font-weight: " + child.font_weight + "; font-style: " + child.font_style + "; text-transform: " + child.text_transform + "; padding: " + child.padding + "'><span style='word-wrap:break-word;'>" + textFormat + "</span></td>";
        }
    });
    return html;
};
function bindTheadTable(row) {
    let html = "";
    if (row.dataChild.dataChildrenName != null && row.dataChild.dataChildrenName.length > 0) {
        row.dataChild.dataChildrenName.forEach(function (children) {
            html += "<tr>";
            children.forEach(function (element) {
                html += "<td align='center' colspan='" + element.colspan + "' rowspan='" + element.rowspan + "' style='border: 1px solid gray; " + element.style + " ; width:" + element.width + "; min-width:" + element.min_width + "; max-width:" + element.max_width + ";font-size:" + element.font_size + ";text-align: " + element.align + "; font-weight: " + element.font_weight + "; font-style: " + element.font_style + "; text-transform: " + element.text_transform + "'>" + element.name + "</td>";
            });
            html += "</tr>";
        });
    }
    return html;
};
function bindTbodyTable(row) {
    let html = "";
    if (row.dataChild.dataChildren != null && row.dataChild.dataChildren.length > 0) {
        row.dataChild.dataChildren.forEach(function (children, key) {
            html += "<tr>";
            children.forEach(function (column) {
                if (!column.value) column.value = '';
                column.value = formatText(column.type, column.value);
                html += "<td align='center' colspan='" + column.colspan + "' rowspan='" + column.rowspan + "' style='border: 1px solid gray; " + column.style + " ; width:" + column.width + "; min-width:" + column.min_width + "; max-width:" + column.max_width + ";font-size:" + column.font_size + ";text-align: " + column.align + "; font-weight: " + column.font_weight + "; font-style: " + column.font_style + "; text-transform: " + column.text_transform + "'>" + column.value + "</td>";
            });
            html += "</tr>";
        });
    }
    return html;
};
//==============================================================================
// Check Is email
function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    //alert("You have entered an invalid email address!")
    return (false)
}
function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
}
function formatInputDate(timeInput) {
    var value = timeInput.value;
    if (value.length == 2 || value.length == 5) timeInput.value = (timeInput.value + '/');
    return false;
}
function formatTime(timeInput) {

    intValidNum = timeInput.value;

    if (intValidNum < 24) {
        if (intValidNum.length == 2) {
            timeInput.value = timeInput.value + ":";
            return false;
        }
    }
    if (intValidNum == 24) {
        if (intValidNum.length == 2) {
            timeInput.value = timeInput.value.length - 2 + "0:";
            return false;
        }
    }
    if (intValidNum > 24) {
        if (intValidNum.length == 2) {
            timeInput.value = "";
            return false;
        }
    }

    //Here is where I had trouble targeting the
    //mm and ss in order to add conditions (see hh above).
    //I used slice to assist me.
    //Please let me know if any of you have suggestions/enhancements/corrections.

    if (intValidNum.length == 5 && intValidNum.slice(-2) < 60) {
        timeInput.value = timeInput.value + ":";
        return false;
    }
    if (intValidNum.length == 5 && intValidNum.slice(-2) > 60) {
        timeInput.value = timeInput.value.slice(0, 2) + ":";
        return false;
    }
    if (intValidNum.length == 5 && intValidNum.slice(-2) == 60) {
        timeInput.value = timeInput.value.slice(0, 2) + ":00:";
        return false;
    }


    if (intValidNum.length == 8 && intValidNum.slice(-2) > 60) {
        timeInput.value = timeInput.value.slice(0, 5) + ":";
        return false;
    }
    if (intValidNum.length == 8 && intValidNum.slice(-2) == 60) {
        timeInput.value = timeInput.value.slice(0, 5) + ":00";
        return false;
    }

} //end function
var browserName = (function () {
    var test = function (regexp) { return regexp.test(window.navigator.userAgent) }
    switch (true) {
        case test(/edg/i): return "Edge";
        case test(/trident/i): return "IE";
        case test(/firefox|fxios/i): return "Firefox";
        case test(/opr\//i): return "Opera";
        case test(/ucbrowser/i): return "UC Browser";
        case test(/coc_coc/i): return "Cốc Cốc";
        case test(/samsungbrowser/i): return "Samsung Browser";
        case test(/chrome|chromium|crios/i): return "Chrome";
        case test(/safari/i): return "Safari";
        default: return "Other";
    }
})();
var PlatFromName = (function () {
    var OSName = "Unknown OS";
    if (navigator.userAgent.indexOf("Win") != -1) OSName = "Windows";
    if (navigator.userAgent.indexOf("Mac") != -1) OSName = "Macintosh";
    if (navigator.userAgent.indexOf("Linux") != -1) OSName = "Linux";
    if (navigator.userAgent.indexOf("Android") != -1) OSName = "Android";
    if (navigator.userAgent.indexOf("like Mac") != -1) OSName = "iOS";
    return OSName;
})();
function compareDate(date1, date2) {
    var start = moment(date1);
    var end = moment(date2);
    var day = end.diff(start, "days")
    return day === 0;
};
function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = (performance && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if (d > 0) {//Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
function renderColor(p) {
    if (p >= 75) {
        return "#6dd230";
    }
    if (p >= 50) {
        return "#2196f3";
    }
    if (p >= 30) {
        return "#fe4d97";
    }
    if (p > 0) {
        return "red";
    }
    return "#eee";
}
function renderTxtColor(p) {
    if (p >= 75) {
        return "#fff";
    }
    if (p >= 50) {
        return "#fff";
    }
    if (p >= 30) {
        return "#fff";
    }
    if (p > 0) {
        return "#fff";
    }
    return "#000";
}
var timezone = 'Asia/Bangkok';
var Uutiens = [{ id: 0, value: "Bình thường" }, { id: 1, value: "Gấp" }, { id: 2, value: "Rất gấp" }];
var ListSort = [
    { id: 0, text: "A-Z" },
    { id: 1, text: "Z-A" },
    { id: 10, text: "Ngày lập cũ nhất" },
    { id: 11, text: "Ngày lập mới nhất" },
    { id: 2, text: "STT bé nhất" },
    { id: 9, text: "STT lớn nhất" },
    { id: 3, text: "Ngày tạo cũ nhất" },
    { id: 4, text: "Ngày tạo mới nhất" },
    { id: 6, text: "Ngày cập nhật cũ nhất" },
    { id: 7, text: "Cập nhật mới nhất" },
    { id: 5, text: "Số ngày quá hạn nhiều nhất" },
    { id: 8, text: "Số ngày quá hạn ít nhất" },
    { id: 12, text: "Ngày duyệt cũ nhất" },
    { id: 13, text: "Ngày duyệt mới nhất" },
    { id: 14, text: "Đánh giá thấp nhất" },
    { id: 15, text: "Đánh giá cao nhất" }
];
var Trangthais = [
    { id: 0, text: "Mới lập", class:"rqlap" },
    { id: 1, text: "Chờ duyệt", class:"rqchoduyet" },
    { id: 2, text: "Chấp thuận", class:"rqchapthuan" },
    { id: -2, text: "Từ chối", class:"rqtuchoi" },
    { id: -1, text: "Hủy", class:"rqhuy" },
    { id: 3, text: "Thu hồi", class:"rqthuhoi" },
    { id: -3, text: "Xóa", class:"rqxoa" }
];
var TrangthaiViews = [
    { id: 0, text: "Đề xuất mới được lập", class: "rqlap" },
    { id: 1, text: "Đề xuất đang chờ duyệt", class: "rqchoduyet" },
    { id: 2, text: "Đề xuất đã được chấp thuận", class: "rqchapthuan" },
    { id: -2, text: "Đề xuất đã bị từ chối", class: "rqtuchoi" },
    { id: -1, text: "Đề xuất đã được hủy", class: "rqhuy" },
    { id: 3, text: "Đề xuất đã được thu hồi", class: "rqthuhoi" },
    { id: -3, text: "Đề xuất đã xóa", class: "rqxoa" }
];
function formatMoneyVND(money) {
    if (money == 0 || money == null) {
        return 0;
    }
    var tmp = money.toString().split('').reverse().join('');
    var a = [];
    var len = tmp.length;
    var b = true;
    while (b) {
        if (tmp.indexOf(",") > 0) {
            tmp = tmp.replace(",", "");
            b = true;
        }
        else {
            b = false;
        }
    }
    b = true;
    while (b) {
        len = tmp.length;
        if (len % 3 != 0) {
            tmp = tmp.toString() + '0';
            b = true;
        }
        else {
            b = false;
        }
    }
    for (var i = 0; i < tmp.length; i += 3) {
        a.push(tmp[i] + tmp[i + 1] + tmp[i + 2]);
    }
    tmp = a.toString().split('').reverse().join('');
    b = true;
    while (b) {
        if (tmp[0] == 0 || tmp[0] == ',') {
            tmp = tmp.substr(1);
            b = true;
        }
        else {
            b = false;
        }
    }
    return tmp;
}

function removeformatDate(date) {
    if (date !== false) {
        var tmp = date.split('/').reverse();
        return tmp;
    }
    return 0;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function removeFormatMoneyVND(money) {
    if (money != 0) {
        var b = true;
        if (money != null) {
            money = money.toString();
        } else {
            return '';
        }
        while (b) {
            if (money.indexOf(",") > 0) {
                money = money.replace(",", "");
                b = true;
            }
            else {
                b = false;
            }
        }
    }
    return money;
}
Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
//if ($(window).width() > 1440) {
//    $('.app').addClass('is-collapsed');
//}
var groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};
var weekday = new Array(7);
weekday[0] = "Chủ nhật";
weekday[1] = "Thứ 2";
weekday[2] = "Thứ 3";
weekday[3] = "Thứ 4";
weekday[4] = "Thứ 5";
weekday[5] = "Thứ 6";
weekday[6] = "Thứ 7";
//////
var weekdayS = new Array(7);
weekdayS[0] = "CN";
weekdayS[1] = "T2";
weekdayS[2] = "T3";
weekdayS[3] = "T4";
weekdayS[4] = "T5";
weekdayS[5] = "T6";
weekdayS[6] = "T7";
var contentTypes = {
    ".323": "text/h323",
    ".3g2": "video/3gpp2",
    ".3gp": "video/3gpp",
    ".3gp2": "video/3gpp2",
    ".3gpp": "video/3gpp",
    ".7z": "application/x-7z-compressed",
    ".aa": "audio/audible",
    ".AAC": "audio/aac",
    ".aaf": "application/octet-stream",
    ".aax": "audio/vnd.audible.aax",
    ".ac3": "audio/ac3",
    ".aca": "application/octet-stream",
    ".accda": "application/msaccess.addin",
    ".accdb": "application/msaccess",
    ".accdc": "application/msaccess.cab",
    ".accde": "application/msaccess",
    ".accdr": "application/msaccess.runtime",
    ".accdt": "application/msaccess",
    ".accdw": "application/msaccess.webapplication",
    ".accft": "application/msaccess.ftemplate",
    ".acx": "application/internet-property-stream",
    ".AddIn": "text/xml",
    ".ade": "application/msaccess",
    ".adobebridge": "application/x-bridge-url",
    ".adp": "application/msaccess",
    ".ADT": "audio/vnd.dlna.adts",
    ".ADTS": "audio/aac",
    ".afm": "application/octet-stream",
    ".ai": "application/postscript",
    ".aif": "audio/x-aiff",
    ".aifc": "audio/aiff",
    ".aiff": "audio/aiff",
    ".air": "application/vnd.adobe.air-application-installer-package+zip",
    ".amc": "application/x-mpeg",
    ".application": "application/x-ms-application",
    ".art": "image/x-jg",
    ".asa": "application/xml",
    ".asax": "application/xml",
    ".ascx": "application/xml",
    ".asd": "application/octet-stream",
    ".asf": "video/x-ms-asf",
    ".ashx": "application/xml",
    ".asi": "application/octet-stream",
    ".asm": "text/plain",
    ".asmx": "application/xml",
    ".aspx": "application/xml",
    ".asr": "video/x-ms-asf",
    ".asx": "video/x-ms-asf",
    ".atom": "application/atom+xml",
    ".au": "audio/basic",
    ".avi": "video/x-msvideo",
    ".axs": "application/olescript",
    ".bas": "text/plain",
    ".bcpio": "application/x-bcpio",
    ".bin": "application/octet-stream",
    ".bmp": "image/bmp",
    ".c": "text/plain",
    ".cab": "application/octet-stream",
    ".caf": "audio/x-caf",
    ".calx": "application/vnd.ms-office.calx",
    ".cat": "application/vnd.ms-pki.seccat",
    ".cc": "text/plain",
    ".cd": "text/plain",
    ".cdda": "audio/aiff",
    ".cdf": "application/x-cdf",
    ".cer": "application/x-x509-ca-cert",
    ".chm": "application/octet-stream",
    ".class": "application/x-java-applet",
    ".clp": "application/x-msclip",
    ".cmx": "image/x-cmx",
    ".cnf": "text/plain",
    ".cod": "image/cis-cod",
    ".config": "application/xml",
    ".contact": "text/x-ms-contact",
    ".coverage": "application/xml",
    ".cpio": "application/x-cpio",
    ".cpp": "text/plain",
    ".crd": "application/x-mscardfile",
    ".crl": "application/pkix-crl",
    ".crt": "application/x-x509-ca-cert",
    ".cs": "text/plain",
    ".csdproj": "text/plain",
    ".csh": "application/x-csh",
    ".csproj": "text/plain",
    ".css": "text/css",
    ".csv": "text/csv",
    ".cur": "application/octet-stream",
    ".cxx": "text/plain",
    ".dat": "application/octet-stream",
    ".datasource": "application/xml",
    ".dbproj": "text/plain",
    ".dcr": "application/x-director",
    ".def": "text/plain",
    ".deploy": "application/octet-stream",
    ".der": "application/x-x509-ca-cert",
    ".dgml": "application/xml",
    ".dib": "image/bmp",
    ".dif": "video/x-dv",
    ".dir": "application/x-director",
    ".disco": "text/xml",
    ".dll": "application/x-msdownload",
    ".dll.config": "text/xml",
    ".dlm": "text/dlm",
    ".doc": "application/msword",
    ".docm": "application/vnd.ms-word.document.macroEnabled.12",
    ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ".dot": "application/msword",
    ".dotm": "application/vnd.ms-word.template.macroEnabled.12",
    ".dotx": "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
    ".dsp": "application/octet-stream",
    ".dsw": "text/plain",
    ".dtd": "text/xml",
    ".dtsConfig": "text/xml",
    ".dv": "video/x-dv",
    ".dvi": "application/x-dvi",
    ".dwf": "drawing/x-dwf",
    ".dwp": "application/octet-stream",
    ".dxr": "application/x-director",
    ".eml": "message/rfc822",
    ".emz": "application/octet-stream",
    ".eot": "application/octet-stream",
    ".eps": "application/postscript",
    ".etl": "application/etl",
    ".etx": "text/x-setext",
    ".evy": "application/envoy",
    ".exe": "application/octet-stream",
    ".exe.config": "text/xml",
    ".fdf": "application/vnd.fdf",
    ".fif": "application/fractals",
    ".filters": "Application/xml",
    ".fla": "application/octet-stream",
    ".flr": "x-world/x-vrml",
    ".flv": "video/x-flv",
    ".fsscript": "application/fsharp-script",
    ".fsx": "application/fsharp-script",
    ".generictest": "application/xml",
    ".gif": "image/gif",
    ".group": "text/x-ms-group",
    ".gsm": "audio/x-gsm",
    ".gtar": "application/x-gtar",
    ".gz": "application/x-gzip",
    ".h": "text/plain",
    ".hdf": "application/x-hdf",
    ".hdml": "text/x-hdml",
    ".hhc": "application/x-oleobject",
    ".hhk": "application/octet-stream",
    ".hhp": "application/octet-stream",
    ".hlp": "application/winhlp",
    ".hpp": "text/plain",
    ".hqx": "application/mac-binhex40",
    ".hta": "application/hta",
    ".htc": "text/x-component",
    ".htm": "text/html",
    ".html": "text/html",
    ".htt": "text/webviewhtml",
    ".hxa": "application/xml",
    ".hxc": "application/xml",
    ".hxd": "application/octet-stream",
    ".hxe": "application/xml",
    ".hxf": "application/xml",
    ".hxh": "application/octet-stream",
    ".hxi": "application/octet-stream",
    ".hxk": "application/xml",
    ".hxq": "application/octet-stream",
    ".hxr": "application/octet-stream",
    ".hxs": "application/octet-stream",
    ".hxt": "text/html",
    ".hxv": "application/xml",
    ".hxw": "application/octet-stream",
    ".hxx": "text/plain",
    ".i": "text/plain",
    ".ico": "image/x-icon",
    ".ics": "application/octet-stream",
    ".idl": "text/plain",
    ".ief": "image/ief",
    ".iii": "application/x-iphone",
    ".inc": "text/plain",
    ".inf": "application/octet-stream",
    ".inl": "text/plain",
    ".ins": "application/x-internet-signup",
    ".ipa": "application/x-itunes-ipa",
    ".ipg": "application/x-itunes-ipg",
    ".ipproj": "text/plain",
    ".ipsw": "application/x-itunes-ipsw",
    ".iqy": "text/x-ms-iqy",
    ".isp": "application/x-internet-signup",
    ".ite": "application/x-itunes-ite",
    ".itlp": "application/x-itunes-itlp",
    ".itms": "application/x-itunes-itms",
    ".itpc": "application/x-itunes-itpc",
    ".IVF": "video/x-ivf",
    ".jar": "application/java-archive",
    ".java": "application/octet-stream",
    ".jck": "application/liquidmotion",
    ".jcz": "application/liquidmotion",
    ".jfif": "image/pjpeg",
    ".jnlp": "application/x-java-jnlp-file",
    ".jpb": "application/octet-stream",
    ".jpe": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    ".js": "application/x-javascript",
    ".json": "application/json",
    ".jsx": "text/jscript",
    ".jsxbin": "text/plain",
    ".latex": "application/x-latex",
    ".library-ms": "application/windows-library+xml",
    ".lit": "application/x-ms-reader",
    ".loadtest": "application/xml",
    ".lpk": "application/octet-stream",
    ".lsf": "video/x-la-asf",
    ".lst": "text/plain",
    ".lsx": "video/x-la-asf",
    ".lzh": "application/octet-stream",
    ".m13": "application/x-msmediaview",
    ".m14": "application/x-msmediaview",
    ".m1v": "video/mpeg",
    ".m2t": "video/vnd.dlna.mpeg-tts",
    ".m2ts": "video/vnd.dlna.mpeg-tts",
    ".m2v": "video/mpeg",
    ".m3u": "audio/x-mpegurl",
    ".m3u8": "audio/x-mpegurl",
    ".m4a": "audio/m4a",
    ".m4b": "audio/m4b",
    ".m4p": "audio/m4p",
    ".m4r": "audio/x-m4r",
    ".m4v": "video/x-m4v",
    ".mac": "image/x-macpaint",
    ".mak": "text/plain",
    ".man": "application/x-troff-man",
    ".manifest": "application/x-ms-manifest",
    ".map": "text/plain",
    ".master": "application/xml",
    ".mda": "application/msaccess",
    ".mdb": "application/x-msaccess",
    ".mde": "application/msaccess",
    ".mdp": "application/octet-stream",
    ".me": "application/x-troff-me",
    ".mfp": "application/x-shockwave-flash",
    ".mht": "message/rfc822",
    ".mhtml": "message/rfc822",
    ".mid": "audio/mid",
    ".midi": "audio/mid",
    ".mix": "application/octet-stream",
    ".mk": "text/plain",
    ".mmf": "application/x-smaf",
    ".mno": "text/xml",
    ".mny": "application/x-msmoney",
    ".mod": "video/mpeg",
    ".mov": "video/quicktime",
    ".movie": "video/x-sgi-movie",
    ".mp2": "video/mpeg",
    ".mp2v": "video/mpeg",
    ".mp3": "audio/mpeg",
    ".mp4": "video/mp4",
    ".mp4v": "video/mp4",
    ".mpa": "video/mpeg",
    ".mpe": "video/mpeg",
    ".mpeg": "video/mpeg",
    ".mpf": "application/vnd.ms-mediapackage",
    ".mpg": "video/mpeg",
    ".mpp": "application/vnd.ms-project",
    ".mpv2": "video/mpeg",
    ".mqv": "video/quicktime",
    ".ms": "application/x-troff-ms",
    ".msi": "application/octet-stream",
    ".mso": "application/octet-stream",
    ".mts": "video/vnd.dlna.mpeg-tts",
    ".mtx": "application/xml",
    ".mvb": "application/x-msmediaview",
    ".mvc": "application/x-miva-compiled",
    ".mxp": "application/x-mmxp",
    ".nc": "application/x-netcdf",
    ".nsc": "video/x-ms-asf",
    ".nws": "message/rfc822",
    ".ocx": "application/octet-stream",
    ".oda": "application/oda",
    ".odc": "text/x-ms-odc",
    ".odh": "text/plain",
    ".odl": "text/plain",
    ".odp": "application/vnd.oasis.opendocument.presentation",
    ".ods": "application/oleobject",
    ".odt": "application/vnd.oasis.opendocument.text",
    ".one": "application/onenote",
    ".onea": "application/onenote",
    ".onepkg": "application/onenote",
    ".onetmp": "application/onenote",
    ".onetoc": "application/onenote",
    ".onetoc2": "application/onenote",
    ".orderedtest": "application/xml",
    ".osdx": "application/opensearchdescription+xml",
    ".p10": "application/pkcs10",
    ".p12": "application/x-pkcs12",
    ".p7b": "application/x-pkcs7-certificates",
    ".p7c": "application/pkcs7-mime",
    ".p7m": "application/pkcs7-mime",
    ".p7r": "application/x-pkcs7-certreqresp",
    ".p7s": "application/pkcs7-signature",
    ".pbm": "image/x-portable-bitmap",
    ".pcast": "application/x-podcast",
    ".pct": "image/pict",
    ".pcx": "application/octet-stream",
    ".pcz": "application/octet-stream",
    ".pdf": "application/pdf",
    ".pfb": "application/octet-stream",
    ".pfm": "application/octet-stream",
    ".pfx": "application/x-pkcs12",
    ".pgm": "image/x-portable-graymap",
    ".pic": "image/pict",
    ".pict": "image/pict",
    ".pkgdef": "text/plain",
    ".pkgundef": "text/plain",
    ".pko": "application/vnd.ms-pki.pko",
    ".pls": "audio/scpls",
    ".pma": "application/x-perfmon",
    ".pmc": "application/x-perfmon",
    ".pml": "application/x-perfmon",
    ".pmr": "application/x-perfmon",
    ".pmw": "application/x-perfmon",
    ".png": "image/png",
    ".pnm": "image/x-portable-anymap",
    ".pnt": "image/x-macpaint",
    ".pntg": "image/x-macpaint",
    ".pnz": "image/png",
    ".pot": "application/vnd.ms-powerpoint",
    ".potm": "application/vnd.ms-powerpoint.template.macroEnabled.12",
    ".potx": "application/vnd.openxmlformats-officedocument.presentationml.template",
    ".ppa": "application/vnd.ms-powerpoint",
    ".ppam": "application/vnd.ms-powerpoint.addin.macroEnabled.12",
    ".ppm": "image/x-portable-pixmap",
    ".pps": "application/vnd.ms-powerpoint",
    ".ppsm": "application/vnd.ms-powerpoint.slideshow.macroEnabled.12",
    ".ppsx": "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
    ".ppt": "application/vnd.ms-powerpoint",
    ".pptm": "application/vnd.ms-powerpoint.presentation.macroEnabled.12",
    ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ".prf": "application/pics-rules",
    ".prm": "application/octet-stream",
    ".prx": "application/octet-stream",
    ".ps": "application/postscript",
    ".psc1": "application/PowerShell",
    ".psd": "application/octet-stream",
    ".psess": "application/xml",
    ".psm": "application/octet-stream",
    ".psp": "application/octet-stream",
    ".pub": "application/x-mspublisher",
    ".pwz": "application/vnd.ms-powerpoint",
    ".qht": "text/x-html-insertion",
    ".qhtm": "text/x-html-insertion",
    ".qt": "video/quicktime",
    ".qti": "image/x-quicktime",
    ".qtif": "image/x-quicktime",
    ".qtl": "application/x-quicktimeplayer",
    ".qxd": "application/octet-stream",
    ".ra": "audio/x-pn-realaudio",
    ".ram": "audio/x-pn-realaudio",
    ".rar": "application/octet-stream",
    ".ras": "image/x-cmu-raster",
    ".rat": "application/rat-file",
    ".rc": "text/plain",
    ".rc2": "text/plain",
    ".rct": "text/plain",
    ".rdlc": "application/xml",
    ".resx": "application/xml",
    ".rf": "image/vnd.rn-realflash",
    ".rgb": "image/x-rgb",
    ".rgs": "text/plain",
    ".rm": "application/vnd.rn-realmedia",
    ".rmi": "audio/mid",
    ".rmp": "application/vnd.rn-rn_music_package",
    ".roff": "application/x-troff",
    ".rpm": "audio/x-pn-realaudio-plugin",
    ".rqy": "text/x-ms-rqy",
    ".rtf": "application/rtf",
    ".rtx": "text/richtext",
    ".ruleset": "application/xml",
    ".s": "text/plain",
    ".safariextz": "application/x-safari-safariextz",
    ".scd": "application/x-msschedule",
    ".sct": "text/scriptlet",
    ".sd2": "audio/x-sd2",
    ".sdp": "application/sdp",
    ".sea": "application/octet-stream",
    ".searchConnector-ms": "application/windows-search-connector+xml",
    ".setpay": "application/set-payment-initiation",
    ".setreg": "application/set-registration-initiation",
    ".settings": "application/xml",
    ".sgimb": "application/x-sgimb",
    ".sgml": "text/sgml",
    ".sh": "application/x-sh",
    ".shar": "application/x-shar",
    ".shtml": "text/html",
    ".sit": "application/x-stuffit",
    ".sitemap": "application/xml",
    ".skin": "application/xml",
    ".sldm": "application/vnd.ms-powerpoint.slide.macroEnabled.12",
    ".sldx": "application/vnd.openxmlformats-officedocument.presentationml.slide",
    ".slk": "application/vnd.ms-excel",
    ".sln": "text/plain",
    ".slupkg-ms": "application/x-ms-license",
    ".smd": "audio/x-smd",
    ".smi": "application/octet-stream",
    ".smx": "audio/x-smd",
    ".smz": "audio/x-smd",
    ".snd": "audio/basic",
    ".snippet": "application/xml",
    ".snp": "application/octet-stream",
    ".sol": "text/plain",
    ".sor": "text/plain",
    ".spc": "application/x-pkcs7-certificates",
    ".spl": "application/futuresplash",
    ".src": "application/x-wais-source",
    ".srf": "text/plain",
    ".SSISDeploymentManifest": "text/xml",
    ".ssm": "application/streamingmedia",
    ".sst": "application/vnd.ms-pki.certstore",
    ".stl": "application/vnd.ms-pki.stl",
    ".sv4cpio": "application/x-sv4cpio",
    ".sv4crc": "application/x-sv4crc",
    ".svc": "application/xml",
    ".swf": "application/x-shockwave-flash",
    ".t": "application/x-troff",
    ".tar": "application/x-tar",
    ".tcl": "application/x-tcl",
    ".testrunconfig": "application/xml",
    ".testsettings": "application/xml",
    ".tex": "application/x-tex",
    ".texi": "application/x-texinfo",
    ".texinfo": "application/x-texinfo",
    ".tgz": "application/x-compressed",
    ".thmx": "application/vnd.ms-officetheme",
    ".thn": "application/octet-stream",
    ".tif": "image/tiff",
    ".tiff": "image/tiff",
    ".tlh": "text/plain",
    ".tli": "text/plain",
    ".toc": "application/octet-stream",
    ".tr": "application/x-troff",
    ".trm": "application/x-msterminal",
    ".trx": "application/xml",
    ".ts": "video/vnd.dlna.mpeg-tts",
    ".tsv": "text/tab-separated-values",
    ".ttf": "application/octet-stream",
    ".tts": "video/vnd.dlna.mpeg-tts",
    ".txt": "text/plain",
    ".u32": "application/octet-stream",
    ".uls": "text/iuls",
    ".user": "text/plain",
    ".ustar": "application/x-ustar",
    ".vb": "text/plain",
    ".vbdproj": "text/plain",
    ".vbk": "video/mpeg",
    ".vbproj": "text/plain",
    ".vbs": "text/vbscript",
    ".vcf": "text/x-vcard",
    ".vcproj": "Application/xml",
    ".vcs": "text/plain",
    ".vcxproj": "Application/xml",
    ".vddproj": "text/plain",
    ".vdp": "text/plain",
    ".vdproj": "text/plain",
    ".vdx": "application/vnd.ms-visio.viewer",
    ".vml": "text/xml",
    ".vscontent": "application/xml",
    ".vsct": "text/xml",
    ".vsd": "application/vnd.visio",
    ".vsi": "application/ms-vsi",
    ".vsix": "application/vsix",
    ".vsixlangpack": "text/xml",
    ".vsixmanifest": "text/xml",
    ".vsmdi": "application/xml",
    ".vspscc": "text/plain",
    ".vss": "application/vnd.visio",
    ".vsscc": "text/plain",
    ".vssettings": "text/xml",
    ".vssscc": "text/plain",
    ".vst": "application/vnd.visio",
    ".vstemplate": "text/xml",
    ".vsto": "application/x-ms-vsto",
    ".vsw": "application/vnd.visio",
    ".vsx": "application/vnd.visio",
    ".vtx": "application/vnd.visio",
    ".wav": "audio/wav",
    ".wave": "audio/wav",
    ".wax": "audio/x-ms-wax",
    ".wbk": "application/msword",
    ".wbmp": "image/vnd.wap.wbmp",
    ".wcm": "application/vnd.ms-works",
    ".wdb": "application/vnd.ms-works",
    ".wdp": "image/vnd.ms-photo",
    ".webarchive": "application/x-safari-webarchive",
    ".webtest": "application/xml",
    ".wiq": "application/xml",
    ".wiz": "application/msword",
    ".wks": "application/vnd.ms-works",
    ".WLMP": "application/wlmoviemaker",
    ".wlpginstall": "application/x-wlpg-detect",
    ".wlpginstall3": "application/x-wlpg3-detect",
    ".wm": "video/x-ms-wm",
    ".wma": "audio/x-ms-wma",
    ".wmd": "application/x-ms-wmd",
    ".wmf": "application/x-msmetafile",
    ".wml": "text/vnd.wap.wml",
    ".wmlc": "application/vnd.wap.wmlc",
    ".wmls": "text/vnd.wap.wmlscript",
    ".wmlsc": "application/vnd.wap.wmlscriptc",
    ".wmp": "video/x-ms-wmp",
    ".wmv": "video/x-ms-wmv",
    ".wmx": "video/x-ms-wmx",
    ".wmz": "application/x-ms-wmz",
    ".wpl": "application/vnd.ms-wpl",
    ".wps": "application/vnd.ms-works",
    ".wri": "application/x-mswrite",
    ".wrl": "x-world/x-vrml",
    ".wrz": "x-world/x-vrml",
    ".wsc": "text/scriptlet",
    ".wsdl": "text/xml",
    ".wvx": "video/x-ms-wvx",
    ".x": "application/directx",
    ".xaf": "x-world/x-vrml",
    ".xaml": "application/xaml+xml",
    ".xap": "application/x-silverlight-app",
    ".xbap": "application/x-ms-xbap",
    ".xbm": "image/x-xbitmap",
    ".xdr": "text/plain",
    ".xht": "application/xhtml+xml",
    ".xhtml": "application/xhtml+xml",
    ".xla": "application/vnd.ms-excel",
    ".xlam": "application/vnd.ms-excel.addin.macroEnabled.12",
    ".xlc": "application/vnd.ms-excel",
    ".xld": "application/vnd.ms-excel",
    ".xlk": "application/vnd.ms-excel",
    ".xll": "application/vnd.ms-excel",
    ".xlm": "application/vnd.ms-excel",
    ".xls": "application/vnd.ms-excel",
    ".xlsb": "application/vnd.ms-excel.sheet.binary.macroEnabled.12",
    ".xlsm": "application/vnd.ms-excel.sheet.macroEnabled.12",
    ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ".xlt": "application/vnd.ms-excel",
    ".xltm": "application/vnd.ms-excel.template.macroEnabled.12",
    ".xltx": "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
    ".xlw": "application/vnd.ms-excel",
    ".xml": "text/xml",
    ".xmta": "application/xml",
    ".xof": "x-world/x-vrml",
    ".XOML": "text/plain",
    ".xpm": "image/x-xpixmap",
    ".xps": "application/vnd.ms-xpsdocument",
    ".xrm-ms": "text/xml",
    ".xsc": "application/xml",
    ".xsd": "text/xml",
    ".xsf": "text/xml",
    ".xsl": "text/xml",
    ".xslt": "text/xml",
    ".xsn": "application/octet-stream",
    ".xss": "application/xml",
    ".xtp": "application/octet-stream",
    ".xwd": "image/x-xwindowdump",
    ".z": "application/x-compress",
    ".zip": "application/x-zip-compressed"
};

function fnExcelReport(id, name) {
    var tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
    tab_text = tab_text + '<head><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>';
    tab_text = tab_text + '<x:Name>Test Sheet</x:Name>';
    tab_text = tab_text + '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>';
    tab_text = tab_text + '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>';
    tab_text = tab_text + "<style>th,td,table,tr{border-top: 1px solid #999999 !important;border-left: 1px solid #999999;}</style><table border='1px'>";
    var exportTable = $('#' + id).clone();
    exportTable.find('input').each(function (index, elem) { $(elem).remove(); });
    tab_text = tab_text + exportTable.html();
    tab_text = tab_text + '</table></body></html>';
    var data_type = 'data:application/vnd.ms-excel';
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    var fileName = name + '_' + parseInt(Math.random() * 10000000000) + '.xls';
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        if (window.navigator.msSaveBlob) {
            var blob = new Blob([tab_text], {
                type: "application/csv;charset=utf-8;"
            });
            navigator.msSaveBlob(blob, fileName);
        }
    } else {
        var blob2 = new Blob([tab_text], {
            type: "application/csv;charset=utf-8;"
        });
        var filename = fileName;
        var elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob2);
        elem.download = filename;
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
    }
}
function getMindType(ext) {
    return contentTypes["." + ext];
};
function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}
function getPrevDate(dt) {
    return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() - 1);
}
function getNextDate(dt) {
    return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() + 1);
}
function getWeekDate(dt, f) {
    //f=true lấy ngày bắt đầu, f flase lấy ngày kết thúc
    var currentWeekDay = dt.getDay();
    var lessDays = currentWeekDay === 0 ? 6 : currentWeekDay - 1;
    var wkStart = new Date(new Date(dt).setDate(dt.getDate() - lessDays));
    var wkEnd = new Date(new Date(wkStart).setDate(wkStart.getDate() + 6));
    if (f) {
        return wkStart;
    }
    return wkEnd;
}
function closeswal() {
    $(".swal2-container").remove();
};
var LoaiVBs = [
    { ten: "Văn bản đến", value: 0 },
    { ten: "Văn bản đi", value: 1 },
    { ten: "Hồ sơ", value: 2 },
    { ten: "Lịch công tác", value: 3 },
    { ten: "Lịch sự kiện", value: 4 },
    { ten: "Điều xe", value: 5 },
    { ten: "Tài sản công", value: 6 },
    { ten: "Văn phòng phẩm", value: 7 },
    { ten: "Đồng phục", value: 8 },
    { ten: "Lịch công tác Ecp", value: 9 }
];
var phanLoais = [
    { value: 0, text: "Văn bản đến" },
    { value: 1, text: "Văn bản đi" },
    { value: 2, text: "Hồ sơ" },
    { value: 3, text: "Lịch công tác" },
    { value: 4, text: "Lịch sự kiện" },
    { value: 5, text: "Điều xe" },
    { value: 6, text: "Tài sản công" },
    { value: 7, text: "Văn phòng phẩm" },
    { value: 8, text: "Đồng phục" },
    { value: 9, text: "Lịch công tác Ecp" }
];
var phanLoaiNhoms = [
    { value: 'PhieuDeXuat', text: "Quy trình của phiếu đề xuất" },
    { value: 'SuaChuaBaoDuong', text: "Quy trình của sửa chữa bảo dưỡng" },
    { value: 'ThuHoi', text: "Quy trình thu hồi" },
    { value: 'ThanhLy', text: "Quy trình thanh lý" },
    { value: 'BienBanBanGiao', text: "Quy trình biên bản bàn giao" }
];
var imgTypes = ['jpg', 'JPG', 'png', 'PNG', 'jpeg', 'JPEG', 'ico', 'ICO'];
var exportTableToExcel = (function () {
    var uri = 'data:application/vnd.ms-excel;base64,'
        , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
        , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))); }
        , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }); };
    return function (html, name) {
        var ctx = { worksheet: name || 'Worksheet', table: html };
        var url = uri + base64(format(template, ctx));
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.href = url;
        a.download = name + '.xls';
        a.click();
        setTimeout(function () { window.URL.revokeObjectURL(url); }, 0);
    };
})();
function dowloadLink(url) {
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.target = '_blank';
    a.click();
    setTimeout(function () { window.URL.revokeObjectURL(url); }, 0);
}
var size = 15;
function getTreeForDueToAnalysis(data, primaryIdName, parentIdName) {
    if (!data || data.length === 0 || !primaryIdName || !parentIdName)
        return [];

    var tree = [],
        rootIds = [],
        item = data[0],
        primaryKey = item[primaryIdName],
        treeObjs = {},
        tempChildren = {},
        parentId,
        parent,
        len = data.length,
        i = 0;

    while (i < len) {
        item = data[i++];
        primaryKey = item[primaryIdName];

        if (tempChildren[primaryKey]) {
            item.children = tempChildren[primaryKey];
            delete tempChildren[primaryKey];
        }

        treeObjs[primaryKey] = item;
        parentId = item[parentIdName];

        if (parentId) {
            parent = treeObjs[parentId];

            if (!parent) {
                var siblings = tempChildren[parentId];
                if (siblings) {
                    siblings.push(item);
                }
                else {
                    tempChildren[parentId] = [item];
                }
            }
            else if (parent.children) {
                parent.children.push(item);
            }
            else {
                parent.children = [item];
            }
        }
        else {
            rootIds.push(primaryKey);
        }
    }

    for (var i = 0; i < rootIds.length; i++) {
        tree.push(treeObjs[rootIds[i]]);
    }

    return tree;
}
var loadFile = function (event, out) {
    var output = document.getElementById(out);
    output.src = URL.createObjectURL(event.target.files[0]);
};
function cloneDate(d) {
    if (d == null) {
        return null;
    }
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    return d;
}
function getDaysInMonth(month, year) {
    var wdays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
        var d = new Date(date);
        days.push({ day: d.getDate(), thu: wdays[d.getDay()], ngay: d, dd: d.getDay() });
        date.setDate(date.getDate() + 1);
    }
    return days;
}
function compare(dateTimeA, dateTimeB) {
    var momentA = moment(dateTimeA, "DD/MM/YYYY");
    var momentB = moment(dateTimeB, "DD/MM/YYYY");
    if (momentA > momentB) return 1;
    else if (momentA < momentB) return -1;
    else return 0;
}
function compareDateTime(dateTimeA, dateTimeB) {
    var momentA = moment(dateTimeA, "DD/MM/YYYY HH:mm:ss");
    var momentB = moment(dateTimeB, "DD/MM/YYYY HH:mm:ss");
    if (momentA > momentB) return 1;
    else if (momentA < momentB) return -1;
    else return 0;
}
function tomorowDate() {
    var d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
}
function format_curency(str) {
    if (str == null) return str;
    return str.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}
function change_alias(alias) {
    var str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ |ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "-");
    /* tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - */
    str = str.replace(/-+-/g, "-"); //thay thế 2- thành 1-
    str = str.replace(/^\-+|\-+$/g, "");
    //cắt bỏ ký tự - ở đầu và cuối chuỗi 
    return str;
}
function change_alias_filter(alias) {
    var str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ |ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    //str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "-");
    /* tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - */
    str = str.replace(/-+-/g, "-"); //thay thế 2- thành 1-
    str = str.replace(/^\-+|\-+$/g, "");
    //cắt bỏ ký tự - ở đầu và cuối chuỗi 
    return str;
}
function returnStatusCongty(trangthai) {
    switch (trangthai) {
        case 0:
            return "";
        case 1:
            return "<span class='label label-info'>Dùng thử</span>";
        case 2:
            return "<span class='label label-success'>Dùng chính thức</span>";
        case 3:
            return "<span class='label label-danger'>Tạm dừng</span>";
    }
}
function getFormData(object) {
    const formData = new FormData();
    for (var key in object) {
        formData.append(key, $.trim(object[key]));
    }
    return formData;
}
function valid(frm) {
    angular.forEach(frm.$error.required, function (field) {
        field.$setDirty();
    });
    return frm.$valid;
}
function resetForm(frm) {
    frm.$dirty = false;
    frm.$pristine = true;
    frm.$submitted = false;
    var f = document.getElementById(frm.$name);
    if (f != undefined && frm.$name != 'frVBDen') {
        f.reset();
    }
};
(function ($) {
    $.fn.hasScrollBar = function () {
        return this.get(0) ? this.get(0).scrollHeight > this.innerHeight() : false;
    };
})(jQuery);
function showtoastr(msg, type) {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": true,
        "preventOpenDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "10000",
        "timeOut": "1000",
        "extendedTimeOut": "10000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
    switch (type) {
        case 1:
            toastr.info(msg);
            break;
        case 2:
            toastr.warning(msg);
            break;
        case 3:
            toastr.error(msg);
            break;
        default:
            toastr.success(msg);
            break;
    }
}
function showtoastrNhacLich(msg, type) {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": true,
        "preventOpenDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "10000",
        "timeOut": "4000",
        "extendedTimeOut": "0",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
    switch (type) {
        case 1:
            toastr.info(msg);
            break;
        case 2:
            toastr.warning(msg);
            break;
        case 3:
            toastr.error(msg);
            break;
        default:
            toastr.success(msg);
            break;
    }
}
function parseJsonDate(jsonDateString) {
    if (jsonDateString == null) return "";
    return new Date(parseInt(jsonDateString.replace('/Date(', '')));
}
function showloading() {
    $("div#loading").addClass("loading");
}
function hideloading() {
    $("div#loading").removeClass("loading");
}
function setCookieUserDomain(u) {
    var baseDomain = '.businessportal.vn',
        expireAfter = new Date();
    //setting up  cookie expire date after a week
    expireAfter.setDate(expireAfter.getDate() + 7);
    //now setup cookie
    document.cookie = "U=" + u + "; domain=" + baseDomain + "; expires=" + expireAfter + "; path=/";
};
function createCookie(name, value, days) {
    var expires = ""
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }

    document.cookie = name + "=" + value + expires + "; path=/";
}
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function eraseCookie(name) {
    createCookie(name, "", -1);
}
function deleteAllCookies() {
    var res = document.cookie;
    var multiple = res.split(";");
    for (var i = 0; i < multiple.length; i++) {
        var key = multiple[i].split("=");
        document.cookie = key[0] + " =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
    }
}

function convertMoneys(value) {
    if (value == null) return "";
    value = value.toString().replace(".", "").replace(",", "");
    if (isNaN(value)) {
        return value;
    } else {
        value = value
            .replace(/\D/g, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return value;
    }
};
function convertDate(date) {
    if (date == null || date == undefined) {
        return null;
    }
    if (date.split('/').length == 2 || date.split('-').length == 2) {
        return date.split('/').length;
    }
    var dateString = date.substr(6);
    var currentTime = new Date(parseInt(dateString));
    return currentTime;
}
function retunrDate(dateStr) {
    if (dateStr == null) return "";
    if (dateStr.indexOf("Date") == -1) return dateStr;
    if (dateStr != undefined && dateStr != null) {
        var jsonDate = dateStr;
        var d = new Date(parseInt(jsonDate.substr(6)));
        var m, day;
        m = d.getMonth() + 1;
        if (m < 10)
            m = '0' + m
        if (d.getDate() < 10)
            day = '0' + d.getDate()
        else
            day = d.getDate();
        var formattedDate = day + "/" + m + "/" + d.getFullYear();
        return formattedDate;
    } else {
        return "";
    }
}
function returnTime(dateStr) {
    if (dateStr == null) return "";
    if (dateStr.indexOf("Date") == -1) return dateStr;
    if (dateStr != undefined && dateStr != null) {
        var jsonDate = dateStr;
        var d = new Date(parseInt(jsonDate.substr(6)));
        var h, s;
        h = d.getHours();
        if (h < 10)
            h = '0' + h
        s = d.getMinutes();
        if (s < 10)
            s = '0' + s
        var formattedDate = h + ":" + s;
        return formattedDate;
    } else {
        return "";
    }
}
function retunrDateTime(dateStr) {
    if (dateStr == null) return "";
    if (dateStr.indexOf("Date") == -1) return dateStr;
    if (dateStr != undefined && dateStr != null) {
        var jsonDate = dateStr;
        var d = new Date(parseInt(jsonDate.substr(6)));
        var m, day;
        m = d.getMonth() + 1;
        if (m < 10)
            m = '0' + m;
        if (d.getDate() < 10)
            day = '0' + d.getDate();
        else
            day = d.getDate();
        var formattedDate = day + "/" + m + "/" + d.getFullYear();
        formattedDate += " " + d.getHours() + ":" + (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes());
        return formattedDate;
    } else {
        return "";
    }
}
//
//
var con;
var lastOnlineRef;
var checkTK = false;
var vhtmlcache = "v00000100";
var debug = true;
function bindModulesFolder(folder, name, file) {
    return {
        name: name,
        files: ['App/' + folder + '/' + file + '.js']
    };
}
function bindStateFolder(folder, name, html, controller) {
    return {
        url: "/" + name,
        views: {
            "": {
                templateUrl: "App/" + folder + "/" + html + ".html?v=" + vhtmlcache,
                controller: controller
            }
        },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load(name); // Resolve promise and load before view 
            }]
        }
    };
}
function bindModules(name, file) {
    return {
        name: name,
        files: ['App/AngularController/' + file + '.js']
    };
}
function bindState(name, html, controller) {
    return {
        url: "/" + name,
        views: {
            "": {
                templateUrl: "App/AngularTemplates/" + html + ".html?v=" + vhtmlcache,
                controller: controller
            }
        },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load(name); // Resolve promise and load before view 
            }]
        }
    };
}
function bindStateParHome(name, html, controller, params) {
    return {
        url: name,
        views: {
            "": {
                templateUrl: "App/" + html + ".html?v=" + vhtmlcache,
                controller: controller,
                params: params
            }
        },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load(name); // Resolve promise and load before view 
            }]
        }
    };
}
function bindStatePar(name, html, controller, params) {
    return {
        url: "/" + name,
        views: {
            "": {
                templateUrl: "App/" + html + ".html?v=" + vhtmlcache,
                controller: controller,
                params: params
            }
        },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load(name); // Resolve promise and load before view 
            }]
        }
    };
}
function bindStatenoLoad(name, html, controller) {
    return {
        url: "/" + name,
        views: {
            "": {
                templateUrl: "App/AngularTemplates/" + html + ".html?v=" + vhtmlcache,
                controller: controller
            }
        }
    };
}
function bindStatenoLoadFolder(name, html, controller) {
    return {
        url: "/" + name,
        views: {
            "": {
                templateUrl: "App/" + html + ".html?v=" + vhtmlcache,
                controller: controller
            }
        }
    };
}
function encr(str) {
    var key = CryptoJS.enc.Utf8.parse('1012198815021989');
    var iv = CryptoJS.enc.Utf8.parse('1012198815021989');
    return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(str), key,
        {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
}
function decr(str) {
    var key = CryptoJS.enc.Utf8.parse('1012198815021989');
    var iv = CryptoJS.enc.Utf8.parse('1012198815021989');
    var de = CryptoJS.AES.decrypt(str, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return de.toString(CryptoJS.enc.Utf8);
}
moment.locale('vi');
$(document).on('click', '.head-modal>button.close,.closeModal', function () {
    $($(this).closest('div.modal')).modal('hide');
});
$(document).on('hidden.bs.modal', 'div.modal', function () {
    if ($("body>div.modal-backdrop.in").length === 0) {
        $("header.main-header").removeAttr("style");
    } else {
        $("header.main-header").css("z-index", "100");
    }
});
$(document).delegate("ul.dropdown-menu [data-keepOpenOnClick]", "click", function (e) {
    e.stopPropagation();
});
$("[contenteditable]").focusout(function () {
    var element = $(this);
    if (!element.text().trim().length) {
        element.empty();
    }
});
$(function () {
});