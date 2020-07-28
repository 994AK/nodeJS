const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db');

//创建链接对象
const con = mysql.createConnection(MYSQL_CONF)

//开始链接
con.connect()

//统一再执行sql的函数
function exec(sql) {
    const promise = new Promise((resolve, reject) => {
        con.query(sql,(err,result)=>{
            if(err) {
                //报错
                reject(err);
                return
            }
            //执行
            resolve(result);
        })
    })
    return promise
}


//返回
module.exports = {
    exec
}