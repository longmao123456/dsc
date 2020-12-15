const express = require("express");
const app =new express();
const UsersRouter=require("./router/user")
//配置post发送的文本数据
app.use(express.urlencoded({
    extended: false
}))
//后台允许前端跨域请求数据开始
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});
//后台允许前端跨域请求数据结束
app.use(express.json())
app.use("/admin",UsersRouter)
app.listen(3000,()=>{
console.log(3000);
})