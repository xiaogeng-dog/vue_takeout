import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
// 引入图片懒加载
import VueLazyload from 'vue-lazyload'
import loading from './assets/loading.gif'
import './mock/mockServer'
import './filters' // 加载过滤器
// 引入重置样式
import '../static/css/reset.css'

import 'swiper/dist/css/swiper.min.css'
// 引入全部组件
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
Vue.use(VueLazyload, {
  loading
})

Vue.config.productionTip = false
Vue.prototype.$axios = axios
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
