import Vue from "vue";
import VueRouter from "vue-router"; //需要下载 npm i vue-router --s 然后再引入使用
//使用
Vue.use(VueRouter);
//创建组件
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
import Home from "../views/Home/Home";
import Find from "../views/Find/Find";
import Mine from "../views/Mine/Mine";
import Cart from "../views/Cart/Cart";
import Category from "../views/Category/Category";
import  Search from '../views/Category/children/Search'
//配置路由
let routes=[{
    path:"/home",
    component:Home,
    children:[{
        path:"index", //首页
        component:()=> import('../views/Home/children/Index.vue')
    }, {
        path: "household", //家用电器
        component: () => import('../views/Home/children/Household')   //按需引入，路由懒加载
    }, {
        path: "clothing", //男装女装
        component: () => import('../views/Home/children/Clothing')   //按需引入，路由懒加载
    }, {
        path: "shoebag", //鞋靴箱包
        component: () => import('../views/Home/children/ShoeBag')   //按需引入，路由懒加载
    }, {
        path: "mobilephones", //手机数码
        component: () => import('../views/Home/children/MobilePhones')   //按需引入，路由懒加载
    }, {
        path: "computer", //电脑棒
        component: () => import('../views/Home/children/Computer')   //按需引入，路由懒加载
    }, {
        path: "hometextiles", //家具家访
        component: () => import('../views/Home/children/HomeTextiles')   //按需引入，路由懒加载
    }, {
        path: "personalmakeup", //个人化妆
        component: () => import('../views/Home/children/PersonalMakeup')   //按需引入，路由懒加载
    }, {
        path: "/home",
        redirect: "/home/index"  //路由重定向
    }
]
  
},{
    path:"/cart",
    component:Cart
},{
    path:"/find",
    component:Find
},{
    path:"/mine",
    component:Mine
},{
    path:"/category",
    component:Category,
  
},{
    path:"/search",
    component:Search,
  
},{
    path:"/searchlist",  //搜索列表
    component:()=> import("../views/Category/children/SearchList"),
    
},{
    path:"/categorylist/:cid", //商品列表
    component:()=> import("../views/Category/components/CategoryList"),
}
,{
    path:"/goodsdetail/:cid",
    component:()=> import("../views/goodsDetail/goodsDetail"),
},{
    path:"/login",
    component:()=> import("../views/Login/index"),
},{
    path:"/register",
    component:()=> import("../views/Login/register"),
},{
    path:"/",
    redirect:"/home"
}
]
let router =new VueRouter({
    routes
})
router.beforeEach((to,from,next)=>{
    //to:Route:即将要进入的目标（要跳转到的目标），路由对象
    //from:Router:当前导航要离开的路由（ 从何而来）
    //next:Function:一定要调用该方法来resolve这个钩子
   if(to.path=="/login"||to.path=="/register" ){
       next();
       return ;
   }
   //获取token
//    const token =JSON.parse(window.localStorage.getItem("usertoken")).token
//    console.log(token);
   if(!window.localStorage.getItem("usertoken")) return next("/login")
   next()
})
//暴露
export default router

