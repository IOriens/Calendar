/**
 * Created by IOriens on 2016/4/13.
 */
"use strict"
//参数
var calendar = window.calendar || function () {}
calendar.days = []
calendar.dayNum = 0
calendar.weekdaysInChinese = ["一","二","三","四","五","六","日"];
calendar.tianGan = ["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
calendar.diZhi = ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
calendar.chineseZodiac = ["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]


//调用方法
calendar.$ = function (id) {
    return document.getElementById(id)
}

calendar.int = function (num) {
    if(num < 0) {
        return Math.ceil(num)
    }else {
        return Math.floor(num)
    }
}

//生成日期表
calendar.prepareTable = function () {
    var tableHeaders = document.createElement("tr")
    //生成第一行
    var i_th , tableHeader
    for(i_th =0;i_th < calendar.weekdaysInChinese.length; i_th ++) {
        tableHeader = document.createElement("th")
        tableHeader.innerHTML = calendar.weekdaysInChinese[i_th]
        tableHeaders.appendChild(tableHeader)
    }
    calendar.$("date-table").appendChild(tableHeaders)

    //生成日期表的每一行
    var i_row, i_weekday, tableData, tableRow
    for(i_row = 0;i_row < 6; i_row ++) {
        tableRow = document.createElement("tr")
        for(i_weekday = 0;i_weekday < 7; i_weekday ++) {
            tableData = document.createElement("td")
            tableData.innerHTML = "  "
            tableRow.appendChild(tableData)
        }
        calendar.$("date-table").appendChild(tableRow)
    }
}

//生成所有选择项
calendar.prepareSelection = function (currYear, currMonth) {
    var iYear, opt , yearSelection = calendar.$('year')
    for(iYear = 1901 ; iYear <= 2100; iYear ++){
        opt = document.createElement("option")
        opt.innerHTML = iYear
        opt.setAttribute("value", "" + iYear)
        yearSelection.appendChild(opt)
    }
    yearSelection.selectedIndex = currYear - 1901

    var iMonth, monthSelection = calendar.$("month")
    for(iMonth = 1 ; iMonth <= 12; iMonth ++){
        opt = document.createElement("option")
        opt.innerHTML = iMonth
        opt.setAttribute("value", "" + iMonth)
        monthSelection.appendChild(opt)
    }
    monthSelection.selectedIndex = currMonth - 0;
}


//更新日历
calendar.updateDays = function () {
    //生成日期表的每一行
    var i_row, i_weekday, tableDataSet, tableRow, iDay = 0
    var table = calendar.$("date-table")
    tableRow = table.getElementsByTagName("tr")
    for(i_row = 1;i_row <= 6; i_row ++) {
        tableDataSet = tableRow[i_row].childNodes
        for(i_weekday = 0;i_weekday < 7; i_weekday ++) {
            //注意此处模七
            if(iDay < calendar.dayNum && calendar.days[iDay].weekday == (i_weekday + 1)%7){
                // "<span>"+i_weekday + "</span><br><span>"+i_row+"</span>"
                var dayInfoStr = "<div class='solar'>"+calendar.days[iDay].date
                // dayInfoStr += "</div><span class='lunar'>"+calendar.days[iDay].nationalHoliday+"</span>"
                var lunarInfo = ""
                if(calendar.days[iDay].nationalHoliday.length > 0 ) {
                    lunarInfo = calendar.days[iDay].nationalHoliday
                } else if (calendar.days[iDay].solarSessionTerm.length > 0) {
                    lunarInfo = calendar.days[iDay].solarSessionTerm
                } else {
                    lunarInfo = calendar.days[iDay].lunarDay
                }

                dayInfoStr += "</div><span class='lunar'>"+lunarInfo+"</span>"
                tableDataSet[i_weekday].innerHTML = dayInfoStr

                tableDataSet[i_weekday].onclick = function () {
                    var day = parseInt(this.firstChild.textContent) - 1
                    calendar.showDayInfo(day)
                }
                iDay ++
            }else {
                //注意此处需清除多余效果
                tableDataSet[i_weekday].innerHTML = " "
                tableDataSet[i_weekday].onclick = function () {}
            }
        }
    }
}

//显示日期信息
calendar.showDayInfo = function (day) {

    calendar.$("lunarYearInfo").innerHTML = calendar.days[day].gan+ calendar.days[day].zhi + "年"

    //日信息
    calendar.$('selectedDay').innerHTML = (day + 1)
    calendar.$('weekDay').innerHTML = "星期" + calendar.weekdaysInChinese[((calendar.days[day].weekday -1) + 7) % 7]
    calendar.$('lunarDay').innerHTML = calendar.days[day].lunarMonth+calendar.days[day].lunarDay
    if(calendar.days[day].nationalHoliday.length > 0) {
        calendar.$('nationHoliday').innerHTML = calendar.days[day].nationalHoliday
    } else if(calendar.days[day].solarSessionTerm.length > 0) {
        calendar.$('nationHoliday').innerHTML = calendar.days[day].solarSessionTerm
    } else {
        calendar.$('nationHoliday').innerHTML = " "
    }
}


//当选择框变更时刷新日历
calendar.updateTable = function (year, month) {
    //显示本月日历
    var url = "http://localhost:8081/api/v1/calendar"
    calendar.getData(url,year,month)
}

//获取数据，使用JSONP
calendar.getData = function (url, y, m) {
    calendar.jsonp({
        url: url,
        dataType: "jsonp",
        data: {year: y, month: m},
        callback: "fetchData",
        type: "GET"
    })
}

//获取数据，JSONP的回调函数
function fetchData (json) {
    calendar.dayNum = json.length
    var day
    for(var i = 0; i < json.length; i++) {
        day = {}
        day.date = json[i].date
        day.weekday = json[i].weekday
        day.nationalHoliday = json[i].nationalHoliday
        day.lunarMonth = json[i].lunarMonth
        day.lunarDay = json[i].lunarDay
        day.solarSessionTerm = json[i].solarSessionTerm
        day.gan =  json[i].gan
        day.zhi =  json[i].zhi
        calendar.days[i] = day
    }

    var day = new Date()
    calendar.updateDays()
    if(day.getDate() - 1 < json.length){
        calendar.showDayInfo(day.getDate() - 1)
    } else {
        calendar.showDayInfo(0)
    }
}

//JSONP原生JS实现
calendar.jsonp = function(options) {
    options = options || {};
    if (!options.url || !options.callback) {
        throw new Error("参数不合法");
    }

    //创建 script 标签并加入到页面中
    var callbackName = ('jsonp_' + Math.random()).replace(".", "");
    var oHead = document.getElementsByTagName('head')[0];
    options.data["callback"] = options.callback;
    var params = calendar.formatParams(options.data);
    var oS = document.createElement('script');
    oHead.appendChild(oS);

    //创建jsonp回调函数
    window[callbackName] = function (json) {
        oHead.removeChild(oS);
        clearTimeout(oS.timer);
        window[callbackName] = null;
        options.success && options.success(json);
    };

    //发送请求
    oS.src = options.url + '?' + params;

    //超时处理
    if (options.time) {
        oS.timer = setTimeout(function () {
            window[callbackName] = null;
            oHead.removeChild(oS);
            options.fail && options.fail({ message: "超时" });
        }, time);
    }
};

//格式化参数
calendar.formatParams = function(data) {
    var arr = [];
    for (var name in data) {
        arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
    }
    return arr.join('&')
}

//更改年月后更新视图
calendar.onChangeOfYearMonth = function () {
    var year = calendar.$("year").selectedIndex + 1901
    var month = calendar.$("month").selectedIndex + 1

    calendar.updateTable(year, month)
};

(function () {

    //生成表格
    calendar.prepareTable()
    var day = new Date()

    //填充选择框
    calendar.prepareSelection(day.getFullYear(),day.getMonth());

    //事件绑定
    calendar.$("year").addEventListener("change",calendar.onChangeOfYearMonth)
    calendar.$("month").addEventListener("change",calendar.onChangeOfYearMonth)

    //根据当前年月生成日历
    var currYear = day.getFullYear(), currMonth = day.getMonth() + 1
    calendar.updateTable(currYear, currMonth)
})()
