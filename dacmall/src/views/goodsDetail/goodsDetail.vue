<!--  -->
<template>
  <div class="goodsdetail">
    <div :class="['top-fix', { 'top-sp': flag }]">
      <div>
        <i class="iconfont icon-jiantou3" @click="retfn"></i>
      </div>
      <transition name="op">
        <ul v-show="flag">
          <li
            :class="{ active: index == navIndex }"
            v-for="(value, index) in navdata"
            :key="index"
            @click="navTabfn(index)"
          >
            {{ value }}
          </li>
        </ul>
      </transition>
      <div>
        <i
          class="iconfont icon-servicewuyoutuihuanhuo"
          @click="shareflag = true"
        ></i>
      </div>
    </div>
    <div class="swipe1 title0">
      <mt-swipe :auto="0">
        <mt-swipe-item
          v-for="value in dataList.gallery_list"
          :key="value.img_id"
        >
          <img :src="value.img_original" alt="" />
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="price p">
      <p>{{ dataList.cost_price }}</p>
      <span>{{ dataList.market_price }}</span>
    </div>
    <div class="goods-name p">
      <p>{{ dataList.goods_name }}</p>
      <div>
        <span>累计销量{{ dataList.sales_volume }}</span
        ><span>库存{{ dataList.goods_number }}</span
        ><span
          >{{ dataList.basic_info.city_name
          }}{{ dataList.basic_info.province_name }}</span
        >
      </div>
    </div>
    <mt-popup v-model="popupVisible" position="bottom" modal="true">
      <div class="dzxz">
        <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
      </div>
    </mt-popup>
    <div class="dz p" @click="popupVisible = 'true'">
      <div>
        <span>送至:</span>
        <p>{{ sheng }} {{ shi }} {{ xian }}</p>
      </div>

      <i class="iconfont icon-jiantou2"></i>
    </div>
    <div class="dis-commission p">
      <span>运费:</span>
      <p>{{ dataList.formated_goods_rate }}</p>
    </div>
    <div class="yixvan p" @click="xzshowfn">
      <div>
        <span>已选:</span>
        <p>{{ yxnum }}</p>
      </div>
      <i class="iconfont icon-jiantou2"></i>
    </div>
    <div class="tab title1">
      <p
        v-for="(value, index) in tabdata"
        :key="index"
        :class="{ active: index == oIndex }"
        @click="tabfn(index)"
      >
        <span>{{ value }}</span>
      </p>
    </div>
    <div
      class="desc-mobile"
      v-show="oIndex == 0"
      v-html="dataList.goods_desc"
    ></div>

    <table
      class="attr-parameter"
      border="1"
      cellspacing="0"
      v-show="oIndex == 1"
    >
      <tr>
        <td colspan="2">产品规格</td>
      </tr>
      <tr v-for="(value, index) in dataList.attr_parameter" :key="index">
        <td>{{ value.attr_name }}</td>
        <td>{{ value.attr_value }}</td>
      </tr>
    </table>
    <div class="title2">
      <h2>评论</h2>
    </div>
    <div class="nav-bottom">
      <ul>
        <li>
          <i class="iconfont icon-xiaoxi"></i>
          <p>客服</p>
        </li>
        <li>
          <i class="iconfont icon-shoucang1"></i>
          <p>客服</p>
        </li>
        <li>
          <em>{{ sum }}</em>
          <span v-if="cartflag">+{{ yxnum }}</span>
          <i class="iconfont icon-gouwuche"></i>
          <p>
            <router-link to="/cart">购物车</router-link>
          </p>
        </li>
      </ul>
      <div class="btn">
        <p @click="addcart">加入购物车</p>
        <p>立即购买</p>
      </div>
    </div>
    <mt-popup v-model="shopflag" position="bottom" modal="true">
      <div class="shopxz">
        <ul>
          <li>
            <div class="img"><img :src="dataList.goods_img" alt="" /></div>
            <div class="content">
              <h2>{{ dataList.goods_name }}</h2>
              <h3>{{ dataList.cost_price }}</h3>
              <h4>库存:{{ dataList.goods_number }}</h4>
            </div>
            <div class="i" @click="shopflag = false">
              <i class="iconfont icon-chahao"></i>
            </div>
          </li>
          <li>
            <p>数量</p>
            <div class="asdata">
              <button class="add" @click="btnfn('+')">+</button
              ><input type="number" min="1" :value="yxnum" /><button
                class="sub"
                @click="btnfn('-')"
              >
                -
              </button>
            </div>
          </li>
          <li>
            <div class="btnn">立即购买</div>
            <div class="btnn" @click="addcart">加入购物车</div>
          </li>
        </ul>
      </div>
    </mt-popup>
    <mt-popup v-model="shareflag" position="bottom" modal="true">
      <div class="share">
        <div class="share-item">
          <i class="iconfont icon-weixin"></i>
          <div
            class="text"
            @click="
              friendflag = true;
              shareflag = false;
            "
          >
            发送给好友
          </div>
        </div>
        <div class="share-item">
          <i class="iconfont icon-haibaofenxiang"></i>
          <div
            class="text"
            @click="
              shareflag = false;
              sharegflag = true;
            "
          >
            生成海报
          </div>
        </div>
      </div>
    </mt-popup>
    <Goodsmb @delflag="delflagfn" v-show="sharegflag"></Goodsmb>
    <Sharefriend
      v-show="friendflag"
      @sharefriendfn="friendflagfn"
    ></Sharefriend>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { Popup } from "mint-ui";
