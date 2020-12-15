//state主要存数据 定义数据
const state ={
    num:1,
    dataList: localStorage.getItem("dataList") ? JSON.parse(localStorage.getItem("dataList")) : [],
    msg:'',
    flagi:false,
    plastr:'',
    nextUrl:'/',
    cat_id:858,
    categoryRightDates:[],
    ad:'',
    loadflag:true,
    listflag:true,
    categoryList:[],
    goodsList:[],
    cartList:localStorage['cartList'] ? JSON.parse(localStorage['cartList']) :[],
    address:{
        prov: '河南省',
        city:'郑州市',
        county:'中原区'
    },
    usertoken:JSON.parse(localStorage.getItem("usertoken"))  || {}

}
export default state