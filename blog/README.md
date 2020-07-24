
nodejs处理http请求常用技能, postman的使用

nodejs开发博客项目的接口(未连接数据库未使用)

`./src/router`与 `./src/controller`

- `router` 我只管处理路由相关的,来什么路由我就处理什么格式,其他不用管
- `controller` 我只管处理数据,处理完数据给你返回,其他不用管

他们分别一个处理路由的,一个处理数据的 => 为了防止全部堆在一起分不清;