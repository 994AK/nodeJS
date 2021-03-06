const  { login } = require('../controller/user');
const {SuccessModel, ErrorModel} = require('../model/resModel')

const getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + (24*60*60*1000))
    console.log(d.toGMTString())
    return d.toGMTString();
}

const handleUserRouter = (req,res) =>{
    const method = req.method //GET POST
    const url = req.url
    const path = url.split("?")[0];

    //登录
    if(method === 'GET' && path === '/nodeJS/user/login') {
        // const { username, password } = req.body
        const { username, password } = req.query
        const result = login(username, password)
        return result.then(data =>{
            console.log(data.username);
            //data:数据中的rows[0] => users表中的 [username, realname]
            if(data.username) {
                //设置 session
                req.session.username = data.username
                req.session.realname = data.realname

                console.log('req.,session is ',req.session);


                return new SuccessModel()
            }
            return new ErrorModel("登录失败")
        })
    }

    //登录验证的测试
    if(method === 'GET' && req.path === '/nodeJS/user/login-test'){
        if(req.session.username) {
            return Promise.resolve(
                new SuccessModel({
                    //登录后返回cookie自带名字;
                    session:req.session
                })
            )
        }
        return Promise.resolve(
            new ErrorModel('尚未登陆')
        )
    }
}

module.exports = {
    handleUserRouter,
    getCookieExpires,
};