// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import router from './router';
import storeObj from './store';
import ElementUI from 'element-ui';
import axios from 'axios';
import VueAwesomeSwiper from 'vue-awesome-swiper';
 
// require styles
import 'element-ui/lib/theme-chalk/index.css'; //饿了么样式
import 'swiper/dist/css/swiper.css'; //swiper样式

// 注册VueAwesomeSwiper
Vue.use(VueAwesomeSwiper, /* { default global options } */)

// 注册饿了么
Vue.use(ElementUI);

// 注册store
Vue.use(Vuex);
const store = new Vuex.Store(storeObj);

Vue.prototype.$http = axios;

// 生产提示
Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
