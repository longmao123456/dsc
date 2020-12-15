<!--  -->
<template>
<div class='register'>
    <div class="logo">
            <img :src="imgsrc" alt="">
        </div>
    <h2><span> 注册</span><u></u></h2>
    <p><input type="text" name="" id="" placeholder="用户名" v-model="username"> <i>*</i></p>
    <p><input :type="sflag ?'password' :'text'" name="" id="" placeholder="密码" v-model="password"><span @click="changesflag" v-if="sflag" class="iconfont icon-yincang
"></span><span @click="changesflag" v-else class="iconfont icon-xianshi"></span> <i>*</i></p>
    <p><input type="text" name="" id="" placeholder="电话号码" v-model="phone"><i>*</i></p>
    <p><input type="email" name="" id="" placeholder="邮箱" v-model="email"></p>
    <div>

    
    <select name="" id="" v-model="sex">
                    <option value="男">男</option>
                    <option value="女">女</option>
                    <option value="保密">保密</option>
                </select> <input type="text" v-model="age" placeholder="请输入年龄">
                </div>
    <p><input type="text" name="" id="" placeholder="地址" v-model="address"></p>
     <p><button @click="registerfn">点击注册</button></p>

</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {userregister}  from  "@/api/api.js"

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
 imgsrc: require("@/assets/imges/logo.jpg"),
 username:"",
 password:"",
 phone:"",
 address:"",
 email:"",
 sex:"男",
 age:"",
 sflag:true

    
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
 
async  registerfn(){
    if(this.username==''){
        alert("用户名不能为空")
    }else if(this.password==''){
        alert("密码不能为空")
    }else if(this.phone==''){
        alert("电话号码不能为空")
    }else {

   if(/^1[3|4|5|7|8][0-9]{9}$/.test(this.phone)){

//   console.log(11)

     let params={
         username:this.username,
         password:this.password,
         phone:this.phone,
         email:this.email,
         address:this.address,
         age:this.age,
         sex:this.sex,

     }
  let result =await userregister("/register",params,"post")
  console.log(result)
    if(result){
       this.username="";
 this.password=""
 this.phone=""
 this.address=""
 this.email=""
 this.sex="男"
    this.$router.push("/")
    }
   }else{
       alert("请输入正确的手机号")
   }

   }
  },
 changesflag(){
     this.sflag=!this.sflag;

 }
},
beforeCreate() {}, //生命周期 - 创建之前
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
beforeMount() {}, //生命周期 - 挂载之前
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="less">
.register{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    height: 100%;
    // height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    width: 100%;
.logo{
             
             width:10rem;
             height: 15rem;
             width:15rem;
           display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
                 border-radius: 50%;
             
             img{
                 height: 112%;
             }
         }

    h2{
     text-align: center;
     width: 90%;
     position: relative;
     height: 5rem;
     span{
         background-color: #efefef;
     height: 5rem;
   line-height: 5rem;
         position: absolute;
        //   top: 50%;
         left: 50%;
         font-size: 3rem;
         transform: translateX(-50%);
         width: 25%;
         font-weight: normal;
         color: #333;
     }
    u{
         background-color: #fff;
         position: absolute;
         top: 50%;
         left: 50%;
         transform: translate(-50%);
         width: 100%;
         height: 1px;
         background-color: #fff;
         z-index: -1;

     }
    }
    p{
        // flex:1
        background-color: #fff;
        border-radius: .5rem;
        height: 4rem;
        width: 90%;
        display: flex;
        margin-bottom: 1rem;
        overflow: hidden;
        justify-content: center;
        span{
            font-size: 2.5rem;
            line-height: 4rem;
        }
        input{
            font-size: 1.4rem;
            text-indent: 1rem;
            flex: 1;
        }
        i{
            width: 4rem;
            height: 4rem;
            text-align: center;
            line-height: 4rem;
            font-size: 2rem;
            color: red;
        }
        button{
            width: 100%;
            background-color: red;
            color: #fff;
            font-size: 1.6rem;
        }
    }
    div{
        width: 90%;
        height: 4rem;
        display: flex;
        margin-bottom: 1rem;
        border-radius: .5rem;
        overflow: hidden;
         border: 1px solid #efefef;
        select{

            font-size: 1.6rem;
            
        border:0;
          background-color: #fff;
            width: 20%;
            // height: 100%;

            border: 0px;
            outline: 0;
        }
        input{
        flex: 1;
        text-indent: 1rem;
        }


    }
}
</style>