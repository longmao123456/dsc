<!--  -->
<template>
<div class='goodsmb'>
    <div  class="goodsmengban">
        <img :src="canvasimg" class="cavimg" alt="">
        <img class="img1" src="@/assets/imges/poster-close.png" alt="" @click="delfn">
        <img class="img" :src="dataList.goods_img" alt="">
        <div class="content">
           <p>
               {{dataList.goods_name}}
           </p>
           <div>
{{dataList.cost_price}}
  <img :src="ewmsrc" alt="">
           </div>
           <span>
            长按保存到相册
          
           </span>
        </div>
        
    </div>
    <div class="fll">
    <div class="dishide" >

        <canvas ></canvas>

    </div>
</div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import QRCode from "qrcode"
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
 ewmsrc:"",
 canvasimg:"",
};
},
//监听属性 类似于data概念
computed: {
    dataList() {
        console.log(this.$store.state.goodsList)
      return this.$store.state.goodsList;
    },
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
delfn(){
    this.$emit("delflag",false)
},
async ewm(){
     let goodsUrl = location.href  //获取当前页面的url
        console.log(QRCode.toDataURL(goodsUrl));
        var code = await QRCode.toDataURL(goodsUrl)
        console.log(code);
        this.ewmsrc=code
},
    titleAutoLine(title, canvas, x, y, lineHeight, canvasWidth, lines) {
      //需要标题文字   title
      //画布   canvas
      //x  绘制标题的水平方向起始位置
      //y  绘制标题的垂直方向起始位置
      //lineHeight 绘制标题的行高，自己定义一个任意值即可
      //canvasWidth  绘制标题的宽度
      //lines   绘制的行数
      //this.titleAutoLine(title, canvas, 20, W + 30, 30,200, 2);
      console.log(title);
      console.log(canvas);
      var ctx = canvas.getContext("2d"); //创建一个2d画布
      var lineWidth = 0; //绘制标题文本的宽度
      var lastSubStringIndex = 0; //绘制标题文本字符串的索引
      var beginY = y; //绘制标题文本的起始y左边

      for (let i = 0; i < title.length; i++) {
        lineWidth += ctx.measureText(title[i]).width;
        // console.log(lineWidth);
        if (lineWidth > canvasWidth) {
          if (y >= beginY + lineHeight * (lines - 1)) {
            ctx.fillText(
              title.substring(lastSubStringIndex, i - 5) + "...",
              x,
              y
            );
            return;
          } else {
            ctx.fillText(title.substring(lastSubStringIndex, i), x, y);
            y += lineHeight;
            lineWidth = 0;
            lastSubStringIndex = i;
          }
        }
      }

      // console.log(ctx.measureText(title).width);

      //ctx.fillText(title.substring(0, 23), x, y);
      //ctx.fillText(title.substring(23, 40) + "...", x, y + 30);
    },
},
beforeCreate() {}, //生命周期 - 创建之前
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
beforeMount() {}, //生命周期 - 挂载之前
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    this.ewm()
   this.$nextTick(()=>{
       let canvas=document.querySelector('canvas')//获取画布
      let ctx= canvas.getContext('2d'); //固定格式，开始画图
      let H=window.screen.availHeight; //获取当前屏幕的宽高 ，不包含任务栏
      let W=window.screen.availWidth;
         
    //   console.log(ctx)
      console.log(W,H)
    let devicePixelRatio = window.devicePixelRatio || 1;
 //获取设备的像素比    //pc端1倍，iphone6,7,8 2倍关系   iphone6p,7p,8p,X 3倍关系
       //在canvas context中也存在一个webkitBackingStorePixelRatio的属性（仅safari和chrome）
       //，该属性的值决定了浏览器在渲染canvas之前会用几个像素来来存储画布信息。
    let backingPixelRatio = ctx.webkitBackingStorePixelRatio || 1;
    let ratio = devicePixelRatio / backingPixelRatio; //计算出比例
    console.log(ratio)
     
     canvas.width = W * ratio;
      canvas.height = H * ratio;
     canvas.style.width=W* ratio + "px"
     canvas.style.height=H* ratio + "px"

    
     ctx.scale(ratio, ratio);
    
      //getImageData() 复制画布上指定矩形的像素数据，然后通过 putImageData() 将图像数据放回画布：
      var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      // console.log(imgData.data);
      //定义一个白色画布
      for (var i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i] = 255;
        imgData.data[i + 1] = 255;
        imgData.data[i + 2] = 255;
        imgData.data[i + 3] = 255;
      }
        ctx.putImageData(imgData, 0, 0);
       function getBase64(img) {
            // console.log(img.substring(img.lastIndexOf(".") + 1).toLowerCase());
            // console.log(img);
            var canvas = document.createElement("canvas")
            var ctx = canvas.getContext("2d")
            // console.log(ctx);
            canvas.width = img.width
            canvas.height = img.height
            img.crossOrigin = "Anonymous"   //设置图片跨域拷贝
            ctx.drawImage(img, 0, 0, img.width, img.height);
            var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase()
            var dataUrl = canvas.toDataURL("image/" + ext)
            return dataUrl
        }
      
        var image = new Image()
       
        image.crossOrigin = "Anonymous"
        image.src =this.dataList.goods_img;
        // setTimeout(() => {
        //  document.querySelector(".goodsmengban").appendChild(image)
            
        // },500);
        // setTimeout(() => {
             image.onload = function () {
            let base64 = getBase64(image)
            console.log(base64);
           var img = new Image(); //定义一个图片对象
      img.src = base64;
      // console.log(img);
      img.onload = function () {
        ctx.drawImage(img, 0, 0, W, W);
      };
        }
        // }, 2000);
        
          // 生成标题
      // 生成标题
      ctx.font = "20px Arial"; //设置字体大小
      ctx.fillStyle = "#333333"; //设置字体的颜色
      // ctx.textAlign = "center"; //设置文本的对齐方式
      // ctx.fillText(this.posterDatas.title, 20, W + 30);
      let title = this.dataList.goods_name
       console.log(title);

      this.titleAutoLine(title, canvas, 20, W + 30, 30, W - 40, 2);
        // 生成价格
      ctx.font = "30px Arial"; //设置字体大小
      ctx.fillStyle = "#FF4444"; //设置字体的颜色
      ctx.textAlign = "center"; //设置文本的对齐方式

      ctx.fillText("￥" + this.dataList.cost_price, W / 2, W + 130);
       //生成二维码图像图像
      var img2 = new Image(); //定义一个图片对象
      img2.src = this.ewmsrc;
      // console.log(img);
      img2.onload = function () {
        ctx.drawImage(img2, 100, W + 160, W / 3, W / 3);
      };
      setTimeout(() => {
        //   console.log(666);
        console.log(canvas.toDataURL());
        this.canvasimg=canvas.toDataURL()
        // this.posterImage = canvas.toDataURL();
      }, 1000);
   })


   
},
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="less">

