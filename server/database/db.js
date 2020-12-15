const mysql =require("mysql");
const connection=mysql.createConnection({
    host:"localhost",//域名或者ip地址
    user:"root" , //数据库的用户名
    password:"", //mysql数据库的密码
    database:"shop"//要连接的数据库的名字

});
//封装查询方法，给不同的sql查询对应的数据
function requestQuery(sql){
    return new Promise((resolve,reject)=>{
        connection.query(sql,(err,data)=>{
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}
module.exports ={
    connection,
    requestQuery    
}