const  { loginCheck } = require('../controller/user');
const {SuccessModel, ErrorModel} = require('../model/resModel')

const handleUserRouter = (req,res) =>{
    const method = req.method //GET POST
    const url = req.url
    const path = url.split("?")[0];

    //登录
    if(method === 'POST' && path === '/nodeJS/user/login') {
        /*
        *  username : 用户名
        *  password : 密码
        * */
        const { username, password } = req.body
        const result = loginCheck(username, password)
        if(result) {
            return new SuccessModel()
        }
        return new ErrorModel("登录失败")
    }
}

module.exports = handleUserRouter;