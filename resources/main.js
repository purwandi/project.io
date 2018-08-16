import Vue from 'vue'
import App from './App.vue'
import VueRouter from './router'
import http from './services/http'

import './registerServiceWorker'
import './tailwind/tailwind.css'
import 'vue-material-design-icons/styles.css'

Vue.config.productionTip = false

new Vue({
  router: VueRouter,
  render: h => h(App),
  created () {
    http.init()
  }
}).$mount('#app')
