import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

Vue.config.productionTip = false

import http from './http.js'
Vue.prototype.$http = http

Vue.mixin({
  computed:{
    mixin_uploadUrl(){
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods:{
    mixin_getAuthHeaders(){
      return {
        Authorization:`Bearer ${localStorage.token || ''}`
      }
    }
  }
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

