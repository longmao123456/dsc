<!--  -->
<template>
<div class='home'>
    <div class="home-header">
   <div class="top">
     <div class="box" v-if="!active.includes('/home/index')"></div>
    <form >
   <input type="text" name="" id="" placeholder="请输入关键字" @focus="focfn">
   <i class="iconfont icon-sousuo2"></i>
    </form>
        <a href class="iconfont icon-xiaoxi"></a>
   </div>
   <div class="nav">
            <ly-tab v-model="selectedId" :items="items" :options="options" @change="changeTab"></ly-tab>
            <div class="category-btn">
        <i class="iconfont icon-fenlei"></i>
        <span>分类</span>
      </div>
   </div>
   </div>
   <Footer></Footer>
    <router-view ></router-view>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Footer from "../Footer"

export default {
//import引入的组件需要注入到对象中才能使用
components: {
    Footer
},
data() {
//这里存放数据
return {
   selectedId:0,
   items: [
        {
          label: "首页",
        },
        {
          label: "家用电器",
        },
        {
          label: "男装女装",
        },
        {
          label: "鞋靴箱包",
        },
        {
          label: "手机数码",
        },
        {
          label: "电脑办公",
        },
        {
          label: "家居家纺",
        },
        {
          label: "个人化妆",
        },
      ],
       options: {
        activeColor: "#fff",
        // 可在这里指定labelKey为你数据里文字对应的字段名
      },
       routerDatas: [
        "/home/index",
        "/home/household",
        "/home/clothing",
        "/home/shoebag",
        "/home/mobilephones",
        "/home/computer",
        "/home/hometextiles",
        "/home/personalmakeup",
      ]
      ,
      active:'/home/index'
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
   changeTab(item,index){
       this.$router.push(this.routerDatas[index])

   },
   focfn(){
     this.$store.state.nextUrl=this.$route.path
this.$store.state.plastr=this.$store.state.dataList[this.$store.state.dataList.length-1]  ||'搜索商品';
    
       this.$router.push('/search')
       console.log(111)
   }
},
beforeCreate() {}, //生命周期 - 创建之前
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
beforeMount() {}, //生命周期 - 挂载之前
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
  // this.active=this.$route.path
  //  console.log(this.$route.path)
  // console.log(this.active.includes('/home/index')); 
},
beforeUpdate() {
  this.active=this.$route.path
   console.log(this.$route.path)
  console.log(this.active.includes('/home/index')); 
}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style  lang="less">
body{

  // padding-top: 8.8rem;
  background-color:#efefef;
  // padding-bottom: 10rem;
}
.home-header{
    // background-color: red;
position: fixed;
 width: 100%;
 left: 0;
 top: 0;
 z-index: 99;
.top{
    width: 100%;
    height: 4.4rem;
    display: flex;
    position: relative;
  .box{
   width: 100%;
   height: 8.8rem;
  position: absolute;
   top:0;
   left: 0;
   background-color: red;
   z-index: -1;
  }
    form{
        position: relative;
   
        width: 85% - 1rem;
        margin-left: 1rem;

    input{
   margin-top: 0.6rem;
        width: 100%;
        height: 3rem;
        border-radius: 1.5rem;
        text-indent: 1.5rem;
    }
     i{
            width: 4.4rem;
            height: 4.4rem;
            position: absolute;
            right: 0;
           top: 0;
           text-align: center;
           line-height: 4.4rem;
           font-size: 2rem;
        }  
    }
    a{
        width: 15%;
        text-align: center;
        height: 4.4rem;
        line-height: 4.4rem;
        font-size: 3rem;
        columns: #999;

    }
}
.nav{
    display: flex;
    height: 4.4rem;
    width: 100%;
    .ly-tab {
      width: 85%;
      .ly-tabbar {
        height: 4.4rem;
        background-color: transparent;
        border-bottom: 0px solid #eee;
        box-shadow: 0 0px 0px 0px rgba(0, 0, 0, 0);
        .ly-tab-list {
          a {
            color: #fff;
          }
        }
      }
    }
    .category-btn{
        width: 15%;
        height: 4.4rem;
        line-height:4.4rem;
        color: #fff;
        display: flex;
         justify-content: center;
         align-items: center;
      span{
         font-size: 1rem;
      }
      i{
         font-size: 2.5rem;
 box-shadow: -6px 0 4px -4px rgba(0, 0, 0, 0.4);
      }
    }
}

}
</style>