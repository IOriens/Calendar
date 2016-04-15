# 获取日历信息
根据`year`,`month`来获取指定年月的日历信息表

## URL
http://localhost:8081/api/v1/calendar

## 支持格式
JSONP

## HTTP请求方式
GET

## 是否需要登录
否

## 请求参数
参数名 | 必选 | 类型及范围 | 说明
--- | --- | --- | ---
page | true | int | 当前页
page_size | false | int | 每页多少条数据, 默认为20

## 请求程序示例(使用JQuery)
```
function getData (url, y, m) {
    var request = $.ajax({
        url: url,
        dataType: "jsonp",
        data: {year: y, month: m},
        jsonpCallback: "fetchData2",
        type: "GET"
    }).fail(function(error){
        console.error(error)
        alert('Error sending request')
    })
}
```

## JSONP回调函数示例
```
function fetchData (json) {
    var p = document.createElement('p')
    var out = ""
    console.log(json)
    for(var i = 0; i < json.length; i++) {
        out += json[i].nationalHoliday + "<br>"
    }
    p.innerHTML = out
    document.getElementById('yearInfo').appendChild(p)
};
```

##  正确返回结果示例
```
/**/ typeof fetchData === 'function' && fetchData([{"date":1,"weekday":5,"nationalHoliday":"国际愚人节","lunarMonth":2,"lunarDay":24,"solarSessionTerm":"","gan":2,"zhi":8},{"date":2,"weekday":6,"nationalHoliday":"国际儿童图书日","lunarMonth":2,"lunarDay":25,"solarSessionTerm":"","gan":2,"zhi":8},{"date":3,"weekday":0,"nationalHoliday":"","lunarMonth":2,"lunarDay":26,"solarSessionTerm":"","gan":2,"zhi":8},{"date":4,"weekday":1,"nationalHoliday":"","lunarMonth":2,"lunarDay":27,"solarSessionTerm":"清明","gan":2,"zhi":8},{"date":5,"weekday":2,"nationalHoliday":"","lunarMonth":2,"lunarDay":28,"solarSessionTerm":"","gan":2,"zhi":8},{"date":6,"weekday":3,"nationalHoliday":"","lunarMonth":2,"lunarDay":29,"solarSessionTerm":"","gan":2,"zhi":8},{"date":7,"weekday":4,"nationalHoliday":"世界卫生日","lunarMonth":3,"lunarDay":1,"solarSessionTerm":"","gan":2,"zhi":8},{"date":8,"weekday":5,"nationalHoliday":"","lunarMonth":3,"lunarDay":2,"solarSessionTerm":"","gan":2,"zhi":8},{"date":9,"weekday":6,"nationalHoliday":"","lunarMonth":3,"lunarDay":3,"solarSessionTerm":"","gan":2,"zhi":8},{"date":10,"weekday":0,"nationalHoliday":"","lunarMonth":3,"lunarDay":4,"solarSessionTerm":"","gan":2,"zhi":8},{"date":11,"weekday":1,"nationalHoliday":"","lunarMonth":3,"lunarDay":5,"solarSessionTerm":"","gan":2,"zhi":8},{"date":12,"weekday":2,"nationalHoliday":"","lunarMonth":3,"lunarDay":6,"solarSessionTerm":"","gan":2,"zhi":8},{"date":13,"weekday":3,"nationalHoliday":"","lunarMonth":3,"lunarDay":7,"solarSessionTerm":"","gan":2,"zhi":8},{"date":14,"weekday":4,"nationalHoliday":"","lunarMonth":3,"lunarDay":8,"solarSessionTerm":"","gan":2,"zhi":8},{"date":15,"weekday":5,"nationalHoliday":"","lunarMonth":3,"lunarDay":9,"solarSessionTerm":"","gan":2,"zhi":8},{"date":16,"weekday":6,"nationalHoliday":"","lunarMonth":3,"lunarDay":10,"solarSessionTerm":"","gan":2,"zhi":8},{"date":17,"weekday":0,"nationalHoliday":"","lunarMonth":3,"lunarDay":11,"solarSessionTerm":"","gan":2,"zhi":8},{"date":18,"weekday":1,"nationalHoliday":"","lunarMonth":3,"lunarDay":12,"solarSessionTerm":"","gan":2,"zhi":8},{"date":19,"weekday":2,"nationalHoliday":"","lunarMonth":3,"lunarDay":13,"solarSessionTerm":"谷雨","gan":2,"zhi":8},{"date":20,"weekday":3,"nationalHoliday":"","lunarMonth":3,"lunarDay":14,"solarSessionTerm":"","gan":2,"zhi":8},{"date":21,"weekday":4,"nationalHoliday":"","lunarMonth":3,"lunarDay":15,"solarSessionTerm":"","gan":2,"zhi":8},{"date":22,"weekday":5,"nationalHoliday":"世界地球日","lunarMonth":3,"lunarDay":16,"solarSessionTerm":"","gan":2,"zhi":8},{"date":23,"weekday":6,"nationalHoliday":"世界图书和版权日","lunarMonth":3,"lunarDay":17,"solarSessionTerm":"","gan":2,"zhi":8},{"date":24,"weekday":0,"nationalHoliday":"世界青年反对殖民主义日","lunarMonth":3,"lunarDay":18,"solarSessionTerm":"","gan":2,"zhi":8},{"date":25,"weekday":1,"nationalHoliday":"","lunarMonth":3,"lunarDay":19,"solarSessionTerm":"","gan":2,"zhi":8},{"date":26,"weekday":2,"nationalHoliday":"世界知识产权日","lunarMonth":3,"lunarDay":20,"solarSessionTerm":"","gan":2,"zhi":8},{"date":27,"weekday":3,"nationalHoliday":"","lunarMonth":3,"lunarDay":21,"solarSessionTerm":"","gan":2,"zhi":8},{"date":28,"weekday":4,"nationalHoliday":"","lunarMonth":3,"lunarDay":22,"solarSessionTerm":"","gan":2,"zhi":8},{"date":29,"weekday":5,"nationalHoliday":"","lunarMonth":3,"lunarDay":23,"solarSessionTerm":"","gan":2,"zhi":8},{"date":30,"weekday":6,"nationalHoliday":"","lunarMonth":3,"lunarDay":24,"solarSessionTerm":"","gan":2,"zhi":8}]);
```

## 将JSONP回调函数参数美化后的结果
```
[
{
        "date": 1,
        "weekday": 5,
        "nationalHoliday": "国际愚人节",
        "lunarMonth": "二月",
        "lunarDay": "廿四",
        "solarSessionTerm": "",
        "gan": "丙",
        "zhi": "申"
    },
    {
        "date": 2,
        "weekday": 6,
        "nationalHoliday": "国际儿童图书日",
        "lunarMonth": "二月",
        "lunarDay": "廿五",
        "solarSessionTerm": "",
        "gan": "丙",
        "zhi": "申"
    }
]
```
## 返回参数说明
参数名 |  类型及范围 | 说明
--- | --- | ---
date |  int | 公历日期
weekday |  int | 公历星期
nationalHoliday |  string | 国际节日
lunarMonth |  string | 农历月数
lunarDay |  string | 农历日期
solarSessionTerm |  string | 节气
gan |  string |  天干
zhi |  string | 地支
