<!--  -->
<template>
<div class='categorytop'>
    <i class="iconfont icon-jiantou3" @click="retfn"></i>
    <form action="">
        <div class="inp">
        <input type="text" @focus="focfn" @blur="blfn"  @input="inputfn" :placeholder="this.$store.state.plastr" :value="this.$store.state.msg">
            <i class="iconfont icon-sousuo2"></i>
            <i class="iconfont icon-chahao" v-show="this.$store.state.flagi" @click="chafn "></i>
            </div>
        <button type="button" v-show="flag||this.$route.path=='/category/search'" @click="addfn">搜索</button>
    </form>
           <a href="JavaScript:;" :class="this.$store.state.listflag ? 'iconfont icon-leimupinleifenleileibie':'iconfont icon-leimupinleifenleileibie2'" v-if="showhide" @click="tablist"></a>

</div>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
props:{
   showhide:Boolean,
},
data() {
//这里存放数据
return {
  flag:false,
  // plastr:'',
  // tabflag:true,
  // flagi:false
};
},
//监听属性 类似于data概念
computed: {
  
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
   inputfn(e){
    //  console.log(this.$store.state.msg)
    //  this.$store.commit('inputChange',this.msg)
    // this.$store.state.msg=this.msg
   this.$store.state.msg=e.target.value
    console.log( this.$store.state.msg)
     if(this.$store.state.msg.length>0){
   this.$store.state.flagi=true
     }else{
   this.$store.state.flagi=false
    
     }
   },
   focfn(){
this.flag=true;
  //  this.$store.state.flagi=false
this.$store.state.plastr='';
// this.dataposition=''
 this.$store.state.nextUrl=this.$route.path
   
       this.$router.push('/search')

   },
   blfn(){
this.$store.state.plastr=this.$store.state.dataList[this.$store.state.dataList.length-1]  ||'搜索商品';
   
   },
   retfn(){
 this.flag=false;
 this.$store.state.flagi=false
 this.$store.state.msg=""
// this.$store.state.nextUrl='/';
window.location.href="javascript:history.go(-1)";
// this.$router.push(this.$store.state.nextUrl)

   },
   addfn(){
this.$store.state.plastr=this.$store.state.dataList[this.$store.state.dataList.length-1]  ||'搜索商品';

     if(this.$store.state.msg!=''){
 this.$store.commit('addDataList')
   this.$store.state.flagi=false
   this.$store.state.plastr=this.$store.state.dataList[this.$store.state.dataList.length-1]
    this.$router.push("searchlist")
      // this.$store.state.msg=''

     }
  
   },
   chafn(){
      this.$store.state.msg='';
      this.$store.state.flagi=false
   },
   tablist(){
    //  this.tabflag=!this.tabflag
        this.$store.commit("changelistflag")
        // console.log(this.$store.state.listflag)
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
.categorytop{
    a{
  height: 3.3rem;
  color: #666 !important;
   font-size: 2rem;
   text-align: center;
   line-height: 3.3rem;
   margin-left: 1rem;
     }
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
    display: flex;
    box-sizing: border-box;
    padding: 0.5rem 1rem .5rem 2rem;
    background-color: #fff;
   border-bottom: 1px solid #efefef;

    &>i{
        color: #666;
    width: 10%;
    line-height: 3rem;
    font-size: 2rem;
    }
    form{
        display: flex;
        width: 90%;
        .inp{
        position: relative;
           width: 100%;

       input{
           border-radius: 1.5rem;
           border: 1px solid #efefef;
           height: 3rem;
           width: 100%;

        text-indent: 1.5rem;
           
       }
  i{
 text-align: center;
           line-height: 3rem;
           height: 3rem;
           width: 3rem;
  }
       .icon-sousuo2{
          
      position: absolute;
       right: 0;
       top: 0;

       }
       .icon-chahao{
           font-size: 1.3rem;
           position: absolute;
       right:3rem;
       top: 0;
       font-weight: 900;
       color:blue ;
       }
       }
       button{
         white-space: nowrap;
         margin-left:1rem ;
         background-color: #fff;
       }
    }
}
</style>