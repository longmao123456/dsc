<!--  -->
<template>
  <div class="cart">
      <div class="cart-top">
     <div class="address">   
   <i class="iconfont icon-dingwei"></i>
   <span>{{address.prov}}</span>
   <span>{{address.city}}</span>
   <span>{{address.county}}</span>

</div>  
<div class="edit">
    编辑商品
</div>
      </div>
      <div class="period" v-if="periodflag">
        <i class=" iconfont icon-gouwuche" ></i>
        <p>购物车空空如也，<span @click="linkfn">快去逛逛</span></p>
      </div>
    <div class="cart-content">
      <ul>
        <li v-for="(value, index) in datalist" :key="index">
          <div class="left">
            <i
              @click="cutfn(value.goods_id)"
              class="iconfont icon-danxuankuang"
              v-if="!value.isselect"
            ></i>
            <i
              @click="cutfn(value.goods_id)"
              class="iconfont icon-danxuankuangxuanzhong"
              style="color: #f44"
              v-else
            ></i>
          </div>
          
          
          <div class="content" >
            
            <img :src="value.goods_img" alt=""  @click="linkdeta(value.goods_id)"/>
            <div class="right">
              <div class="goods_name" @click="linkdeta(value.goods_id)">
                {{ value.goods_name }}
              </div>
              <div class="goods_sp">
                <div class="goods_price">
                  {{ value.goods_price }}
                </div>
                <div class="input">
                  <i @click="changeNum(index,'-')">-</i>
                  <input type="text" v-model="value.value" />
                  <i @click="changeNum(index,'+')">+</i>
                </div>
                <div class="icn">
                  <i class="iconfont icon-shoucang1"></i>
                  <i class="iconfont icon-shanchu1" @click="delfn(index)"></i>
                </div>
              </div>
            </div>

            
          </div>
        </li>
      </ul>
    </div>
    <div class="cart-footer" v-if="!periodflag">
      <div class="left">
            <i
              @click="changeselectall"
              class="iconfont icon-danxuankuang"
              v-if="!selectall"
            ></i>
            <i
              @click="changeselectall"
            
              class="iconfont icon-danxuankuangxuanzhong"
              style="color: #f44"
              v-else
            ></i>
            <span>全选</span>
          </div>
          <div class="center">
            <p>合计：<span>{{total.toFixed(2)}}</span></p>
            <div>(不含运费，已节省￥0.00)</div>
          </div>
          <div class="right">去结算<span>({{(sum)}})</span></div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Footer from "../Footer";
