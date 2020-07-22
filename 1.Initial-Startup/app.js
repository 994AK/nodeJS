const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req,res)=>{
    console.log(req.method);//GET
    const url = req.url;//获取请求的完整url
    req.query = querystring.parse(url.split('?')[1])//解析querystring
    res.send(JSON.stringify(req.query));//将querystring 返回
})

server.listen(8000);

