<!--  -->
<template>
<div class="box">
    <Loading v-if="this.$store.state.loadflag"/>
    <div class="rout" v-else >
    
<div class='household'>
    <img :src="this.$store.state.ad" alt="">

    <ul>
        <li v-for="value in loadList" :key="value.cat_id">
<div class="title">
       <span>{{value.cat_name}}</span> 
        <i></i>
    </div>
    <div class="content">
        <ul>
            <li v-for="val in value.child" :key="val.cat_id">
                <router-link :to="'/categorylist/'+val.cat_id">
               <img :src=" val.touch_icon || val.cat_icon" alt="">
               <p>{{val.cat_name}}</p>
               </router-link>
            </li>
        </ul>
    </div>

        </li>
    </ul>
    
</div>

</div>
<div></div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

import BScroll from 'better-scroll'
// import Loading from "@/components/loading"
export default {
//import引入的组件需要注入到对象中才能使用
components: {
// NavLeft
// Loading,
},
data() {
//这里存放数据
return {
  rightScroll:null,
  flag:true,
  arr: [858, 6, 8, 3, 4, 5, 860],
  oHeight:0,
  scrollTop:0
};
},
//监听属性 类似于data概念
computed: {
    loadList(){
        // console.log( this.$store.state.loadList)
        return this.$store.state.categoryRightDates
    },
   
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
 scrollPAge(){
  this.rightScroll = new BScroll('.rout', {
  pullUpLoad: true,
  scrollbar: false,
  pullDownRefresh: true,
  click:true,
  // and so on
});
this.rightScroll.on("scroll",
(obj)=>{
    console.log(this.$store.state.loadflag);
    // console.log(this.$store.state.)
    if(obj.y>100){
        // console.log(this.$store.state.cat_id)
     let index = this.arr.indexOf(this.$store.state.cat_id)
    //  console.log(index)
     if(index>0){
         index--;
     }
     this.$store.dispatch("actChangeCategoryRight", this.arr[index]);
     console.log(this.$store.state.cat_id)
    //  this.$store.commit("catId",this.arr[index])
                //    this.rightScroll.refresh();
            this.rightScroll.refresh();
    //  console.log(index)
    }
        this.scrollTop =Math.abs(obj.y);

        if(document.querySelector(".household")){
            this.oHeight=document.querySelector('.household').scrollHeight-
            document.querySelector(".rout").offsetHeight;
            // console.log( this.oHeight)
        } 
        if(this.scrollTop>this.oHeight+100){
      
        
             let index = this.arr.indexOf(this.$store.state.cat_id)
             if(index<6){
         index++

     }
     this.$store.dispatch("actChangeCategoryRight", this.arr[index]);
            this.rightScroll.refresh();
   }
    // console.log(obj) 
    
                // this.rightScroll.refresh();
},false)

    },

},
beforeCreate() {}, //生命周期 - 创建之前
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
beforeMount() {}, //生命周期 - 挂载之前
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    //   this.scrollPage();

   this.$nextTick(() => {
      // console.log(123456);
      this.scrollPage();
    });
},
beforeUpdate() {}, //生命周期 - 更新之前
updated() {
    // setTimeout(()=>{
    this.scrollPAge()

    // },1000)
}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="less">
.box{
    position: relative;
    // overflow: hidden;
    height:100% ;
    width: 100%;
    // margin:4.3rem 0 4.9rem 0;
    display: flex;
    background-color: #fff;

    // overflow-y: hidden;
    // .navL{
    //     width: 25%;
    // }
    .rout{
    position: absolute;
    top: 0;
    left: 0;
    // z-index: 90;
        width: 100%;
        margin: 4.3rem 0 4.9rem 0;
        height: calc(100% - 9.3rem);
        overflow-y: hidden;

.household{
    padding: 1rem;
            min-height: 10vh;

        background-color: #fff;

    &>img{
        height: 8.7rem;
width: 100%;
&>ul{
    &>li{
        width: 100%;
    }
}
    }
    .title{
        position: relative;
        text-align: center;
        padding: 1rem 0;
        font-size: 1.4rem;
        span{
        position: relative;
   background-color: #fff;
   padding: 0.2rem;
            z-index: 2;
        }
        i{
            background-color: #eee;
            width: 40%;
            height: .1rem;
            position: absolute;
            top: 50%;
            left: 50%;
        z-index: 0;

            transform: translate(-50%);
        }
    }
    .content{

        ul{
            display: flex;
            flex-wrap: wrap;
            li{
                text-align: center;
                
                box-sizing: border-box;
                padding: 1rem ;
                p{
                    color: #999;
                }
                img{
                    width: 100%;
                }
   width: 33%;
            }
        }
    }
}
    }
}

</style>