//只关心数据
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


module.exports = {
    getList
}