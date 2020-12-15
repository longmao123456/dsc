<!--  -->
<template>
<div class='loading'>
 <img  src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606195010769&di=989393a0d9e7d063bdefbd9180d101bd&imgtype=0&src=http%3A%2F%2Fimg.ui.cn%2Fdata%2Ffile%2F5%2F1%2F4%2F1809415.gif" alt="">
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
<style  lang="less" >
.loading{
     position: fixed;
     z-index: 999;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     background-color: rgba(0,0,0,0.2);
     img{
         position: absolute;
         left: 50%;
         top: 40%;
         width: 50%;
         transform: translate(-50%);

     }

}
</style>