# 总结
**初始化路由:根据之前技术方案的设计,做出路由
  返回假数据:将路由和数据处理分离,以符合设计原则**


`nodejs`处理http请求常用技能, `postman`的使用

`nodejs`开发博客项目的接口(未连接数据库未使用)

`./src/router`与 `./src/controller`

- `router` 我只管处理路由相关的,来什么路由我就处理什么格式,其他不用管
- `controller` 我只管处理数据,处理完数据给你返回,其他不用管

他们分别一个处理路由的,一个处理数据的 => 为了防止全部堆在一起分不清;

`./src/model`是一个模型返回数据与报错的模块;


2020/07/30

- 添加cookie的定义和特点
- 前端不能修改cookie，只能后端默认cookie
- 使用cookie实现模拟登录验证


2020/07/28

新增`mySQL+nodeJS`关联：

- `src\conf\db.js` 配置文件,本地配置,服务器配置
- `src\db\mysql.js`mysql关联让**数据**与**路由**进行封装

新增改变：

- `controller`数据的`blog`与`user`都进行了封装化 
- `router`路由的`blog`与`user`请求到MySQL上数据

