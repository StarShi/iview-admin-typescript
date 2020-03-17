import Vue from 'vue';
import App from './App.vue';
//引入全局样式
import '@/assets/scss/resets.scss';
//引入 iview
import "@/libs/iview";
//引入页面全局公共样式
import "@/assets/scss/common.scss";
//引入路由
import router from "@/libs/router";
//引入数据状态管理
import store from "@/libs/store";
//引入数据请求方式axios
import '@/libs/axios';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
