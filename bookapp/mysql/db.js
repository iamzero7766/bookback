const mysql = require('mysql')
const myCode = require('../utils/code');
// console.log(mysql)
// 创建数据池
const pool  = mysql.createPool({
    host     : 'localhost',   // 数据库地址
    user     : 'root',    // 数据库用户
    password : 'password',   // 数据库密码
    database : 'test'  // 选中数据库
})


exports.query = function(sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log("数据库连接失败", err);
                reject({
                    data: err,
                    status: myCode.err,
                })
            } else {
                console.log("数据库连接成功");
                connection.query(sql, values, (err, results) => {
                    if (err) {
                        reject({
                            data: err,
                            status: myCode.warn,
                        })
                    } else {
                        resolve({
                            code: myCode.success,
                            data: results,
                        })
                        connection.release()
                    }
                })
            }
        })
    })
}


