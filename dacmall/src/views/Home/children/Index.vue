<!--  -->
<template>
<div class=''>
    <div class="swipe">
    <div class="box1" :style="colorObj" >

        </div>
        <div class="box" :style="colorObj" >

        </div>
        <mt-swipe :auto="4000" @change="headleChange">
  <mt-swipe-item>
       <img
          src="https://x.dscmall.cn/storage/data/gallery_album/177/original_img/177_P_1597978394783.jpg"
          alt
        />
  </mt-swipe-item>
  <mt-swipe-item>
      <img
          src="https://x.dscmall.cn/storage/data/gallery_album/177/original_img/177_P_1597978397105.jpg"
          alt
        />
  </mt-swipe-item>
  <mt-swipe-item>
       <img
          src="https://x.dscmall.cn/storage/data/gallery_album/177/original_img/177_P_1597978395260.jpg"
          alt
        />
  </mt-swipe-item>
</mt-swipe>
    </div>
 <div>
     <Swipe/>
     <News /> 
     <div class="img-box"><img src="https://x.dscmall.cn/storage/data/gallery_album/original_img/CPvH5WHHbF0EoG9XjRQbbT3knMVCeEt9DlYGQhJM.png?imageView2/2/format/webp" alt=""></div>
 </div>
 <Seckill/>
 <div>
   <Tab></Tab>
 </div>
 
</div>

</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Swipe from "./components/swipe";
import News from "./components/news"
import Seckill from "./components/seckill"

import Tab from "./components/Tab"
export default {
//import引入的组件需要注入到对象中才能使用
components: {
  Swipe,
  News,
  Seckill,
 
  Tab
},
data() {
//这里存放数据
return {
  colorIndex:0,
  colorObj: {
        background: "red",
      },
      colorArr: [
        {
          background: "red",
        },
        {
          background: "#409eff",
        },
        {
          background: "rgb(2,131,121)",
        },
      ],
     
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
   headleChange(index){

  this.colorObj=this.colorArr[index]
   },

},
beforeCreate() {}, //生命周期 - 创建之前
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
beforeMount() {}, //生命周期 - 挂载之前
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
//  this.getBestDatas()
},
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="less">
 .swipe{
   margin-top: 8.8rem;
     box-sizing: border-box;
     padding:0 3% ;
     width: 100%;
     height: 10rem;
     position: relative;
     .box1{
       position: fixed;
       top: 0;
       left: 0;
       z-index: 9;
       width: 100%;
       height: 8.8rem;
     }
    .box{

        width: 100%;
        height: 13.8rem;
        position: absolute;
        background-color: red;
       border-radius:0rem 0rem 2rem 2rem;
      z-index: -1;

      top:-8.8rem;
      left: 0;
    }
     .mint-swipe{
   width: 100%;
    border-radius: 1rem;
     overflow: hidden;
     img{

         width: 100%;
         
     }
           
     }
 }
 .img-box{
   width: 100%;
   box-sizing: border-box;
   padding: 0  1rem;
   margin-top: 1rem;
   img{
     width: 100%;
   }
 }

</style>