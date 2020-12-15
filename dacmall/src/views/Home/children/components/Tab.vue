<!--  -->
<template>
<div class="tab-nav">
   <div class="title-tab">
     <ul>
       <li v-for="(value,index) in tabList" :key="index" :class="{active:index==oIndex}" @click="tabfn(index)">
         <div class="title1">{{value.title1}}</div>
         <div class="title2">{{value.title2}}</div>

       </li>
     </ul>
   </div>
 <List :dataList="dataList"  v-infinite-scroll="loadMore(datatabList[oIndex].url,datatabList[oIndex].type,datatabList[oIndex].size)"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10" />
   <img class="imgshow" src="http://imgs.xueui.cn/wp-content/uploads/2018/03/201803151521151011.gif" v-show="flag" alt="">
   <div class="loadingno" v-show="show">暂无更多商品</div>
 </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// import Axios from "axios";

import List from  "@/components/List"
import ajax from "@/api/ajax.js"
console.log(ajax)
export default {
//import引入的组件需要注入到对象中才能使用
components: {
    List
},
data() {
//这里存放数据
return {
dataList:[],
    show:false,
      page:1,
      tabList:[
        {
          id:1,
          title1:"精选",
          title2:"为你推荐"
        },
        {
          id:2,
          title1:"社区",
          title2:"新奇好物"
        },
        {
          id:3,
          title1:"新品",
          title2:"潮流上新"
        },
        {
          id:4,
          title1:"热卖",
          title2:"火热爆款"
        }
      ],
      datatabList:[
          {
              url:"/api/goods/type_list",
              type:"is_best",
              size:10
          },{

         url:"/api/discover/find_list",
          type:'',
          size:10,
          },{
              url:"/api/goods/type_list",
              type:"is_new",
              size:10,

          },{
              url:"/api/goods/type_list",
              type:"is_hot",
              size:10,
          }
      ],
      oIndex:0,
    flag:false,
    loading:true
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {



},
//方法集合
methods: {

   loadMore(url,type,size) {
        // console.log(1111111)
        this.loading = true;
        // console.log(url,type)
        if(this.page<=size){
          this.show=false;
          this.loading =false;
                  this.flag=true;
                  // console.log("22222");

        ajax(url,{
                    page:this.page,
                    size:size,
                    type:type
                }
                ).then((res)=>{
                      // console.log(res.data)
                  
        // for(let i=0;i<res.data.length;i++){
        //           this.dataList.push(res.data[i])
        
        //           }
            this.dataList= this.dataList.concat(res.data)
                //   console.log(this.dataList)
                  // console.log(res.data.data)
                  this.page++;
              
                  this.flag=false;
                  
                })
        }else{
                  this.show=true;

        }
 
},
tabfn(index){
this.oIndex=index
this.dataList=[];
this.page=1;
}
},

beforeCreate() {}, //生命周期 - 创建之前
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
beforeMount() {}, //生命周期 - 挂载之前
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
//  this.getBestDatas()
this.loadMore(this.datatabList[this.oIndex].url,this.datatabList[this.oIndex].type,this.datatabList[this.oIndex].size)
   
},
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发

}
</script>
<style lang="less">
.tab-nav{
  margin: 2rem 1rem 0; 
     width: calc(100%-2rem);
 .title-tab{
   ul{
     display: flex;
      margin: 0.5rem 0;
     li{
           &:first-child{
    border-left: 0;
             
         }
         padding: 0 0.8rem;
         box-sizing: border-box;
    width: 25%;
    text-align: center;
    border-left: 1px solid #999;
    .title1{
        font-weight: 700;
        font-size: 1.6rem;
    }
    .title2{
        color: white;
        // background-color: red;
        color: #666;
       border-radius: 1rem;
       line-height: 1.6rem;
    }
    
     }
     .active{
         .title2{
        color: white;
        background-color: red;
       border-radius: 1rem;
       line-height: 1.6rem;
    }
     }
   }
 }
  .imgshow{
      width: 100%;
  } 
 }
 .loadingno{
   margin-top: 1rem;
   margin-bottom: 6rem;
   text-align: center;
   font-size: 2rem;
 }
</style>