import { MessageBox } from 'mint-ui';
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Footer,
  },
  data() {
    //这里存放数据
    return {
      selectall:false,
    };
  },
  //监听属性 类似于data概念
  computed: {
    datalist() {
      console.log(this.$store.state.cartList);
      return this.$store.state.cartList;
    },
    address(){
        return this.$store.state.address
    },
    total(){
      let total=0;
      this.datalist.map(item=>{
        if(item.isselect==true){
          total+=Number(item.goods_price)*Number(item.value)
        }
      })
      return total
    },
    sum(){
      let sum=0
      this.datalist.map(item=>{
        if(item.isselect==true){
          sum+=Number(item.value)
        }
      })
      return sum
    },
    periodflag(){
      if(this.datalist.length==0){
        return true
      }else{
        return false
      }
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    linkdeta(id){
    this.$router.push("/goodsdetail/"+id)
    },
    cutfn(id) {
      console.log(id);
      for (var i = 0; i < this.datalist.length; i++) {
  
        if (this.datalist[i].goods_id == id) {
      
        this.$store.commit("changeselect",i)
          console.log(this.$store.state.cartList[i].isselect);
          //   console.log(1)
        }
      }
       this.changebtn()
    },
    changebtn(){
      console.log(this.datalist)
     let flag= this.datalist.every(item=>{
        return item.isselect==true
      })
    if(flag){
      this.selectall=true
    }else{
      this.selectall=false

    }
    },
    changeNum(index,a){
      let data={
        index,a
      }
      this.$store.commit("changeNum",data)
    },
    changeselectall(){
      this.selectall=!this.selectall
      this.$store.commit("changeselectall",this.selectall)
      

    },
    delfn(index){
      MessageBox.confirm('确定执行此操作?').then(() => {
      this.$store.commit("delcartList",index)
      //点击确定之后执行的操作
  console.log("点击确定之后执行的操作")

 
},()=>{
  console.log("点击取消之后执行的操作")
   //点击取消之后执行的操作
});
    },
    linkfn(){
      this.$router.push("/")
    }
  },
  beforeCreate() {}, //生命周期 - 创建之前
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  beforeMount() {}, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // console.log(this.datalist);
       this.changebtn()

  },
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less">
.cart {
  .period{
    text-align: center;
    i{
      display: block;
      font-size: 15rem;
      color: #999;
    }
    p{
      font-size: 1.5rem;
      span{
        color: red;
        font-size: 1.4rem;
      }
    }
  }
  .cart-footer{
    position: fixed;
    bottom: 4.9rem;
    left: 0;
    width: 100%;
    height: 4.4rem;
    display: flex;
    align-items: center;
     flex-wrap: nowrap;
     background-color: #fff;
    .left{
      // flex: 1;
      width: 20%;
      text-align: center;
     
      i{
        font-size: 2rem;
      }
      span{
        margin-left: 1rem;
        font-size: 1.4rem;

      }

    }
    .right{
      // flex: 1;
      width: 30%;
      background-color: red;
      text-align: center;
      line-height: 4.4rem;
      color: #fff;
      font-size: 1.4rem;
      span{
        font-size: 1.2rem;
      }

    }
    .center{
      // flex: 1;
      text-align: right;
      width: 50%;
      padding-right: 1rem;

      box-sizing: border-box;
      p{
        color: #333;
        font-size: 1.4rem;
        span{
          font-weight: 700;
          color: red;
          &::before{
            content: "￥";
            font-size: 1.2rem;
          }
        }
      }
      div{
        color: #999;
      }

    }
  }
    .cart-top{
        font-size: 1.4rem;
        display: flex;
        height: 4.4rem;
        // line-height: 4.4rem;
        padding: 1rem;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
   .address{
           color: #888;

       
       span{
           
           margin-left: 0.5rem;

       }
   }
   .edit{
       color: red;
   }
    }
  .cart-content {
    margin-top: 1rem;
    ul {
      li {
        margin-bottom: 2rem;
        height: 10rem;
        width: 100%;
        align-items: center;
        // height: 100%;
        display: flex;
        .left {
          width: 15%;
          text-align: center;
          i {
            font-size: 2rem;
          }
        }
        .content {
          padding: 1rem;
          box-sizing: border-box;
          background-color: #fff;

          align-items: center;
          // height: 100%;
          display: flex;
          height: 100%;
          img {
            height: 100%;
          }
          .right {
            padding: 1rem;
            .goods_name {
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2; //显示几行
              -webkit-box-orient: vertical;
            }
            .goods_sp {
              margin-top: 1rem;
              display: flex;
              align-items: center;
              justify-content: space-around;
              .goods_price {
                color: red;
                font-size: 1.6rem;
                &::before {
                  content: "￥";
                  font-size: 1.2rem;
                }
              }
              .input {
                display: flex;
                input {
                  height: 2rem;
                  width: 5rem;
                  text-align: center;
                  border: 1px solid #efefef;
                  box-sizing: border-box;
                }
                i {
                  text-align: center;
                  height: 2rem;
                  background-color: #efefef;
                  font-style: normal;
                  width: 2rem;
                }
              }
              .icn {
                i {
                  margin: 0.5rem;
                }
              }
            }
          }
        }
      }
    }
  }
  
}
</style>