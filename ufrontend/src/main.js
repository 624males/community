//webpack.dev.config中的entry,webpack会自动将其解析到对应HTML
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import 'github-markdown-css'
import Elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';//引入组件样式

//引入Element需要使用
Vue.use(Elementui);
//增加原型属性$http来替代axios
Vue.prototype.$http = axios
//axios默认请求头为持有者(Bearer)+信息(token)
axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('token');
//productionTip设置为 false ，以阻止 vue 在启动时生成生产提示，可减少应用体积，通常在dev中设置为true
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router: router,      //vue实列中注入Router，属性名'router'不可更改
  template: '<App/>',  //用App组件替代对应html中id为app部分
  components: {App},
});
