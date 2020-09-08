// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import 'github-markdown-css'
import Elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Elementui)
Vue.prototype.$http = axios
axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('token')
Vue.config.productionTip = false

/* eslint-disable no-new */





new Vue({
  el: '#app',
  router: router,      //vue实列中注入Router，属性名'router'不可更改
  template: '<App/>',
  components: {App},
})
