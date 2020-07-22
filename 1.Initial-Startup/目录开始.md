学习nodeJS语法与规范

安装`nodeJS`打开网站搜索`nodejs.cn`即可下载对应版本

安装成功后，打开命令或者控制台输入
```js
node -v 
```
即检查版本号，如未看见版本号，请重新安装node

了解一下`ES`,`JS`,`nodeJS`


ECMAScript 定义语法，写JS和nodeJS的
- ES只是一个语法规范，给JS,nodeJS定义的规范并没有API,他自带有作用域,变量等定义规范
- JS是ES语法规范 + Web API规范组成,他可以操作DOM BOM 扩展到框架等
- nodeJS是ES语法规范 + node API组成处理 http, 处理文件等, 具体参考`http://nodejs.cn/api/` 两者结合,即可完成server端的任何操作 


npm的安装步骤
```js
npm init -y //初始化
npm i express -S //安装express包
```
<br/>
deom的项目目标

1. 开发一个博客系统,具有博客的基本功能
2. 只开发server端,不关系前端

<br/>
功能:

1. 首页，作者主页,博客详情页
2. 登录页
3. 管理中心，新建页，编写页