.goodsmb{
      
    .fll{
     z-index: 999;
     position: absolute;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
       display: none;
    .dishide{
      
        
    }
    }
    position: fixed;
    top: 0;
    bottom: 0;
    left:0 ;
    right: 0;
    background-color: rgba(0,0,0,.5);
    z-index: 999;
    .goodsmengban{
        position: absolute;
        top: 15%;
        left:15%;
        width: 70%;
        height: 60%;
        background-color: #fff;
        .cavimg{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height:100%;
      } 
        .img{
            width: 100%;
        }
        .img1{
            position: absolute;
            right: 0rem;
            top: -3rem;
            height: 3rem;
        }
        .content{
            padding: 1rem;
p{
    font-size: 1.6rem;
    color: #333;
      text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; //显示几行
    -webkit-box-orient: vertical;
    overflow: hidden;
}
div{
    margin-top: 1rem;
     color: red;
     font-size: 1.4rem;
     line-height: 5rem;
    text-align: center;
     &::before{
         content: "￥";
         font-size: 1.2rem;

     }
     img{
         float: right;
         height: 7rem;
     }
}
span{
    height: 4rem;
    width: 100%;
    color: white;
    position: absolute;
    text-align: center;
    font-size: 1.6rem;
    bottom:-4rem;
    line-height: 4rem;
}
        }

    }
}
</style>