<!--  -->
<template>
  <div class="login">
    <div class="mengban" v-if="mengbanflag">
      <div>
        <p
          v-for="(value, index) in statelist"
          :key="index"
          @click="mengbanfn(index)"
        >
          {{ value }}
        </p>
      </div>
    </div>
    <div v-else class="login-content">
      <div class="logo">
        <img :src="imgsrc" alt="" />
      </div>
      <div class="content">
        <div class="tabnav">
          <p
            v-for="(value, index) in statelist"
            :key="index"
            @click="tabfn(index)"
            :class="{ active: index == mengbanIndex }"
          >
            {{ value }}
          </p>
        </div>
        <div class="tabcontent" v-if="mengbanIndex == 0">
          <p>
            <input type="text" v-model="yzm" placeholder="验证码" /><img
              @click="imgfn"
              :src="imgsrc1"
              alt=""
            />
          </p>
          <p>
            <input
              type="text"
              v-model="phone"
              placeholder="请输入您的手机号"
            /><button @click="phoneyzmfn" v-if="phoneflag">获取验证码</button
            ><button v-else>{{ num }}s后再次获取验证码</button>
          </p>
          <p>
            <input type="text" v-model="phoneyzm" placeholder="输入验证码" />
          </p>
          <div @click="phonelogin">立即登录</div>
        </div>
        <div class="tabcontent" v-else>
          <p>
            <input type="text" placeholder="验证码" v-model="yzm" /><img
              @click="imgfn"
              :src="imgsrc1"
              alt=""
            />
          </p>
          <p><input type="text" placeholder="用户名" v-model="username" /></p>
          <p><input :type="iflag==true ? 'password' :'text'" placeholder="密码" v-model="password" /> <i v-if="iflag" @click="changeiflag" class="iconfont icon-yincang"></i><i v-else @click="changeiflag" class="iconfont icon-xianshi
"></i></p>
          <div @click="userloginfn">立即登录</div>
        </div>
        <p><router-link to="/register">没有账号，去注册</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { userlogin, phonelogin, phoneyzm } from "@/api/api.js";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      statelist: ["短信验证登录", "账号密码登录"],
      mengbanflag: true,
      mengbanIndex: 0,
      yzm: "",
      username: "",
      password: "",
      img: "http://192.168.1.46:3000/admin/yzm?id=",
      id: +new Date(),
      phone: "",
      phoneyzm: "",
      phoneflag: true,
      num: 60,
      intvalid: null,
      iflag:true,
      //   imgsrc: require("@/assets/imges/logo1.jpg"),
      //   tablist:["短信登录","账号登录"],
    };
  },
  //监听属性 类似于data概念
  computed: {
    imgsrc() {
      return require("@/assets/imges/logo" + this.mengbanIndex + ".jpg");
    },
    imgsrc1() {
      return this.img + this.id;
    },
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
      changeiflag(){
   this.iflag=!this.iflag
      },
    mengbanfn(index) {
      this.mengbanflag = false;
      this.mengbanIndex = index;
    },
    tabfn(index) {
      this.mengbanIndex = index;
    },
    async userloginfn() {
      if (this.yzm == "") {
        alert("验证码不能为空");
      } else if (this.username == "") {
        alert("用户名不能为空");
      } else if (this.password == "") {
        alert("密码不能为空");
      } else {
        let parmas = {
          yzm: this.yzm,
          username: this.username,
          password: this.password,
        };
        let result = await userlogin("/login", parmas, "post");
        if (result.status == 200) {
          console.log(111111);

          this.$store.commit("usertokenchange", result);
          this.$router.push("/");
        }
        console.log(result);
      }
    },
    imgfn() {
      this.id = +new Date();
    },
    async phonelogin() {
      if (this.yzm == "") {
        alert("验证码不能为空");
      } else {
        if (this.phone == "") {
          alert("手机号不能为空");
        } else {
          if (/^1[3|4|5|7|8][0-9]{9}$/.test(this.phone)) {
            let parmas = {
              phone: this.phone,
              yzm: this.yzm,
              phoneyzm: this.phoneyzm,
            };
            let ret = await phonelogin("/phonelogin", parmas, "post");
            console.log(ret);
            if (ret.status == 200) {
              console.log(111111);

              this.$store.commit("usertokenchange", ret);
              this.$router.push("/");
            }
          } else {
            alert("请输入正确的手机号");
          }
        }
      }
    },
    async phoneyzmfn() {
      if (this.phone == "") {
        alert("还没有输入手机号哦");
      } else {
        if (/^1[3|4|5|7|8][0-9]{9}$/.test(this.phone)) {
          this.num = 60;
          this.phoneflag = false;
          this.intvalid = setInterval(() => {
            this.num--;
            if (this.num == 0) {
              this.phoneflag = true;
              clearInterval(this.intvalid);
            }
          }, 1000);
          let parmas = {
            phone: this.phone,
          };
          let ret = await phoneyzm("/phoneyzm", parmas, "post");
          console.log(ret.status);
        } else {
          alert("请输入正确的手机号");
        }
      }
    },
  },
  beforeCreate() {}, //生命周期 - 创建之前
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  beforeMount() {}, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less">
.login {
  .mengban {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      width: 80%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 1.5rem;
      overflow: hidden;
      p {
        text-align: center;
        width: 50%;
        background-color: red;
        line-height: 5rem;
        color: white;
        font-size: 1.5rem;
        &:first-child {
          background-color: #666;
        }
      }
    }
  }
  .login-content {
    position: fixed;
    top: 0;
    width: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    height: 100%;
    .logo {
      width: 10rem;
      height: 15rem;
      width: 15rem;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      border-radius: 50%;

      img {
        height: 100%;
      }
    }
    .content {
      margin-top: 5rem;
      width: 80%;
      & > p {
        margin-top: 1rem;
        width: 100%;
        text-align: center;
        a {
          font-size: 1.2rem;
          text-decoration: underline;
          color: red;
        }
      }
      .tabnav {
        color: #333;
        display: flex;
        border-radius: 1rem;
        overflow: hidden;
        p {
          flex: 1;
          text-align: center;
          background-color: #fff;
          line-height: 4.5rem;
          font-size: 1.6rem;
        }
        .active {
          background-color: red;
          color: white;
        }
      }
      .tabcontent {
        margin-top: 1rem;
        width: 100%;
        P {
          margin-bottom: 1rem;
          display: flex;
          border: 1px solid #666;
          overflow: hidden;
          i{
              background-color: #fff;
              font-size: 2.5rem;
              line-height: 4rem;
              
          }
          input {
            flex: 1;
            line-height: 4rem;
            text-indent: 1rem;
          }
          img {
            border-left: 1px solid #999;
            height: 4rem;
          }
          button {
            background-color: #666;
            color: #fff;
            width: 30%;
            font-size: 1.4rem;
          }
        }
        div {
          text-align: center;
          font-size: 2rem;
          line-height: 5rem;
          color: #fff;

          background-color: red;
        }
      }
    }
  }
}
</style>