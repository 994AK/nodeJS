const querystring = require('querystring');
const handleBlogRouter = require('./src/router/blog');//获取，更新，删除，博客接口
const {handleUserRouter,getCookieExpires} = require('./src/router/user');//登录接口

//session数据
const SESSION_DATA = {}

//用于处理 post data
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        //请求头不是POST就返回空
        if (req.method !== 'POST') {
            resolve({})
            return
        }

        //格式不是JSON就返回空
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = '';
        req.on('data', chunk => {
            postData += chunk.toString()
        })

        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })

    })
    return promise
}


const serverHandle = ((req, res) => {
    //设置返回格式
    res.setHeader('Content-type', 'application/json')

    //获取 path
    const url = req.url;
    req.path = url.split('?')[0]

    // 解析 query
    req.query = querystring.parse(url.split('?')[1]);

    //解析 cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || '' //k1 =v1;k2=v2;k3=v3
    cookieStr.split(';').forEach(item=>{
        if(!item){
            return
        }
        const arr = item.split('=')
        //trim()清空格 为了防止 前端改变cookie
        const  key = arr[0].trim()
        const  val = arr[1].trim()
        req.cookie[key] = val
    })
    
    //解析session
    let needSetCookie = false;
    let userId = req.cookie.userid
     //如果session有userId添加到一个对象中
    if (userId) {
        if(!SESSION_DATA[userId]) {
            SESSION_DATA[userId] = {}
        }
    }else {
        needSetCookie = true
        //如果session 没有userId就创建一个随机对象添加到对象中
        userId = `${Date.now()}_${Math.random()}`
        SESSION_DATA[userId] = {}
    }
    req.session = SESSION_DATA[userId]
    

    //处理 post data
    getPostData(req).then(postData => {
        req.body = postData

        //处理blog路由
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {

                if (needSetCookie) {
                    res.setHeader('Set-Cookie',`userid=${userId}; path= /; httpOnly expires=${getCookieExpires()}`)
                }
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return;
        }


        //处理 user 路由
        const userResult = handleUserRouter(req, res)
        if (userResult) {
            userResult.then(userData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie',`userid=${userId}; path= /; httpOnly expires=${getCookieExpires()}`)
                }

                res.end(
                    JSON.stringify(userData)
                )
            })
            return
        }

        //未命中路由,返回 404
        res.writeHead(404, {'Content-type': 'text/plain'})
        res.write('404 Not Found\n')
        res.end();
    })
})

module.exports = serverHandle

