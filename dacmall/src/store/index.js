//是文件里面几个内容的入口
import Vue from "vue"
import Vuex from "vuex"  //需要下载 npm i vuex --s
Vue.use(Vuex)
import state from "./state"
import actions from "./actions"

import mutations from "./mutations"

// import getters from "./getters"
// 实例化一个store
const store =new Vuex.Store({
   state,
   actions,
   mutations
})
export default store
