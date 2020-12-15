<!--  -->
<template>
  <div class="categoryList">
      <transition>
          <div class="screen" v-show="show">
              <div class="ziying">
                  <span>自营商品</span>
                  <p :class="{activep:flagp}" @click="flagp=!flagp"><i></i></p>
              </div>
              <div class="tag">
                <p :class="{activep1:flagp1}" @click="flagp1=!flagp1"><span>仅看有货</span> <i>√</i><u></u></p>
                <p :class="{activep1:flagp2}" @click="flagp2=!flagp2"><span>促销</span><i>√</i><u></u></p>
              </div>
              <div class="price">
                  <p>
                      <span>价格区间</span>
                  </p>
                  <form action="">
                  <input type="text" v-model="min" placeholder="最低价"><span>一</span><input v-model="max" type="text" placeholder="最高价">
              </form>
              </div>
              <div class="brand">
                  <span>品牌</span>  <i class="iconfont icon-jiantou2"></i>
              </div>
              <div class="bottom-btn">
                <div class="btn1" @click="closefn">关闭</div>
                <div class="btn2" @click="confn">确定</div>

              </div>
            
          </div>
      </transition>
    <CategoryTop :showhide="showhide" />
    <div class="nav">
      <div
        class="navlist"
        v-for="value in datalist"
        :key="value.id"
        :class="{ active: oIndex == value.id }"
        @click="tabfn(value.id)"
      >
        <span>{{ value.span }}</span>
        <i
          :class="[
            { [value.i1]: flag && oIndex == value.id },
            { [value.i]: flag == false || oIndex != value.id },
          ]"
        ></i>
      </div>
      <div class="navlist">
        <i></i>
        <span @click="show=true">筛选</span>
      </div>
    </div>
    <div
      :class="{
        list: this.$store.state.listflag,
        list1: !this.$store.state.listflag,
      }"
    >
      <ul ref="ul"  v-infinite-scroll="loadMore"  >
        <li   
          v-for="(value, index) in this.$store.state.categoryList"
          :key="index"
        >
        <router-link   :to="'/goodsdetail/'+value.goods_id">
          <div class="oli">
            <img :src="value.goods_img" alt="" />
            <div class="content">
              <p>{{ value.goods_name }}</p>
              <h2>{{ value.cost_price }}</h2>
              <div>
                <a href="">进店</a>
                <p>2人已购买</p>
                <i class="iconfont icon-gouwuche"></i>
              </div>
            </div>
          </div>
