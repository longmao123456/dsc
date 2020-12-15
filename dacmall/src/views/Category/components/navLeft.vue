<!--  -->
<template>
<div class='nav-left'>
   <ul>
       <li :class="{active:value.cat_id == $store.state.cat_id}" v-for="value in routerDatas" :key="value.cat_id" @click="tabfn(value.cat_id)">
           <p> {{value.cat_name}}</p> </li>
         
   </ul>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import ajax from "@/api/ajax.js"

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    //  cat_id:858,
      routerDatas:[],

};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
   tabfn(cat_id=858){
    //    this.$router.push(this.routerDatas[index])
    //  console.log(this.$route.fullPath)
      this.$store.commit("catId",cat_id);
     this.$store.dispatch("actChangeCategoryRight",cat_id)
      ajax('/api/catalog/list').then((res)=>{
        //  console.log(res)
         this.routerDatas=res.data
      })
   }
},
beforeCreate() {}, //生命周期 - 创建之前
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
beforeMount() {}, //生命周期 - 挂载之前
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
this.tabfn()
},
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="less">
.nav-left{
  margin-top: 4.3rem;
  background-color: #fff;

  // width: 25%;
    // position: fixed;
    // top: 4.3rem;
    // left: 0;
    height: calc(100% - 4.3rem);
    // height: 100%;
    ul{
        li{
            line-height: 2rem;
            text-align: center;
            color: #666;
            padding: 1rem 0;
         
        font-size: 1.4rem;
        p{
            width: 100%;
            box-sizing: border-box;

        }
        }
        .active{
          
           p{
 color: red;
           border-left: 0.3rem solid red;
           }
        }
    }
}
</style>