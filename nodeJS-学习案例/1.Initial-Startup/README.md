# http请求概念

1. DNS解析，建立TCP连接,发送http请求
2. server接收到http请求，处理，并返回
3. 客户端接收到返回数据,处理数据(如渲染页面，执行JS)
>req => 发送请求 :客户端向服务器端发送请求是req

>res => 返回请求 :服务端返回是res

**nodeJS 处理http请求**

1. get请求和querystring
2. post请求和postdata
3. 路由

**nodejs处理get请求**

1. get请求,即客户端要向server端端获取数据，如查询博客列表
2. 通过querystring来传递数据,如a.html?a=100&b=200
3. 浏览直接访问,就发送get请求

**nodejs处理post请求**

1. post请求,即客户端要像服务端传递数据，如新建博客
2. 通过 post data传递数据,后面会演示
3. 浏览器无法直接模拟，需要手写js，或者使用postman;

# GET POST 案例请求

把请求头,地址,获取前面路径
```js
const method = req.method //GET POST
const url = req.url 
const path = url.split("?")[0]; //获取前面url路径

```

GET接口请求
```js
if (method === 'GET' && path === '/nodeJS/blog/list') {
    return {
        msg:'这是获取博客列表'
    }
}
```

POST接口请求
```js
if(method === 'POST' && path === '/nodeJS/user/login') {
    return {
        msg:'这是登录接口'
    }
}

```

