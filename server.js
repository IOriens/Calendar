/**
 * Created by IOriens on 2016/4/14.
 */
var express = require('express')
var Calendar = require('./js/calendar')

var app = express()

app.get('/api/v1/calendar',function (req, res) {


    var query = req.query
    var　currDate = new Date();
    var year = query.year || currDate.getFullYear()
    var month = query.month || currDate.getMonth()

    year = parseInt(year)
    month = parseInt(month)

    console.log(year, month)
    var calendar = new Calendar
    // var jsonFile = JSON.stringify(calendar.getDayJson(year, month))
    var jsonFile = calendar.getDayJson(year, month)
    res.jsonp(jsonFile)
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})