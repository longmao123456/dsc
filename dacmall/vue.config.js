//配置vue项目 注意：修改完配置文件需要重新启动项目才能生效
 module.exports={
     publicPath:'/',
     devServer:{
         host:"localhost",
         port:"9527",
         open:true, //自动在浏览器地址打开栏目
         proxy:{ //配置跨域请求
            "/api":{   //使用时用api代替https://x.dscmall.cn/api
                target:"https://x.dscmall.cn/api",
                changeOrigin:true,//允许跨域
                pathRewrite:{
                    "^/api":""
                }
            }

         }
     }
 }