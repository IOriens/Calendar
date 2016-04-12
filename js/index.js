/**
 * Created by IOriens on 2016/4/13.
 */
"use strict"
//参数
var calendar = window.calendar || function () {};
calendar.days = []
calendar.dayNum = 0
calendar.weekdaysInChinese = ["一","二","三","四","五","六","日"];
calendar.tianGan = ["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
calendar.diZhi = ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
calendar.chineseZodiac = ["鼠","牛","虎","兔","蛇","马","羊","猴","鸡","狗","猪"]
calendar.nationalHoliday = {
    1 : {
        1 : "元旦"
    },
    2: {
        2:"世界湿地日",
        10:"国际气象节",
        21:"国际母语日",
        24:"第三世界青年日",
        28:"世界罕见病日"
    },
    3: {
        1:"国际海豹节",
        8:"国际妇女节",
        14:"国际警察日",
        15:"国际消费者权益日",
        17:"国际航海日",
        21:"世界林业节",
        22:"世界水日",
        23:"世界气象日",
        24:"世界防治结核病日"
    },
    4: {
        1:"国际愚人节",
        2:"国际儿童图书日",
        7:"世界卫生日",
        22:"世界地球日",
        23:"世界图书和版权日",
        24:"世界青年反对殖民主义日",
        26:"世界知识产权日"
    },
    5: {
        1:"国际劳动节",
        3:"世界新闻自由日",
        8:"世界红十字日",
        12:"国际护士节",
        15:"国际家庭（咨询）日",
        17:"世界电信日",
        18:"国际博物馆日",
        22:"生物多样性国际日",
        26:"世界向人体条件挑战日",
        31:"世界无烟日"
    },
    6: {

    }
}

//调用方法
calendar.$ = function (id) {
    return document.getElementById(id)
};

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
//                tableData.innerHTML = "<span>"+i_weekday + "</span><br><span>"+i_row+"</span>"
            tableData.innerHTML = "  "

            tableRow.appendChild(tableData)
        }
        calendar.$("date-table").appendChild(tableRow)
    }
};

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
};

//获取当月的阳历天数
calendar.getMonthDays = function (year, month) {
    var leapYear = false;
    if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)) leapYear = true;
    switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            return 31;
        case 4:
        case 6:
        case 9:
        case 11:
            return 30;
        case 2:
            return leapYear ? 28 : 29;
    }
}

//计算星期几
//算法：https://en.wikipedia.org/wiki/Determination_of_the_day_of_the_week
calendar.calWeekDay = function (y, m, d) {
    var t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4]
    y -= m < 3;
    return (y + Math.floor(y/4) - Math.floor(y/100) + Math.floor(y/400) + t[m-1] + d) % 7;
};

//干支计算
//计算方法：http://blog.csdn.net/orbit/article/details/9210413
calendar.calGan = function (year) {
    var sc = year - 2000;
    return ((7 + sc) % 10 + 10) % 10
};
calendar.calZhi = function (year) {
    var sc = year - 2000;
    return ((5 + sc)% 12 + 12) % 12
};


//输出星期
calendar.calDays = function (year, month, dayNum) {
    var day, i
    for(i = 1; i <= dayNum; i ++){
        day = new Object();
        day.date = i
        day.weekday = calendar.calWeekDay(year,month,i)
        day.nationalHoliday = ""
        calendar.days[i] = day
    }
};

//更新日历
calendar.updateDays = function () {
    //生成日期表的每一行
    var i_row, i_weekday, tableDataSet, tableRow, iDay = 1
    var table = calendar.$("date-table")
    tableRow = table.getElementsByTagName("tr")
    for(i_row = 1;i_row <= 6; i_row ++) {
        tableDataSet = tableRow[i_row].childNodes
        for(i_weekday = 0;i_weekday < 7; i_weekday ++) {
            if(iDay <= calendar.dayNum && calendar.days[iDay].weekday == i_weekday){
                tableDataSet[i_weekday].innerHTML = calendar.days[iDay].date
                tableDataSet[i_weekday].onclick = function () {
                    calendar.$('dayInfo').innerHTML = this.innerHTML + ":" + calendar.days[parseInt(this.innerHTML)].weekday
                }
                iDay ++
            }else {
                //注意此处需清除多余效果
                tableDataSet[i_weekday].innerHTML = " "
                tableDataSet[i_weekday].onclick = function () {}
            }
        }
    }
};

calendar.setHoliday = function (month) {
    var arr
    if(month == 1){
        arr = {
            1 : "元旦"
        }
    }
}

calendar.setHolidayByIteration = function (arr) {
    var i
    for(i = 0; i < arr.length; i ++) {
        calendar.days[arr[i].key].nationalHoliday = arr[i].value
    }
}

//当选择框变更时刷新日历
calendar.updateTable = function (year, month) {

    //计算新月份总天数
    calendar.dayNum = calendar.getMonthDays(year, month)

    //显示本月日历
    calendar.calDays(year,month, calendar.dayNum)
    calendar.updateDays()

    //更改天干地支显示
    var gan = calendar.calGan(year) - 1
    var zhi = calendar.calZhi(year) - 1
    calendar.$("yearInfo").innerHTML = calendar.tianGan[gan]+ calendar.diZhi[zhi] + calendar.chineseZodiac[zhi] + "年"
};

//更改年月后更新视图
calendar.onChangeOfYearMonth = function () {
    var year = calendar.$("year").selectedIndex + 1901
    var month = calendar.$("month").selectedIndex + 1
    calendar.updateTable(year, month)
};

(function () {

    //生成表格
    calendar.prepareTable();
    var day = new Date();

    //填充选择框
    calendar.prepareSelection(day.getFullYear(),day.getMonth());

    //事件绑定
    calendar.$("year").addEventListener("change",calendar.onChangeOfYearMonth)
    calendar.$("month").addEventListener("change",calendar.onChangeOfYearMonth)

    //根据当前年月生成日历
    var currYear = day.getFullYear(), currMonth = day.getMonth() + 1
    calendar.updateTable(currYear, currMonth)

})()
