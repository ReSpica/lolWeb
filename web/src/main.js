import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

import '../src/assets/icon-font/iconfont.css'

import './assets/scss/style.scss'
import router from './router'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper, )



import Card from './components/Card.vue'
Vue.component('respica-card',Card)
import Card1 from './components/Card1.vue'
Vue.component('respica-card1',Card1)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
