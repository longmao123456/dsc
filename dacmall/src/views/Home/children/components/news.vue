<!--  -->
<template>
<div class='news'>
    <div class="newscontent">
   <img src="https://x.dscmall.cn/storage/data/gallery_album/177/original_img/177_P_1597978466633.png" alt="">
   <div class="newslist">
   <ul id='oul' :class="{trans:flag}">
       <li v-for="value in newslist" :key="value.id"> {{value.content}}</li>
   </ul></div>
   <div class="right">
       <i class="iconfont icon-jiantou2"></i>
   </div>
</div>
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
   newslist:[{
       id:1,
       content:'新闻1'
   },{
       id:2,
       content:'新闻2'
   },{
       id:3,
       content:'新闻3'
   }],
   dsq:null,
   flag:true
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
   newsfn(){
        // console.log(oul)
      var oul=document.querySelector("#oul")

    //    console.log(this.$route.path) 
    //    console.log(this.$refs.ul)
    if(oul){
oul.style.top="-5rem"
        this.flag=true
       this.dsq= setTimeout(() => {
           if(this.$route.path!="/home/index"){
            clearInterval(this.dsq)
          }
      var oul=document.querySelector("#oul")

        oul.style.top="0rem"
        this.newslist.push(this.newslist.shift())
        this.flag=false
            
        }, 1000);
   
   }
       

   }
},
beforeCreate() {}, //生命周期 - 创建之前
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
beforeMount() {}, //生命周期 - 挂载之前
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
this.dsq=setInterval(() => {
this.newsfn()
    
}, 2000);
},
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {
            clearInterval(this.dsq)
            // clearTimeout(this.dsq)


}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="less">
 .news{
     overflow: hidden;
     border-top: 1px solid #efefef;
     margin: 0 1rem ;
     height: 5rem;
     width:calc( 100% - 2rem);
     background: #fff;
     border-radius: 0 0 1rem 1rem;
     padding: 0.2rem 0.5rem;
     box-sizing: border-box;
     .newscontent{
     display:flex;
     height: 100%;
    &>img{
        width: 30%;
    }
    .newslist{
     position: relative;

         margin-left: 10%;
       
         width: 50%;
         height: 100%;
     ul{
        position: absolute;
         height: 100%;
        
         li{
             height: 100%;
             line-height: 5rem;
         }
     }
     .trans{
         transition:  all 1s;
     
     }
     }
      .right{
          float: right;
          line-height: 5rem;
          i{
             color:red;
             font-size: 0.6rem;
               padding: 0.1rem;
              border-radius: 100%;
              border: 1px solid red ;
          }
      }    
     }
 }
</style>