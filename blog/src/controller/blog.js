/*
* 博客数据
*  - getList : 获取博客列表
*  - getDetail : 获取博客内容
*  - newBlog : 新增一篇博客
*  - updateBlog : 更新一篇博客
*  - delBlog : 删除博客
* */
const getList = (author, keyword) => {
    //先返回假数据，(格式是正确的)
    return [
        {
            id: 1,
            title: '标签A',
            content: '内容A',
            createTime: 1546610491112,
            author: 'zhangsan'
        }
        , {
            id: 2,
            title: '标签B',
            content: '内容B',
            createTime: 1546610524373,
            author: 'lisi'
        }
    ]
}

const getDetail = (id) => {
    //先返回假数据
    return [
        {
            id: 1,
            title: '标签A',
            content: '内容A',
            createTime: 1546610491112,
            author: 'zhangsan'
        }
    ]
}

const newBlog = (blogData = {}) => {
    //blogData 是一个博客对象 title content属性

    console.log("newBlog... blogData", blogData);

    return {
        id:3 //表示新建博客，插入到数据表里面的 id
    }
}

const updateBlog = (id,blogData={}) =>{
    return true
}

const delBlog = (id) =>{
    // id 就是要删除博客的 id
    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog,
}