const env = process.env.NODE_ENV //环境参数

//配置
let MYSQL_CONF;

//本地配置
if (env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: '3306',
        database: 'myblog'
    }
}

//服务器配置
if (env === 'production') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: '3306',
        database: 'myblog'
    }
}

module.exports = {
    MYSQL_CONF
}