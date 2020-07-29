const { exec } = require('../db/mysql');//请求数据库

const loginCheck = (username,password) => {
    //
   const sql = `
    select username,realname from users where username='${username}' and password='${password}'
   `
    //返回的是一个数组
    return exec(sql).then(rows =>{
        console.log(username,password)
        return rows[0] || {}
    })
}

module.exports = {
    loginCheck
}