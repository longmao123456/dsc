<!--  -->
<template>

<div class='search'>
    <CategoryTop/>
    <p><span> 最近搜索</span>    <i class="iconfont icon-shanchu" @click="delfn"></i></p>
    <ul>
        <li v-if="this.$store.state.dataList.length==0" @click="clfn;">暂无</li>

       <li  v-for="(value ,index) in this.$store.state.dataList" :key="index" @click="updateFn(value)" >{{value}}</li>
    </ul>
    <p>热门搜索</p>
   <ul>
     <li v-for="(value,index) in hotdatas" @click="updateFn(value)" :key="index">{{value}}</li>
    </ul>
    <Footer></Footer>
</div>
</template>

<script>
// console.log(this.$store.msg)
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Footer from "@/views/Footer"
import CategoryTop from "../components/categoryTop"
export default {
//import引入的组件需要注入到对象中才能使用
components: {
    CategoryTop,
    Footer,
},
data() {
//这里存放数据
return {
   dataList:[],
   hotdatas:[
       '周大福',
       '内衣',
       'Five Plus',
       '手机',
     
   ]
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
   delfn(){
   
       this.$store.commit("dataDel")
this.$store.state.plastr=this.$store.state.dataList[this.$store.state.dataList.length-1]  ||'搜索商品';

   },
   clfn(){
 console.log(Boolean(this.$store.state.dataList))
   },
   updateFn(value){
    this.$store.state.msg=value
    this.$store.state.flagi=true
    this.$router.push("searchlist")
    // console.log(this.$store.state.msg)
    // console.log(111)
   }
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
.search{
    width: 100%;
    background-color: #fff;
    padding: 1.5rem;
    box-sizing: border-box;
    &>p{
        margin: 4rem 0 0;
        font-size: 1.5rem;
        i{
            float: right;
            color: #333;
        }
    }
   &>ul{
       display: flex;
       margin-bottom: 2rem;
       flex-wrap: wrap;
     &>li{
       background-color: #efefef;
       padding:0.5rem 1rem;
       margin-right: 1rem;
       margin-top: 1rem;
       color: #666;
    }
    }
}
</style>