// import { config } from "vue/types/umd";
import ajsx from "./ajax";
const Base_URL="/api"
const Base_URL1="http://192.168.1.46:3000/admin"

//首页列表

//分类左侧数据
export const getCategoryLeft=()=>{
    // console.log("left");
    return ajsx(Base_URL +"/catalog/list")
}
//分类右侧数据
export const getCategoryRight =(cat_id)=>{
    // console.log("right");

    return ajsx(Base_URL + "/catalog/list/" + cat_id)
}
export const getHomeList =(url,params)=>{
    // console.log("index");

    return ajsx(Base_URL +url, params)
}
export const getCategoryList =(url,params,type)=>{ //分类列表
    // console.log("index");

    return ajsx(Base_URL +url, params,type)
}
export const getgoodsList =(url,params,type)=>{ //分类列表
    // console.log("index");

    return ajsx(Base_URL +url, params,type)
}
export const userlogin =(url,params,type)=>{ //账号登录
    // console.log("index");

    return ajsx(Base_URL1 +url, params,type)
}
export const userregister =(url,params,type)=>{ //注册
    // console.log("index");

    return ajsx(Base_URL1 +url, params,type)
}
export const phonelogin =(url,params,type)=>{ //手机号登录
    // console.log("index");
 
    return ajsx(Base_URL1 +url, params,type)
}
export const  phoneyzm =(url,params,type)=>{ //手机验证码
    return ajsx(Base_URL1 +url, params,type)
}
