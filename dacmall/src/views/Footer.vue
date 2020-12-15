<!--  -->
<template>
<div class='footer-warp'>
    
    <ul>
        <router-link to="/home" tag="li">
            <div>
                <i class="iconfont icon-1" v-if="flag!='/home/index'"></i>
                <i class="iconfont icon-shouye2" v-else></i>

            </div>
            <span>首页</span>
        </router-link>
        <router-link to="/category" tag="li">
            <div>
                <i class="iconfont icon-leimupinleifenleileibie" v-if="flag!='/caategory'"></i>
                <i class="iconfont icon-leimupinleifenleileibie2" v-else></i>

            </div>
            <span>分类</span>
        </router-link>
        <router-link to="/find" tag="li">
            <div>
                <i class="iconfont icon-dongtaiweixuanzhong" v-if="flag!='/find'"></i>
                <i class="iconfont icon-dongtaixuanzhong" v-else></i>

            </div>
            <span>发现</span>
        </router-link>
        <router-link to="/cart" tag="li">
            <div>
                <i class="iconfont icon-gouwuche" v-if="flag!='/cart'"></i>
                <i class="iconfont icon-gouwucheman" v-else></i>

            </div>
            <span>购物车</span>
        </router-link>
       
        <router-link to="/mine" tag="li">
            <div>
                <i class="iconfont icon-profile" v-if="flag!='/mine'"></i>
                <i class="iconfont icon-wodedangxuan" v-else></i>

            </div>
            <span>我</span>
        </router-link>
    </ul>
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
   flag:"/home"
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
   
     this.flag=this.$route.path
},
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="less">
.footer-warp{
    background-color: #fff;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 4.9rem;
    border-top: 1px solid #efefef;
 z-index: 999;
    
  ul{
      display: flex;
    width: 100%;
    height: 4.9rem;
    justify-content: center;
    align-items: center;
      li{
       width: 20%;
       text-align: center;
      i{
          font-size: 2.5rem;
      }
      }
  }
}
.router-link-active{
    color: red;
}
</style>