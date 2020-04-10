import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
import router from './router'

//设置全局icon库
import '../src/assets/icon-font/iconfont.css'
//设置全局样式
import './assets/scss/style.scss'

//npm下载下来的vue组件(全局都能用)
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper, )

//自己写的组件（全局都能用）
import Card from './components/Card.vue'
Vue.component('respica-card',Card)
import Card1 from './components/Card1.vue'
Vue.component('respica-card1',Card1)


//全局的axios库
import axios from 'axios'
Vue.prototype.$http = axios.create({
  // baseURL:"http://localhost:3000/web/api"
  baseURL:process.env.VUE_APP_API_URL || '/web/api',
})



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
