import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import MintUI from  'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUI);
import LyTab from 'ly-tab';
Vue.use(LyTab);
import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);
import router from "./router/router";
//引入状态管理store模块
import store from "./store/index"
new Vue({
  router,
  store, //挂载
  render: h => h(App),
}).$mount('#app')
