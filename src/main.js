import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/global.css'
// 导入字体图标
// import './assets/fonts/iconfont.css'
// import axios from 'axios'
// Vue.prototype.$http = axios
import axios from 'axios'
Vue.prototype.$http = axios
Vue.config.productionTip = false
axios.defaults.baseURL='http://gkd.aztop.cn'
Vue.use(ElementUI);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')