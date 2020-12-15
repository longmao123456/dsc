const express=require("express");
const router=express.Router();
const UserController = require("../controller/UsersController")

router.get("/userlist", UserController.UserList) //用户列表
router.post("/login",UserController.UserLogin) //登录
router.post("/phonelogin",UserController.phonelogin) //手机号登录

router.post("/register",UserController.UserRegister) //注册

router.post("/phoneyzm",UserController.phonecaptcha)  //手机验证码
router.get("/yzm",UserController.SvgCaptcha)  //二维码
module.exports=router