import { Picker } from "mint-ui";
import city from "@/assets/json/city";
import debounce from "lodash.debounce";
import Goodsmb from "./goodsmb";
import Sharefriend from "./sharefriend";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Goodsmb,
    Sharefriend,
  },
  data() {
    //这里存放数据
    return {
      flag: false,
      tabdata: ["商品详情", "规格参数"],
      oIndex: 0,
      navdata: ["商品", "详情", "评论"],
      navIndex: 0,
      popupVisible: false,
      shopflag: false,
      shareflag: false,
      friendflag: false,
      cartflag: false,
      slots: [
        {
          flex: 1,
          values: Object.keys(city),
          className: "slot1",
          textAlign: "right",
          defaultIndex: 1,
        },
        {
          divider: true,
          content: "-",
          className: "slot2",
        },
        {
          flex: 1,
          values: [],
          className: "slot3",
          textAlign: "center",
        },
        {
          divider: true,
          content: "-",
          className: "slot4",
        },
        {
          flex: 1,
          values: [],
          className: "slot5",
          textAlign: "left",
        },
      ],

      sheng: "",
      shi: "",
      xian: "",
      yxnum: 1,
      sharegflag: false,
    };
  },
  //监听属性 类似于data概念
  computed: {
    dataList() {
      return this.$store.state.goodsList;
    },
    cartList() {
      return this.$store.state.cartList;
    },
    sum() {
      let sum = 0;
      console.log(this.$store.state.cartList);
      // console.log(this.$state.goodsList)
      this.cartList.map((value) => {
        sum += value.value;
      });
      return sum;
    },
  },
  //监控data中的数据变化
  watch: {
    dataList: function () {
      //  console.log(this.dataList)
    },
  },
  //方法集合
  methods: {
    retfn() {
      window.history.back();
    },
    loadfn() {
      let data = {
        url: "/goods/show",
        params: {
          goods_id: this.$route.params.cid,
        },
        type: "post",
      };
      this.$store.dispatch("actchangegoodsList", data);
    },
    tabfn(index) {
      this.oIndex = index;
    },

    onValuesChange(picker, values) {
      //    console.log(picker)
      //    console.log(values)

      //   if (values[0] > values[1]) {
      //     picker.setSlotValue(1, values[0]);
      // picker.setValues(1)
      this.$nextTick(() => {
        picker.setSlotValues(1, Object.keys(city[values[0]]));
        picker.setSlotValues(2, city[values[0]][values[1]]);

        this.sheng = values[0];
        this.shi = values[1];

        this.xian = values[2];
        let address = {
          prov: values[0],
          city: values[1],
          county: values[2],
        };
        this.$store.commit("changeaddress", address);
      });

      // console.log(Object.keys(city[values[0]]))
      //  picker.setSlotValues(0, Object.keys(city[]))
      // console.log(values);
      //   }
    },
    navTabfn(index) {
      this.navIndex = index;
      var title = document.querySelector(".title" + index);
      // console.log(title);
      var top = title.offsetTop - document.documentElement.scrollTop;
      // console.log(top);
      window.scrollBy({ top, behavior: "smooth" });
    },
    scrollPage: debounce(function () {
      //使用防抖模块
      // let titles=[document.querySelector('.title0'),document.querySelector('.title1'),document.querySelector('.title2')]
      // console.log(titles);
      // console.log(window.pageYOffset)
      // if(window.scrollTop)

      if (window.pageYOffset < document.querySelector(".title1").offsetTop) {
        this.navIndex = 0;
      } else if (
        window.pageYOffset < document.querySelector(".title2").offsetTop
      ) {
        this.navIndex = 1;
      } else {
        this.navIndex = 2;
      }
    }, 500),
    scrollflag() {
      if (document.documentElement.scrollTop > 20) {
        this.flag = true;
      } else {
        this.flag = false;
      }
    },
    xzshowfn() {
      this.shopflag = true;
    },
    btnfn(as) {
      // console.log(as)

      if (as == "+") {
        this.yxnum = this.yxnum + 1;
      } else if (as == "-") {
        if (this.yxnum > 1) {
          this.yxnum = this.yxnum - 1;
        }
      }
    },
    delflagfn(data) {
      this.sharegflag = data;
    },
    friendflagfn(data) {
      this.friendflag = data;
      console.log(data);
    },
    addcart() {
      this.shopflag = false;
      this.cartflag = true;
      setTimeout(() => {
        this.cartflag = false;
      }, 400);
      console.log(this.dataList);
      if (localStorage.getItem("cartList")) {
        console.log();
        let locList = JSON.parse(localStorage.getItem("cartList"));
        // console.log(locList);
        let some = locList.some((value, index) => {
          // console.log(value);
          // console.log(index);

          if (value.goods_id == this.dataList.goods_id) {
            let data = {
              index,
              num: this.yxnum,
            };
            this.$store.commit("addcartList", data);
          }
          return value.goods_id == this.dataList.goods_id;
        });
        console.log(some);
        if (!some) {
          let cartdatalist = {
            goods_id: this.dataList.goods_id,
            goods_name: this.dataList.goods_name,
            value: this.yxnum,
            isselect: true,
            goods_price: this.dataList.shop_price,
            goods_img: this.dataList.goods_img,
          };
          this.$store.commit("changecartList", cartdatalist);
        }
      } else {
        let cartdatalist = {
          goods_id: this.dataList.goods_id,
          goods_name: this.dataList.goods_name,
          value: this.yxnum,
          isselect: true,
          goods_price: this.dataList.shop_price,
          goods_img: this.dataList.goods_img,
        };
        this.$store.commit("changecartList", cartdatalist);
      }

      // console.log(cartdatalist);
      // console.log(this.$store.state.cartList);
    },
  },
  beforeCreate() {}, //生命周期 - 创建之前
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  beforeMount() {}, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.$nextTick(() => {
      this.onValuesChange();
      //    console.log(1)
    });
    Popup; // console.log(this.$store.state.goodsList.gallery_list[0].img_original)
    Picker;
    city;
    // console.log(1111)
    window.onscroll = this.scrollflag;
    this.scrollflag();
    this.loadfn();
    window.addEventListener(
      "scroll",
      this.scrollPage, //滚动条滚动时确认是否改变nav的选中状态
      false
    );
  },
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {
    // window.removeEventListener
    window.removeEventListener(
      "scroll",
      this.scrollPage, //滚动条滚动时确认是否改变nav的选中状态
      false
    );
  }, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less">
