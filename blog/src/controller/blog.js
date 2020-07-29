const {exec} = require('../db/mysql')

// 获取博客列表
const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += 'and author="' + author + '" '
    }
    if (keyword) {
        sql += 'and title lik "%' + keyword + '%" '
    }

    sql += `order by createtime desc;`

    //返回 promise
    return exec(sql);
}

// 获取博客内容
const getDetail = (id) => {
    const sql = `select * from blogs where id='${id}'`
    return exec(sql).then(rows => {
        return rows[0]
    })

}

// 新增一篇博客
const newBlog = (blogData = {}) => {
    //blogData 是一个博客对象 title content属性
    const {title, content, author} = blogData
    const createTime = Date.now();
    const sql = `
        insert into blogs (title, content, createtime, author)
        value ('${title}','${content}','${createTime}','${author}')
    `
    return exec(sql).then(inserData => {
        console.log('insertData is', inserData);
        return {
            id: inserData.insertId
        }
    })
}

//更新一篇博客
const updateBlog = (id, blogData = {}) => {
    //id 就是要更新的 ID
    // blogData 是一个博客对象,包含 title content属 性

    const {title, content} = blogData

    const sql = ` 
        UPDATE blogs SET title='${title}', content='${content}'  WHERE id=${id};
    `
    return exec(sql).then(updateData => {
        if (updateData.affectedRows > 0) {
            return true;

        }
        return false;
    })

}

//删除博客
const delBlog = (id, author) => {
    // id 就是要删除博客的 id
    const sql = `delete from blogs where id='${id}' and author='${author}';`
    return exec(sql).then(delData => {
        if (delData.affectedRows > 0) {
            return true;

        }
        return false;
    })

}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog,
}