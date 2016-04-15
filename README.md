# Calendar
一个日历系统，有两个实现版本。第一版为单机版，不需要服务器支持，第二版需要使用自建服务器提供的API向客户端传送数据。API的使用说明在根目录下的`API.md`文件中
## 使用方法
### 单机版
直接点击根目录下的`Calendar_Standalone.html`可直接运行
### 联机版
首先运行`server.js`,需先安装相关依赖
```
$ npm install
$ node server.js
```
然后在点击根目录下的`Calendar_Server.html`即可

## 设计思路
### 服务器端
在服务器端使用`express`处理路由，并提供`RESTful`的`API`，支持`JSONP`格式的跨域请求，根目录下的`server.js`文件用于实现上述功能。

通过获取请求中的`year`和`month`参数，算出对应年月每天的公历、农历、节气和节假日信息，`js`文件夹下的`calendar.js`实现了上述功能。

### 客户端
客户端通过`JSONP`获取服务器上的数据，并在回调函数中处理这些数据，然后根据这些数据动态显示日历信息，`js`文件夹下的`index-multi.js`实现了上述功能。

### 单机版
单机版在客户端计算相关数据，并使用这些数据动态显示日历信息。

### 界面
界面通过`html`和`scss`构建，`html`文件中只包含了页面的框架，主体内容使用`JavaScript`生成