@keyframes add {
  0% {
    top: 0;
    opacity: 0;
  }
  50% {
    top: -2rem;
    opacity: 1;
  }
  100% {
    top: -3rem;
    opacity: 1;
  }
}
.op-enter,
.op-leave-to {
  opacity: 1;
}
.op-leave-active,
.op-enter-active {
  transform: all 1s;
}
.goodsdetail {
  //  height: 2000rem;
  .share {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 6rem;
    background-color: #fff;
    z-index: 999;
    display: flex;
    text-align: center;
    .share-item {
      width: 50%;
      line-height: 1.5em;
      font-size: 1.4rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      i {
        color: #80d640;
        font-size: 2.6rem;
      }
    }
  }
  .mint-popup {
    background-color: rgba(0, 0, 0, 0);
  }
  .shopxz {
    width: 100%;
    height: 30vh;
    border-radius: 2rem 2rem 0 0;
    background-color: #fff;

    //   background-color: rgba(0,0,0,0);

    //   overflow: hidden;
    ul {
      display: flex;
      background-color: rgba(0, 0, 0, 0);
      flex-direction: column;
      justify-content: space-between;
      li {
        flex: 1;
        display: flex;
        justify-content: space-between;
        .btnn {
          margin-top: 1rem;
          font-size: 1.8rem;
          background: red;
          color: white;
          text-align: center;
          width: 50%;
          line-height: 4.5rem;

          &:first-child {
            background-color: #ff976a;
            //    padding: 1rem;
            height: 4.5rem;
          }
        }
        .img {
          margin-left: 5%;
          width: 30%;
          img {
            width: 100%;
            transform: translateY(-18%);
            border-radius: 1rem;
          }
        }
        .content {
          box-sizing: border-box;
          width: 60%;
          padding: 1rem;
          h2 {
            color: #333;
            font-weight: normal;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2; //显示几行
            -webkit-box-orient: vertical;
            overflow: hidden;
            line-height: 1.5em;
          }
          h3 {
            font-weight: normal;
            color: red;
            font-size: 1.6rem;
          }
          h4 {
            font-weight: normal;
            font-size: 0.8rem;
          }
        }
        .i {
          width: 5%;
          line-height: 4rem;
        }
        p {
          margin-left: 1rem;
        }

        .asdata {
          text-align: center;
          margin-right: 1rem;
          button {
            width: 3rem;
            height: 3rem;
            background: #fff;
            box-sizing: border-box;
            border: 1px solid #efefef;
          }
          input {
            text-align: center;

            width: 3rem;
          }
        }
      }
    }
  }
  .nav-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9;
    display: flex;
    width: 100%;
    height: 4.9rem;
    background-color: #fff;
    ul {
      width: 50%;
      display: flex;
      align-items: center;
      li {
        text-align: center;
        flex: 1;
        border-left: 1px solid #efefef;
        span {
          position: absolute;
          left: 30%;
          color: red;
          font-size: 1.6rem;
          animation: add 0.5s linear;
        }
        em {
          position: absolute;
          top: -0.5rem;
          right: 1rem;
          width: 2rem;
          height: 2rem;
          background-color: red;
          border-radius: 50%;
          text-align: center;
          line-height: 2rem;
          font-style: normal;
          color: #fff;
        }
        &:last-child {
          border-right: 1px solid #efefef;
          position: relative;
        }

        i {
          font-size: 2.5rem;
        }
        p {
          font-size: 1.2rem;
          a {
            color: #333;
          }
        }
      }
    }
    .btn {
      text-align: center;
      line-height: 4.9rem;
      font-size: 1.6rem;
      width: 50%;
      display: flex;
      color: #fff;
      p {
        background-color: red;
        width: 50%;
        &:last-child {
          background-color: #ff976a;
        }
      }
    }
  }
  .title2 {
    height: 200rem;
    background-color: pink;
  }
  .mint-popup {
    width: 100%;
  }
  .dzxz {
    width: 100%;
    height: 25rem;
    background-color: white;
  }
  .dis-commission {
    display: flex;

    span {
      color: #999;
      margin-right: 1rem;
    }
    p {
      font-size: 1.2rem;
    }
  }
  .yixvan {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    div {
      display: flex;

      span {
        color: #999;
        margin-right: 1rem;
      }

      p {
        font-size: 1.2rem;
      }
    }
  }
  .dz {
    margin-top: 1rem;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    // i{
    //     float: right;
    // }
    div {
      display: flex;

      span {
        margin-right: 1rem;

        color: #999;
      }
    }
  }
  .attr-parameter {
    background-color: #fff;
    tr {
      td {
        padding: 1rem;
        border-color: #eee;
      }
    }
  }
  .tab {
    margin: 1rem 0;
    display: flex;
    background-color: #fff;
    p {
      text-align: center;
      flex: 1;
      display: flex;
      justify-content: center;
      span {
        padding: 1rem;
        box-sizing: border-box;
      }
    }
    .active {
      color: red;
      span {
        border-bottom: 2px solid red;
      }
    }
  }
  .desc-mobile {
    box-sizing: border-box;
    //  padding: 2%;
    img {
      width: 100%;
    }
  }
  .p {
    background-color: #fff;

    padding: 1rem;
  }
  .top-fix {
    z-index: 99;
    position: fixed;
    width: 100%;
    display: flex;
    height: 4.4rem;
    line-height: 4.4rem;
    text-align: center;
    justify-content: space-between;

    div {
      width: 10%;
      text-align: center;
      i {
        font-size: 2.2rem;
        background-color: rgba(0, 0, 0, 0.4);
        border-radius: 50%;
        color: white;
        padding: 2px;
      }
    }
    ul {
      padding: 0 2rem;
      width: 80%;
      display: flex;
      box-sizing: border-box;

      li {
        white-space: nowrap;
        font-size: 1.4rem;
        flex: 1;
        box-sizing: border-box;
        padding: 0 2rem;
      }
      .active {
        border-bottom: 2px solid red;
        color: red;
      }
    }
  }
  .top-sp {
    background-color: rgba(255, 255, 255, 0.8);
    i {
      color: #666 !important;
      background-color: rgba(0, 0, 0, 0) !important;
    }
  }
  .swipe1 {
    width: 100%;
    height: 35rem;
    .mint-swipe-item {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .price {
    background-color: #fff;
    display: flex;
    line-height: 3rem;
    p {
      font-size: 2rem;
      font-weight: 700;
      color: red;
      &::before {
        content: "￥";
        font-size: 1.6rem;
      }
    }
    span {
      color: #666;
      text-decoration: line-through;
      font-size: 1.4rem;
      line-height: 3.5rem;
      margin-left: 1rem;
      &::before {
        content: "￥";
      }
    }
  }
  .goods-name {
    background-color: #fff;
    p {
      font-size: 1.5rem;
      //   font-weight: 700;
      color: #333;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; //显示几行
      -webkit-box-orient: vertical;
    }
    div {
      margin-top: 1rem;
      display: flex;
      span {
        font-size: 1.2rem;
        flex: 1;
        color: #999;
      }
    }
  }
}
</style>