</router-link>
        </li>
      </ul>
    </div>
    <div class="wu" v-if="searchflag">
        <div class="iconfont icon-icon4"></div>
        <p>亲，还没有相关数据</p>
    </div>
    <!-- searchflag -->
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import CategoryTop from "../components/categoryTop";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    CategoryTop,
  },
  data() {
    //这里存放数据
    return {
      showhide: true,
    //   cat_id: 1131,
      warehouse_id: 0,
      area_id: 0,
      goods_num: 0,
      size: 10,
      page: 1,
      sort: "goods_id",
      order: "desc",
      self: 0,
      datalist: [
        {
          id: 0,
          span: "综合",
          i: "iconfont icon-jiantou-copy-copy",
          i1: "iconfont icon-jiantou",
        },
        {
          id: 1,
          span: "新品",
          i: "",
          i1: "",
        },
        {
          id: 2,
          span: "销量",
          i: "",
          i1: "",
        },
        {
          id: 3,
          span: "价格",
          i: "iconfont icon-jiantou-copy-copy",
          i1: "iconfont icon-jiantou",
        },
      ],
      oIndex: 0,
      flag: false,
      show:false,
      flagp:false,
      flagp1:false,
      flagp2:false,
      min:'',
      max:''

    };
  },
  //监听属性 类似于data概念
  computed: {
      searchflag(){
          if(this.$store.state.categoryList.length==0){
              return true
          }else{
              return false
          }
      }
  },
  //监控data中的数据变化
  watch: {
     cat_id:function(){
    this.page=1
   }
  },
  //方法集合
  methods: {
    tabfn(index) {
      this.oIndex = index;
      switch (index) {
        case 0:
          this.flag = !this.flag;

          if (this.flag) {
            this.order = "asc";
          } else {
            this.order = "desc";
          }
          this.sort = "goods_id";
          break;
        case 1:
          this.sort = " last_update";
          this.order = "asc";

          break;
        case 2:
          this.sort = "sales_volume";
          this.order = "asc";
          break;
        case 3:
          this.flag = !this.flag;
          if (this.flag) {
            this.order = "asc";
          } else {
            this.order = "desc";
          }
          this.sort = "shop_price";
          break;
      }
      this.page=1
      this.loadData();
    },
    loadData() {
      
        console.log(this.$store.state.msg)
      let data = {
        url: "/catalog/goodslist",
        params: {
        //   cat_id: this.$route.params.cid,
          warehouse_id: this.warehouse_id,
          area_id: this.area_id,
          goods_num: this.goods_num,
          size: this.size,
          page: this.page,
          sort: this.sort,
          order: this.order,
          self: this.self,
          min:this.min,
          max:this.max,
          keywords:this.$store.state.msg
        },
        type: "post",
      };
      this.$store.dispatch("actChangeCategoryList", data);
    //   console.log(this.$route.params.cid);
    },
    closefn(){
      this.show=false
    },
    confn(){
      this.page=1
      this.show=false
      this.loadData();


    },
    loadMore(){
        console.log(this.$store.state.msg)

        this.page++;
     let data = {
        url: "/catalog/goodslist",
        params: {
        //   cat_id: this.$route.params.cid,
          warehouse_id: this.warehouse_id,
          area_id: this.area_id,
          goods_num: this.goods_num,
           min:this.min,
          max:this.max,
          size: this.size,
          page: this.page,
          sort: this.sort,
          order: this.order,
          self: this.self,
         
          keywords:this.$store.state.msg
        },
        type: "post",
      };
      this.$store.dispatch("actChangeCategoryListadd", data);
    }
  },
  
  beforeCreate() {}, //生命周期 - 创建之前
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  beforeMount() {}, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.loadData();
    // console.log(this.$refs.ul.offsetHeight)
  },
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less">
.v-enter,.v-leave-to{
 transform: translateX(100%);
}
.v-enter-active,.v-leave-active{
   transition: all .5s;
}
.categoryList {
  margin-top: 4.3rem;
  .wu{
      position: absolute;
      left:0;
      top: 9rem;
      width: 100%;
      text-align: center;
     p{
         font-size: 1.4rem;
         color: #999;
     }
     div{
       font-size: 15rem;
       color: #999;

     }
  }
  .screen{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #efefef;
      z-index: 9999;
      .ziying{
          margin-bottom:1.5rem ;

          background-color: #fff;
          padding: 1rem;
          height: 2.5rem;
          span{
              font-size: 1.6rem;
              color: #666;
              font-weight: 600;
          }
          p{
              transition: all 1;
              float: right;
              background-color: #efefef;
              height: 2.5rem;
              width: 5rem;
              border-radius: 1.25rem;
              padding: 0.08rem;
              i{
              transition: all 1;

                  float: left;
                  height: 2.5rem;
                  width:2.5rem ;
                  border-radius: 50%;
                  background-color: #fff;
              }
          }
          .activep{
              transition: all 1;

              background-color: red;
    
              i{
                  transform: translateX(100%);
                  
              }
          }

      }
      .tag{
          margin-bottom:1.5rem ;
           background-color: #fff;
          padding: 1rem;
          height:4rem;
          p{ 
                border: 1px solid #fff;

                background-color: #efefef;
                width: 12rem;
                height: 2rem;
                padding: 0.5rem 0;
                font-size: 1.4rem;
                font-weight: 500;
                display: inline-block;
                position: relative;
                text-align: center;
                margin-left: 1rem;
                color: #666;
                // border: 1px solid red;
                border-radius: 0.3rem;
                span{
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                z-index: 2;
                  line-height: 3rem;
                }
                u{
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    // background-color:red;
                    // height: 1.3rem;
                    // width: 2.5rem;
                    // line-height: 1.5em;
                    // font-size: 1rem;
                    // text-align: right;
                    // padding-right: 0.5rem;
                   

                }
                i{
                  position: absolute;
                  bottom: 0;
                  right: 0;
                  height: 1rem;
                  width: 1rem;
                  line-height: 0.8rem;
                  font-size: 1rem;
                  color:white;
                  z-index: 2;
                  text-align: left;
                  transform: scaleX(1.2);
                  display: none;
                }
          }
          .activep1{
             
                border: 1px solid red;
                 background-color: #fff;
                 span{
                     color: red;
                 }
                 u{
                 border-top:1rem solid #fff ;
                    border-left:1rem solid #fff ;

                    border-bottom: 1rem solid red ;

                    border-right: 1rem solid red;
                 }
                 i{
                  color:white;
                  display: inline;
                 }
              
          }
      }
      .price{
          margin-bottom: 1.5rem;
          background-color: #fff;
          p{
              font-size: 1.6rem;
              color: #333;
              padding: 1rem;
              border-bottom: 1px solid #efefef;
          }
          form{
              background-color: #fff;
              padding: 1rem;
              span{
                  font-size: 1.5rem;
              }
              input{
              text-align: center;
              width: 15rem;
              margin: 0 1rem;
                  padding: 1.5rem 0;
                  border-radius: .5rem;
                  font-size: 1.4rem;
                  background-color: #efefef;
              }
          }
      }
      .brand{
          padding: 1rem;
          background-color: #fff;
          height: 2.3rem;
          line-height: 2.3rem;
          span{

        font-size: 1.6rem;
          }
          i{
              float: right;
              font-size: 2rem;
          }

      }
      .bottom-btn{
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          display: flex;
          align-items: center;
          div{
              width: 50%;
              text-align: center;
              padding: 1.5rem 0;
              font-size: 1.6rem;
          }
          .btn1{
             background-color: #fff;
             color: #333;
          }
          .btn2{
              color:#fff ;
              background-color:red;
          }
      }
  }
  .nav {
    height: 4rem;
    line-height: 4rem;
    font-size: 1.4rem;
    background-color: #fff;
    display: flex;
    .navlist {
      width: 20%;
      text-align: center;
      i {
        font-size: 1rem;
      }
    }
    .active {
      color: red;
    }
  }
  .list {
    ul {
         height:1000px;
       
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      li {
        margin: 0.5rem;
        box-sizing: border-box;
        width: calc(50% - 1rem);
        .oli {
          background-color: #fff;
          border-radius: 1rem;
          overflow: hidden;

          img {
            width: 100%;
          }
          .content {
            padding: 1rem 1.5rem;
            & > p {
              color: #333;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2; //显示几行
              -webkit-box-orient: vertical;
            }
            h2 {
              margin: 1rem 0;
              color: red;
            //   &::after {
            //     content: "00";
            //     font-size: 1.2rem;
            //   }
              &::before {
                content: "￥";
                font-size: 1.2rem;
              }
            }
            div {
              a {
                color: red;
                background-color: #fef0f0;
                padding: 0.2rem 0.3rem;
              }
              P {
                display: inline;
                color: #999;
                font-size: 1.2rem;
              }
              i {
                color: red;
                float: right;
              }
            }
          }
        }
      }
    }
  }
  .list1 {
    ul {
      display: flex;
      align-content: flex-start;
      height: 1000px;
      flex-wrap: wrap;
      // align-items:flex-start;
      li {
        margin: 0.5rem;
        box-sizing: border-box;
        width: 100%;
        .oli {
          display: flex;

          background-color: #fff;
          border-radius: 1rem;
          overflow: hidden;

          img {
            width: 30%;
          }
          .content {
            padding: 1rem 1.5rem;
            & > p {
                 color: #333;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2; //显示几行
              -webkit-box-orient: vertical;
            }
            h2 {
              margin: 1rem 0;
              color: red;
              &::after {
                content: "00";
                font-size: 1.2rem;
              }
              &::before {
                content: "￥";
                font-size: 1.2rem;
              }
            }
            div {
              a {
                color: red;
                background-color: #fef0f0;
                padding: 0.2rem 0.3rem;
              }
              P {
                display: inline;
                color: #999;
                font-size: 1.2rem;
              }
              i {
                color: red;
                float: right;
              }
            }
          }
        }
      }
    }
  }
}
</style>