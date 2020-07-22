const  { getList, getDetail } = require('../controller/blog');
const  { SuccessModel, ErrorModel } = require('../model/resModel')

const  handleBlogRouter = (req, res) => {
    const method = req.method //GET POST
    const url = req.url
    const path = url.split("?")[0];

    //获取博客列表
    if (method === 'GET' && path === '/nodeJS/blog/list') {
        const author = req.query.author || '' // app.js query已经解析过了
        const keyword = req.query.keyword || ''
        const listData = getList(author,keyword) //返回数据
        return  new SuccessModel(listData)
    }

    //获取博客内容
    if (method === 'GET' && path === '/nodeJS/blog/detail') {
        const id = req.query.id
        const data = getDetail(id)
        return new SuccessModel(data)

    }

    //新增一篇博客
    if(method === 'POST' && path === '/nodeJS/blog/new') {
        return {
            msg:'这是新增一篇博客'
        }
    }

    //更新一篇博客
    if(method === 'POST' && path === '/nodeJS/blog/update') {
        return  {
            msg : '这是更新一篇博客'
        }
    }

    //删除一篇博客
    if(method === 'POST' && path === '/nodeJS/blog/del') {
        return  {
            msg : '删除一篇博客'
        }
    }
}

module.exports = handleBlogRouter;