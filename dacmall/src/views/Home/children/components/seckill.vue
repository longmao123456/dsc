<!--  -->
<template>
  <div class="seckill">
    <div class="top">
      <img
        src="https://x.dscmall.cn/storage/data/gallery_album/177/original_img/177_P_1597978468241.png"
        alt=""
      />
      <div class="seckill-time">
        <p>距离结束还剩 <span>{{ hours}}</span>:<span>{{minute}}</span>:<span>{{second}}</span></p>
      </div>
    </div>
    <div class="title">
      <ul ref="ult">
        <li
          v-for="(value, index) in timelist"
          :key="index"
          :class="{ active: listIndex == index }"
          @click="activefn(index)"
        >
          <p>{{ value }}</p>
          <div>{{ index==timeIndex ?"抢购中"  :"即将开始"}}</div>
        </li>
      </ul>
    </div>
    <div class="conetent">
      <ul>
        <li
          v-for="(value, index) in contentlist"
          :key="index"
          :class="{hidd: index == listIndex }"
        >
          <div class="img-list">
            <ul>
              <li v-for="(val, ind) in value" :key="ind">
                <div class="img">
                  <img :src="val.imgsrc" alt="" />
                </div>
                <div class="content">
                <div class="content1">{{ val.content1}}</div>
                <div class="content2"><span>￥</span>{{ val.content2 }}<span>.00</span></div>

                <div class="content3">{{ val.content3 }}</div>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <p>
      查看更多秒杀商品<i class="iconfont icon-jiantou2"></i>
    </p>
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
      timelist: ["08:00", "10:00", "16:00", "24:00"],
      contentlist: [
        [
          {
            imgsrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1490175230574.jpg",
            content1:
              "Joyoung/九阳 Y-50C15电压力锅高压锅正品双胆智能预约5L铁釜新品 土灶铁斧 双重安全锁",
            content2: "7700",
            content3: "￥454.80",
          },
          {
            imgsrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1490175230574.jpg",
            content1:
              "Joyoung/九阳 Y-50C15电压力锅高压锅正品双胆智能预约5L铁釜新品 土灶铁斧 双重安全锁",
            content2: "7700",
            content3: "￥454.80",
          },
          {
            imgsrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1490175230574.jpg",
            content1:
              "Joyoung/九阳 Y-50C15电压力锅高压锅正品双胆智能预约5L铁釜新品 土灶铁斧 双重安全锁",
            content2: "7700",
            content3: "￥454.80",
          },
          {
            imgsrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1490175230574.jpg",
            content1:
              "Joyoung/九阳 Y-50C15电压力锅高压锅正品双胆智能预约5L铁釜新品 土灶铁斧 双重安全锁",
            content2: "7700",
            content3: "￥454.80",
          },
          {
            imgsrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1490175230574.jpg",
            content1:
              "Joyoung/九阳 Y-50C15电压力锅高压锅正品双胆智能预约5L铁釜新品 土灶铁斧 双重安全锁",
            content2: "7700",
            content3: "￥454.80",
          },
          
        ],
        [
          {
            imgsrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1489097825348.jpg",
            content1:
              "Joyoung/九阳 Y-50C15电压力锅高压锅正品双胆智能预约5L铁釜新品 土灶铁斧 双重安全锁",
            content2: "7700",
            content3: "￥454.80",
          },
          {
            imgsrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1489097825348.jpg",
            content1:
              "Joyoung/九阳 Y-50C15电压力锅高压锅正品双胆智能预约5L铁釜新品 土灶铁斧 双重安全锁",
            content2: "7700",
            content3: "￥454.80",
          },
          {
            imgsrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1489097825348.jpg",
            content1:
              "Joyoung/九阳 Y-50C15电压力锅高压锅正品双胆智能预约5L铁釜新品 土灶铁斧 双重安全锁",
            content2: "7700",
            content3: "￥454.80",
          },
         {
            imgsrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1489097825348.jpg",
            content1:
              "Joyoung/九阳 Y-50C15电压力锅高压锅正品双胆智能预约5L铁釜新品 土灶铁斧 双重安全锁",
            content2: "7700",
            content3: "￥454.80",
          },
          {
            imgsrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1489097825348.jpg",
            content1:
              "Joyoung/九阳 Y-50C15电压力锅高压锅正品双胆智能预约5L铁釜新品 土灶铁斧 双重安全锁",
            content2: "7700",
            content3: "￥454.80",
          },
          
        ],
        [
           {
            imgsrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1489098597912.jpg",
            content1:
              "Joyoung/九阳 Y-50C15电压力锅高压锅正品双胆智能预约5L铁釜新品 土灶铁斧 双重安全锁",
            content2: "7700",
            content3: "￥454.80",
          },
          {
            imgsrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1489098597912.jpg",
            content1:
              "Joyoung/九阳 Y-50C15电压力锅高压锅正品双胆智能预约5L铁釜新品 土灶铁斧 双重安全锁",
            content2: "7700",
            content3: "￥454.80",
          },
          {
            imgsrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1489098597912.jpg",
            content1:
              "Joyoung/九阳 Y-50C15电压力锅高压锅正品双胆智能预约5L铁釜新品 土灶铁斧 双重安全锁",
            content2: "7700",
            content3: "￥454.80",
          },
          {
            imgsrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1489098597912.jpg",
            content1:
              "Joyoung/九阳 Y-50C15电压力锅高压锅正品双胆智能预约5L铁釜新品 土灶铁斧 双重安全锁",
            content2: "7700",
            content3: "￥454.80",
          },
          {
            imgsrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1489098597912.jpg",
            content1:
              "Joyoung/九阳 Y-50C15电压力锅高压锅正品双胆智能预约5L铁釜新品 土灶铁斧 双重安全锁",
            content2: "7700",
            content3: "￥454.80",
          },
          
        ],
        [
            {
            imgsrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1489099128797.jpg",
            content1:
              "Joyoung/九阳 Y-50C15电压力锅高压锅正品双胆智能预约5L铁釜新品 土灶铁斧 双重安全锁",
            content2: "7700",
            content3: "￥454.80",
          },
           {
            imgsrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1489099128797.jpg",
            content1:
              "Joyoung/九阳 Y-50C15电压力锅高压锅正品双胆智能预约5L铁釜新品 土灶铁斧 双重安全锁",
            content2: "7700",
            content3: "￥454.80",
          },
           {
            imgsrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1489099128797.jpg",
            content1:
              "Joyoung/九阳 Y-50C15电压力锅高压锅正品双胆智能预约5L铁釜新品 土灶铁斧 双重安全锁",
            content2: "7700",
            content3: "￥454.80",
          },
           {
            imgsrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1489099128797.jpg",
            content1:
              "Joyoung/九阳 Y-50C15电压力锅高压锅正品双胆智能预约5L铁釜新品 土灶铁斧 双重安全锁",
            content2: "7700",
            content3: "￥454.80",
          },
           {
            imgsrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1489099128797.jpg",
            content1:
              "Joyoung/九阳 Y-50C15电压力锅高压锅正品双胆智能预约5L铁釜新品 土灶铁斧 双重安全锁",
            content2: "7700",
            content3: "￥454.80",
          },
           {
            imgsrc:
              "https://x.dscmall.cn/storage/images/201703/thumb_img/0_thumb_G_1489099128797.jpg",
            content1:
              "Joyoung/九阳 Y-50C15电压力锅高压锅正品双胆智能预约5L铁釜新品 土灶铁斧 双重安全锁",
            content2: "7700",
            content3: "￥454.80",
          }
        ]

      ],
      listIndex: 0,
      time:8,
      timeIndex:0,
      hours:'00',
      minute:'00',
      second:'00',
      ceckilldsq:null,

    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    activefn(index) {
      this.listIndex = index;
    },
    timefn(){
        let oTime=new Date();
        // console.log(oTime.getHours());
    this.timelist.every((val,index)=>{
          this.timeIndex=index
        return   parseInt(val)<oTime.getHours()+1
        })
      this.ceckilldsq = setInterval(()=>{
         if(this.$route.path!="/home/index"){
            clearInterval(this.ceckilldsq)
          }
         for(let i=0;i<this.timeIndex;i++){
          this.$refs.ult.children[i].style.order=i+4
       }
        for(let i=this.timeIndex;i<this.timelist.length;i++){
          this.$refs.ult.children[i].style.order=i

       }
    // console.log(this.$refs.ult.children[this.timeIndex])
            let oTime=new Date();
          //  console.log(oTime.getHours())
 this.hours=(parseInt(this.timelist[this.timeIndex])- oTime.getHours()-1)<10 ?'0'+(parseInt(this.timelist[this.timeIndex])- oTime.getHours()-1) :(parseInt(this.timelist[this.timeIndex])- oTime.getHours()-1)
   this.minute=60- oTime.getMinutes()<10 ?'0'+(60- oTime.getMinutes()) :60- oTime.getMinutes()
    this.second=60- oTime.getSeconds()<10 ?'0'+(60- oTime.getSeconds()) :60- oTime.getSeconds()
        
        },1)
  
    },
  //   settimefn(){
  //       // order
  //   //    this.$refs.ult.children[this.timeIndex].style.order=-1 
  //      for(let i=0;i<this.timeIndex;i++){
  //         this.$refs.ult.children[i].style.order=i+4
  //      }
  //       for(let i=this.timeIndex;i<this.timelist.length;i++){
  //         this.$refs.ult.children[i].style.order=i

  //      }
  //   console.log(this.$refs.ult.children[this.timeIndex])
  // },
  },
  
  beforeCreate() {}, //生命周期 - 创建之前
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  beforeMount() {}, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
      this.timefn()
      // this.settimefn()
  },
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less">
.seckill {
  margin: 1rem 1rem;
  width: cale(100% - 2rem);
  background-color: #fff;
  border-radius: 1rem;
  padding: 1rem;
  box-sizing: border-box;
   &>p{
     margin: 1.5rem 0;
     text-align: center;
     font-weight: 700;
     font-size: 1.4rem;
     i{
       font-size: 1.2rem;
     }
   }
  .top {
    display: flex;
    img {
      width: 40%;
      height: 2.2rem;
    }
    .seckill-time {
      width: 60%;
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        span {
          background-color: red;
          padding: 0.1rem 0.3rem;
          color: white;
          border-radius: 0.5rem;
          margin: 0 0.5rem;
        }
      }
    }
  }
  .title {
    margin-top: 1rem;
    ul {
      display: flex;
      li {
        padding-bottom: 0.5rem;
        text-align: center;
        width: 25%;
        color: #888;
        font-size: 1.4rem;
        font-weight: 700;
        box-sizing: border-box;
        padding: 0.5rem 1rem 0 1rem;
        border-bottom: 1px solid #efefef;
        p {
        }
        div {
          padding-bottom: 0.5rem;
        }
      }
      .active {
        transform: scale(1.1);
        color: red;
        border-bottom: 0;

        div {
          border-bottom: 0.2rem solid red;
        }
      }
    }
  }
  .conetent {
      margin-top: 1rem;
    &>ul {
      &>li {
               display: none;

        .img-list {
          overflow: auto;
          width: 100%;
          
&::-webkit-scrollbar{
 
   display:none;
 
}
          ul {
            display: flex;
            width: 200%;
            li {
              width: 20%;
              .img {
                img {
                  width: 100%;
                }
              }
              .content{

               padding:0.5rem 1.2rem;
              .content1 {
                  font-weight: 600;
                  color: #333;
                font-size: 1rem;
                 white-space:nowrap;

       overflow:hidden;

       text-overflow:ellipsis;

              }
              .content2{
                  font-size: 1.4rem;
                  color: red;
                  font-weight: 600;
                  span{

                      font-size: 1rem;
                      transform: rotate(1.2);
                  }
              }
              .content3{
                  text-decoration:line-through;
                  color: #666;
              }
               }
            }
        
          }
        }
      }
        
    .hidd {
        display: block !important;
      }

    }
  }
}
</style>