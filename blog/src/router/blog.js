const  handleBlogRouter = (req, res) => {
    const method = req.method //GET POST
    const url = req.url
    const path = url.split("?")[0];

    //获取博客列表
    if (method === 'GET' && path === '/nodeJS/blog/list') {
        return {
            msg:'这是获取博客列表'
        }
    }

    //获取博客内容
    if (method === 'GET' && path === '/nodeJS/blog/detail') {
        return {
            msg:'这是获取一篇博客内容'
        }
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