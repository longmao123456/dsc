<!--  -->
<template>
<div class='swipe-index'>
    <mt-swipe :auto="0" >
  <mt-swipe-item  v-for="(value,index) in list" :key="index">
      <ul>
          <li v-for="val in value" :key="val.id"><img :src="val.imgsrc" alt="">
          <p>{{val.title}}</p></li>
        
      </ul>
  </mt-swipe-item>

</mt-swipe>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
  list:[
      [
         {
             id:1,
             imgsrc:"https://x.dscmall.cn/storage/data/gallery_album/original_img/9JVcPMp5TemauXCVQxnIY50u80vcxnFGfnn33CKh.png",
             title:"潮流服饰"
         },
          {
             id:2,
             imgsrc:"https://x.dscmall.cn/storage/data/gallery_album/original_img/9JVcPMp5TemauXCVQxnIY50u80vcxnFGfnn33CKh.png",
             title:"潮流服饰"
         }
         , {
             id:3,
             imgsrc:"https://x.dscmall.cn/storage/data/gallery_album/original_img/9JVcPMp5TemauXCVQxnIY50u80vcxnFGfnn33CKh.png",
             title:"潮流服饰"
         },
          {
             id:4,
             imgsrc:"https://x.dscmall.cn/storage/data/gallery_album/original_img/9JVcPMp5TemauXCVQxnIY50u80vcxnFGfnn33CKh.png",
             title:"潮流服饰"
         },
          {
             id:5,
             imgsrc:"https://x.dscmall.cn/storage/data/gallery_album/original_img/9JVcPMp5TemauXCVQxnIY50u80vcxnFGfnn33CKh.png",
             title:"潮流服饰"
         },
          {
             id:6,
             imgsrc:"https://x.dscmall.cn/storage/data/gallery_album/original_img/9JVcPMp5TemauXCVQxnIY50u80vcxnFGfnn33CKh.png",
             title:"潮流服饰"
         },
          {
             id:7,
             imgsrc:"https://x.dscmall.cn/storage/data/gallery_album/original_img/9JVcPMp5TemauXCVQxnIY50u80vcxnFGfnn33CKh.png",
             title:"潮流服饰"
         },
          {
             id:8,
             imgsrc:"https://x.dscmall.cn/storage/data/gallery_album/original_img/9JVcPMp5TemauXCVQxnIY50u80vcxnFGfnn33CKh.png",
             title:"潮流服饰"
         },
          {
             id:9,
             imgsrc:"https://x.dscmall.cn/storage/data/gallery_album/original_img/9JVcPMp5TemauXCVQxnIY50u80vcxnFGfnn33CKh.png",
             title:"潮流服饰"
         },
          {
             id:10,
             imgsrc:"https://x.dscmall.cn/storage/data/gallery_album/original_img/9JVcPMp5TemauXCVQxnIY50u80vcxnFGfnn33CKh.png",
             title:"潮流服饰"
         }

      ],
      [
         {
             id:1,
             imgsrc:"https://x.dscmall.cn/storage/data/gallery_album/original_img/9JVcPMp5TemauXCVQxnIY50u80vcxnFGfnn33CKh.png",
             title:"潮流服饰"
         },
          {
             id:2,
             imgsrc:"https://x.dscmall.cn/storage/data/gallery_album/original_img/9JVcPMp5TemauXCVQxnIY50u80vcxnFGfnn33CKh.png",
             title:"潮流服饰"
         }
         , {
             id:3,
             imgsrc:"https://x.dscmall.cn/storage/data/gallery_album/original_img/9JVcPMp5TemauXCVQxnIY50u80vcxnFGfnn33CKh.png",
             title:"潮流服饰"
         },
          {
             id:4,
             imgsrc:"https://x.dscmall.cn/storage/data/gallery_album/original_img/9JVcPMp5TemauXCVQxnIY50u80vcxnFGfnn33CKh.png",
             title:"潮流服饰"
         },
          {
             id:5,
             imgsrc:"https://x.dscmall.cn/storage/data/gallery_album/original_img/9JVcPMp5TemauXCVQxnIY50u80vcxnFGfnn33CKh.png",
             title:"潮流服饰"
         },
          {
             id:6,
             imgsrc:"https://x.dscmall.cn/storage/data/gallery_album/original_img/9JVcPMp5TemauXCVQxnIY50u80vcxnFGfnn33CKh.png",
             title:"潮流服饰"
         },
          {
             id:7,
             imgsrc:"https://x.dscmall.cn/storage/data/gallery_album/original_img/9JVcPMp5TemauXCVQxnIY50u80vcxnFGfnn33CKh.png",
             title:"潮流服饰"
         },
          {
             id:8,
             imgsrc:"https://x.dscmall.cn/storage/data/gallery_album/original_img/9JVcPMp5TemauXCVQxnIY50u80vcxnFGfnn33CKh.png",
             title:"潮流服饰"
         },
          {
             id:9,
             imgsrc:"https://x.dscmall.cn/storage/data/gallery_album/original_img/9JVcPMp5TemauXCVQxnIY50u80vcxnFGfnn33CKh.png",
             title:"潮流服饰"
         },
          {
             id:10,
             imgsrc:"https://x.dscmall.cn/storage/data/gallery_album/original_img/9JVcPMp5TemauXCVQxnIY50u80vcxnFGfnn33CKh.png",
             title:"潮流服饰"
         }

      ],
      [
         {
             id:1,
             imgsrc:"https://x.dscmall.cn/storage/data/gallery_album/original_img/9JVcPMp5TemauXCVQxnIY50u80vcxnFGfnn33CKh.png",
             title:"潮流服饰"
         },
          {
             id:2,
             imgsrc:"https://x.dscmall.cn/storage/data/gallery_album/original_img/9JVcPMp5TemauXCVQxnIY50u80vcxnFGfnn33CKh.png",
             title:"潮流服饰"
         }
         , {
             id:3,
             imgsrc:"https://x.dscmall.cn/storage/data/gallery_album/original_img/9JVcPMp5TemauXCVQxnIY50u80vcxnFGfnn33CKh.png",
             title:"潮流服饰"
         },
          {
             id:4,
             imgsrc:"https://x.dscmall.cn/storage/data/gallery_album/original_img/9JVcPMp5TemauXCVQxnIY50u80vcxnFGfnn33CKh.png",
             title:"潮流服饰"
         },
          {
             id:5,
             imgsrc:"https://x.dscmall.cn/storage/data/gallery_album/original_img/9JVcPMp5TemauXCVQxnIY50u80vcxnFGfnn33CKh.png",
             title:"潮流服饰"
         },
          {
             id:6,
             imgsrc:"https://x.dscmall.cn/storage/data/gallery_album/original_img/9JVcPMp5TemauXCVQxnIY50u80vcxnFGfnn33CKh.png",
             title:"潮流服饰"
         },
          {
             id:7,
             imgsrc:"https://x.dscmall.cn/storage/data/gallery_album/original_img/9JVcPMp5TemauXCVQxnIY50u80vcxnFGfnn33CKh.png",
             title:"潮流服饰"
         },
          {
             id:8,
             imgsrc:"https://x.dscmall.cn/storage/data/gallery_album/original_img/9JVcPMp5TemauXCVQxnIY50u80vcxnFGfnn33CKh.png",
             title:"潮流服饰"
         },
          {
             id:9,
             imgsrc:"https://x.dscmall.cn/storage/data/gallery_album/original_img/9JVcPMp5TemauXCVQxnIY50u80vcxnFGfnn33CKh.png",
             title:"潮流服饰"
         },
          {
             id:10,
             imgsrc:"https://x.dscmall.cn/storage/data/gallery_album/original_img/9JVcPMp5TemauXCVQxnIY50u80vcxnFGfnn33CKh.png",
             title:"潮流服饰"
         }

      ]
      ]
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

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
 .swipe-index{
     background-color: #fff;
     margin: 2rem 1rem 0rem;
     width:calc( 100% - 2rem);
             height:20rem;

        border-radius: 1rem 1rem 0 0;
        padding-bottom:1rem ;
.mint-swipe-items-wrap{

padding-bottom: 5rem;
    .mint-swipe-item{
        width: 100%;
    
        ul{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        li{
        width: 20%;
        text-align: center;
        img{
            width: 100%;
        }
        }
        }
    }
 }
    .mint-swipe-indicators{
        background-color:pink;
        height: 1rem;
        line-height: 0;
        border-radius: 0.5rem;
        overflow: hidden;
        bottom: 0;
        .mint-swipe-indicator{
            margin: 0;
        background-color:pink;
        border-radius: 0.5rem;
       
            height: 1rem;
           
            width:2rem;
            opacity: 1;
            margin: 0;

        }
        .is-active{
            margin: 0;

         

            background-color: red;
        }
    }
 }
</style>