/**
 * Created by IOriens on 2016/4/14.
 */
function Calendar() {

    this.days = []
    this.dayNum = 0
    this.weekdaysInChinese = ["一","二","三","四","五","六","日"];
    
    this.tianGan = ["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
    
    this.diZhi = ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
    
    this.chineseZodiac = ["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
    
    this.solarTerm = [
        "小寒", "大寒", "立春", "雨水", "惊蛰", "春分",
        "清明", "谷雨", "立夏", "小满", "芒种", "夏至",
        "小暑", "大暑", "立秋", "处暑", "白露", "秋分",
        "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"]
    
    this.lunarString1 = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"]
    
    this.lunarString2 = ["初", "十", "廿", "卅", "正", "腊", "冬", "闰"]
    
    this.lunarInfo = [
        0x4bd8, 0x4ae0, 0xa570, 0x54d5, 0xd260, 0xd950, 0x5554, 0x56af,
        0x9ad0, 0x55d2, 0x4ae0, 0xa5b6, 0xa4d0, 0xd250, 0xd295, 0xb54f,
        0xd6a0, 0xada2, 0x95b0, 0x4977, 0x497f, 0xa4b0, 0xb4b5, 0x6a50,
        0x6d40, 0xab54, 0x2b6f, 0x9570, 0x52f2, 0x4970, 0x6566, 0xd4a0,
        0xea50, 0x6a95, 0x5adf, 0x2b60, 0x86e3, 0x92ef, 0xc8d7, 0xc95f,
        0xd4a0, 0xd8a6, 0xb55f, 0x56a0, 0xa5b4, 0x25df, 0x92d0, 0xd2b2,
        0xa950, 0xb557, 0x6ca0, 0xb550, 0x5355, 0x4daf, 0xa5b0, 0x4573,
        0x52bf, 0xa9a8, 0xe950, 0x6aa0, 0xaea6, 0xab50, 0x4b60, 0xaae4,
        0xa570, 0x5260, 0xf263, 0xd950, 0x5b57, 0x56a0, 0x96d0, 0x4dd5,
        0x4ad0, 0xa4d0, 0xd4d4, 0xd250, 0xd558, 0xb540, 0xb6a0, 0x95a6,
        0x95bf, 0x49b0, 0xa974, 0xa4b0, 0xb27a, 0x6a50, 0x6d40, 0xaf46,
        0xab60, 0x9570, 0x4af5, 0x4970, 0x64b0, 0x74a3, 0xea50, 0x6b58,
        0x5ac0, 0xab60, 0x96d5, 0x92e0, 0xc960, 0xd954, 0xd4a0, 0xda50,
        0x7552, 0x56a0, 0xabb7, 0x25d0, 0x92d0, 0xcab5, 0xa950, 0xb4a0,
        0xbaa4, 0xad50, 0x55d9, 0x4ba0, 0xa5b0, 0x5176, 0x52bf, 0xa930,
        0x7954, 0x6aa0, 0xad50, 0x5b52, 0x4b60, 0xa6e6, 0xa4e0, 0xd260,
        0xea65, 0xd530, 0x5aa0, 0x76a3, 0x96d0, 0x4afb, 0x4ad0, 0xa4d0,
        0xd0b6, 0xd25f, 0xd520, 0xdd45, 0xb5a0, 0x56d0, 0x55b2, 0x49b0,
        0xa577, 0xa4b0, 0xaa50, 0xb255, 0x6d2f, 0xada0, 0x4b63, 0x937f,
        0x49f8, 0x4970, 0x64b0, 0x68a6, 0xea5f, 0x6b20, 0xa6c4, 0xaaef,
        0x92e0, 0xd2e3, 0xc960, 0xd557, 0xd4a0, 0xda50, 0x5d55, 0x56a0,
        0xa6d0, 0x55d4, 0x52d0, 0xa9b8, 0xa950, 0xb4a0, 0xb6a6, 0xad50,
        0x55a0, 0xaba4, 0xa5b0, 0x52b0, 0xb273, 0x6930, 0x7337, 0x6aa0,
        0xad50, 0x4b55, 0x4b6f, 0xa570, 0x54e4, 0xd260, 0xe968, 0xd520,
        0xdaa0, 0x6aa6, 0x56df, 0x4ae0, 0xa9d4, 0xa4d0, 0xd150, 0xf252, 0xd520
    ]

    this.solarTermInfo = [
        0, 21208, 42467, 63836, 85337, 107014, 128867, 150921,
        173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033,
        353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758
    ]

    this.nationalHoliday = {
        //信息来源：http://www.guojieba.cn/guojijieri/8.html
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
            1:"国际儿童节",
            4:"受侵略戕害的无辜儿童国际日",
            5:"世界环境日",
            17:"世界防止荒漠化和干旱日",
            20:"世界难民日",
            23:"国际奥林匹克日",
            26:"国际禁毒日"
        },
        7: {
            1:"国际建筑日",
            2:"国际体育记者日",
            11:"世界人口日",
            26:"世界语（言）创立日"
        },
        8: {
            6:"国际电影节",
            9:"世界土著居民国际日",
            12:"国际青年日",
            13:"国际左撇子日",
            23:"贩卖黑奴及其废除的国际纪念日"
        },
        9: {
            8:"国际新闻工作者日",
            14:"世界清洁地球日",
            16:"国际臭氧层保护日",
            21:"国际和平日",
            27:"世界旅游日"
        },
        10: {1:"国际音乐日",
            4:"世界动物日",
            5:"世界教师日",
            9:" 世界邮政日",
            10:"世界精神卫生日",
            11:"世界镇痛日",
            14:"世界标准日",
            15:"国际盲人节",
            16:"世界粮食日",
            17:"世界消除贫困日",
            22:"世界传统医药日",
            24:"联合国日",
            28:"世界男性健康日",
            31:"世界勤俭日"
        },
        11: {
            6:"防止战争和武装冲突糟蹋环境国际日",
            10:"世界青年节",
            14:"世界糖尿病日",
            16:"国际容忍日",
            17:"国际大学生节",
            20:"国际儿童日",
            21:"世界电视日",
            25:"消除对妇女的暴力行为国际日",
            29:"声援巴勒斯坦人民国际日"
        },
        12: {1:"世界艾滋病日",
            2:"废除奴隶制国际日",
            3:"世界残疾人日",
            5:"促进经济和社会发展自愿人员国际日",
            7:"国际民航日",
            9:"国际反腐败日",
            10:"世界人权日",
            11:"世界防治哮喘日",
            18:"国际移徙者日",
            21:"国际篮球日",
            29:"生物多样性国际日"
        }
    }


    this.int = function (num) {
        if(num < 0) {
            return Math.ceil(num)
        }else {
            return Math.floor(num)
        }
    }

    //获取当月的阳历天数
    this.getMonthDays = function (year, month) {
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
    this.calWeekDay = function (y, m, d) {
        var t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4]
        y -= m < 3;
        return (y + Math.floor(y/4) - Math.floor(y/100) + Math.floor(y/400) + t[m-1] + d) % 7;
    };

    //干支计算
    //计算方法：http://blog.csdn.net/orbit/article/details/9210413
    this.calGan = function (year) {
        var sc = year - 2000;
        return ((7 + sc) % 10 + 10) % 10
    };
    this.calZhi = function (year) {
        var sc = year - 2000;
        return ((5 + sc)% 12 + 12) % 12
    };
    
    //农历计算部分
    //算法：http://blog.csdn.net/luozhuang/article/details/8678458

    //返回农历年闰月月份
    this.getLunarLeapMonth = function (lunarYear) {
        // 数据表中,每个农历年用16bit来表示,
        // 前12bit分别表示12个月份的大小月,最后4bit表示闰月
        // 若4bit全为1或全为0,表示没闰, 否则4bit的值为闰月月份
        var leapMonth = this.lunarInfo[lunarYear - 1900] & 0xf;
        leapMonth = (leapMonth == 0xf ? 0 : leapMonth);
        return leapMonth;
    }

    //返回农历年闰月的天数
    this.getLunarLeapDays = function(lunarYear) {
        // 下一年最后4bit为1111,返回30(大月)
        // 下一年最后4bit不为1111,返回29(小月)
        // 若该年没有闰月,返回0
        return this.getLunarLeapMonth(lunarYear) > 0 ? ((this.lunarInfo[lunarYear - 1899] & 0xf) == 0xf ? 30: 29) : 0
    }


    //返回农历年的总天数
    this.getLunarYearDays = function(lunarYear) {
        // 按小月计算,农历年最少有12 * 29 = 348天
        var daysInLunarYear = 348;
        // 数据表中,每个农历年用16bit来表示,
        // 前12bit分别表示12个月份的大小月,最后4bit表示闰月
        // 每个大月累加一天
        for (var i = 0x8000; i > 0x8; i >>= 1) {
            daysInLunarYear += ((this.lunarInfo[lunarYear - 1900] & i) != 0) ? 1 : 0;
        }
        // 加上闰月天数
        daysInLunarYear += this.getLunarLeapDays(lunarYear);

        return daysInLunarYear;
    }

    // 返回农历年正常月份的总天数
    this.getLunarMonthDays = function(lunarYear, lunarMonth) {
        // 数据表中,每个农历年用16bit来表示,
        // 前12bit分别表示12个月份的大小月,最后4bit表示闰月
        return ((this.lunarInfo[lunarYear - 1900] & (0x10000 >> lunarMonth)) != 0) ? 30 : 29;

    }
            
    //返回指定数字的农历月份表示字符串
    this.getLunarMonthString = function(lunarMonth) {
        var lunarMonthString = "";
        if (lunarMonth == 1) {
            lunarMonthString = this.lunarString2[4];
        } else {
            if (lunarMonth > 9) {
                lunarMonthString += this.lunarString2[1];
            }
            if (lunarMonth % 10 > 0) {
                lunarMonthString += this.lunarString1[lunarMonth % 10];
            }
        }
        return lunarMonthString + "月";
    }
    
     //返回指定数字的农历日表示字符串
    this.getLunarDayString = function(lunarDay) {
        if (lunarDay < 1 || lunarDay > 30) {
            return "";
        }
        var i1 = this.int(lunarDay / 10);
        var i2 = lunarDay % 10;
        var c1 = this.lunarString2[i1];
        var c2 = this.lunarString1[i2];
        if (lunarDay < 11) {
            c1 = this.lunarString2[0];
        }
        if (i2 == 0) {
            c2 = this.lunarString2[1];
        }
        return c1 + c2;
    }
    
    //计算农历信息
    this.calLunarInfo = function (y, m, d) {
        var solarDay = new Date(y,m,d)
        var baseDay = new Date(1900, 0, 31)
        var offset = (solarDay - baseDay)/86400000


        // 按农历年递减每年的农历天数，确定农历年份
        var lunarYear = 1900;
        var daysInLunarYear = this.getLunarYearDays(lunarYear);
        while (lunarYear < 2100 && offset >= daysInLunarYear) {
            offset -= daysInLunarYear;
            daysInLunarYear = this.getLunarYearDays(++lunarYear);
        }
        // 农历年数字

        // 按农历月递减每月的农历天数，确定农历月份
        var lunarMonth = 1;
        // 所在农历年闰哪个月,若没有返回0
        var leapMonth = this.getLunarLeapMonth(lunarYear);

        // 闰月是否递减
        var leapDec = false;
        var isLeap = false;
        var daysInLunarMonth = 0;

        while (lunarMonth < 13 && offset > 0) {
            if (isLeap && leapDec) { // 如果是闰年,并且是闰月
                // 所在农历年闰月的天数
                daysInLunarMonth = this.getLunarLeapDays(lunarYear);
                leapDec = false;
            } else {
                // 所在农历年指定月的天数
                daysInLunarMonth = this.getLunarMonthDays(lunarYear, lunarMonth);
            }
            if (offset < daysInLunarMonth) {
                break;
            }
            offset -= daysInLunarMonth;
            if (leapMonth == lunarMonth && isLeap == false) {
                // 下个月是闰月
                leapDec = true;
                isLeap = true;
            } else {
                // 月份递增
                lunarMonth++;
            }
        }

        // 农历日数字
        var lunarDay = Math.floor(offset )+ 1;

        return [lunarMonth, lunarDay]
    }

    this.getSolarTermCalendar = function (solarYear, index) {
        return new Date((31556925974.7 * (solarYear - 1900) + this.solarTermInfo[index] * 60000) + Date.UTC(1900, 0, 6, 2, 5))
    }
    
    //返回公历日期的节气字符串
    this.getTermString = function(solarYear) {
        // 二十四节气

        var i, solarDay1, solarDay2, termString1 ="", termString2 ="", out = []
        for(i = 0; i < 12 ;i ++){
            solarDay1 = this.getSolarTermCalendar(solarYear, i * 2).getUTCDate()
            termString1 = this.solarTerm[parseInt(i * 2)];
            solarDay2 = this.getSolarTermCalendar(solarYear, i * 2 + 1).getUTCDate()
            termString2 = this.solarTerm[i * 2 + 1];
            out.push([[solarDay1,termString1],[solarDay2,termString2]])
        }
        return out;
    }

    //输出星期
    this.calculateDaysInfo = function (year, month, dayNum) {
        var day, i
        //计算气节表
        var solarTermTable = this.getTermString(year)
        for(i = 0; i < dayNum; i ++){
            day = {};
            day.date = i + 1
            day.weekday = this.calWeekDay(year,month,i + 1)
            day.nationalHoliday = ""
            var outcome = this.calLunarInfo(year, month - 1, i + 1)
            day.lunarMonth = this.getLunarMonthString(outcome[0])
            day.lunarDay = this.getLunarDayString(outcome[1])
            day.solarSessionTerm = ""

            if(day.lunarMonth > 6 && month < 6) {
                day.gan = this.tianGan[(this.calGan(year - 1) - 1 + 10) % 10]
                day.zhi =  this.diZhi[(this.calZhi(year - 1) - 1 + 12) % 12]
            } else {
                day.gan =  this.tianGan[(this.calGan(year) - 1 + 10) % 10]
                day.zhi =  this.diZhi[(this.calZhi(year) - 1 + 12) % 12]
            }
            this.days[i] = day
        }

        this.days[solarTermTable[month - 1][0][0] - 1].solarSessionTerm = solarTermTable[month - 1][0][1]

        this.days[solarTermTable[month - 1][1][0] - 1].solarSessionTerm = solarTermTable[month - 1][1][1]
    };


    //根据月数设置国际节日
    this.setHoliday = function (month) {
        var i, arr = this.nationalHoliday[month]
        var keys = Object.keys(arr)
        for(i = 0; i < keys.length; i ++) {
            this.days[keys[i] -1].nationalHoliday = arr[keys[i]]
        }
    }

    //获取生成JSON文件所用的信息
    this.getDayJson = function (year, month) {
        this.dayNum = this.getMonthDays(year, month)
        this.calculateDaysInfo(year,month, this.dayNum)
        this.setHoliday(month)
        return this.days
    }
}

module.exports = Calendar