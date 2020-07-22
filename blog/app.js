const handleBlogRouter = require('./src/router/blog');//获取，更新，删除，博客接口
const handleUserRouter = require('./src/router/user');//登录接口

const serverHandle = ((req,res)=>{
    //设置返回格式
    res.setHeader('Content-type','application/json')

    const method = req.method; //GET POST

    //处理blog路由
    const blogData = handleBlogRouter(req, res)
    if (blogData) {
        res.end(
            JSON.stringify(blogData)
        )
        return
    }

    //处理 user 路由
    const userData = handleUserRouter(req, res)
    if (userData) {
        res.end(
            JSON.stringify(userData)
        )
        return
    }

    //未命中路由,返回 404
    res.writeHead(404, {'Content-type':'text/plain'})
    res.write('404 Not Found\n')
    res.end();

})

module.exports = serverHandle

