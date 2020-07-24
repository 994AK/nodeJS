//nodejs.cn网站进行下载安装
/*
* node -v 检查是否安装成功
*
* */

//使用nbm安装
//打开GitHub搜索nvm-windows下载

/*
*   ECMAScript 定义语法，写JS和nodeJS的
*   定义了变量，作用域等等定义
*   不能写DOM,BOM操作，事件绑定，Ajax之类
*
*   JS
*   使用ES语法规范，外加Web API 缺一不可
*   DOM操作，BOM操作，事件绑定，AJax等
*   两者结合，缺一不可;
*
*   nodeJS
*   使用ES语法规范，外加nodeJS API，缺一不可
*   处理 http, 处理文件等, 具体参考 http://nodejs.cn/api/
*   两者结合,即可完成server端的任何操作
*
*   ES语法规范 没有API
*   nodeJS = ES + nodejs API1
*   JS = ES + JS Web API
*
*
* */

//npm 的安装
//npm init -y //初始化
//npm i 包名 -S //安装在当前目录

//目标:
//1.开发一个博客系统,具有博客的基本功能
//2.只开发server端,不关系前端

//需求
//1.首页，作者主页,博客详情页
//2.登录页
//3.管理中心，新建页，编写页

/* 技术方案
* 1.数据如何存储
* 2.如何与前端对接，即接口设计
*
* 1.数据存储
* - 博客
*
* - 用户
*
* 2.接口设计
* 描述                接口                方法      url参数                           备注
* 获取博客列表        /api/blog/list      get      author作者,keyword搜索关键字       参数为空的话，则不进行查询过滤
* 获取一篇博客的内容   /api/blog/detail    get      id
* 新增一篇博客        /api/blog/new       post                                      post中有新增的信息
* 更新一遍博客        /api/blog/update    post     id                               postData中更新的内容
* 删除一篇博客        /api/blog/del       post     id
* 登录               /api/user/login     post                                      postData中用户名和密码
* */

/*
* http请求概念
* 1.DNS解析，建立TCP连接,发送http请求
* 2.server接收到http请求，处理，并返回
* 3.客户端接收到返回数据,处理数据(如渲染页面，执行JS)
*
* req => 发送请求 :客户端向服务器端发送请求是req
* res => 返回请求 :服务端返回是res
*
* nodeJS 处理http请求
* 1.get请求和querystring
* 2.post请求和postdata
* 3.路由
*
*
* */

/*
* nodejs处理get请求
* 1.get请求,即客户端要向server端端获取数据，如查询博客列表
* 2.通过querystring来传递数据,如a.html?a=100&b=200
* 3.浏览直接访问,就发送get请求
* */

/*
* nodejs处理post请求
* post请求,即客户端要像服务端传递数据，如新建博客
* 通过 post data传递数据,后面会演示
* 浏览器无法直接模拟，需要手写js，或者使用postman;
*
* */

/*
* nodeJS处理路由？
* https://github.com/
* https://github.com/username
* https://github.com/username/xxx..
*  / 后面是唯一的标识就代表了路由
*
*
* */