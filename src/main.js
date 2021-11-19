import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/global.css'
// 导入字体图标
// import './assets/fonts/iconfont.css'
<<<<<<< HEAD
// import axios from 'axios'
// Vue.prototype.$http = axios
import axios from 'axios'
Vue.prototype.$http = axios
Vue.config.productionTip = false
axios.defaults.baseURL='http://gkd.aztop.cn'
=======
import axios from 'axios'
Vue.prototype.$http = axios
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://gkd.aztop.cn'
>>>>>>> 2f5ee6e (zjfirst)
Vue.use(ElementUI);

axios.defaults.baseURL = 'http://gkd.aztop.cn'
axios.interceptors.request.use(config => {
    //console.log(config);
    const token = sessionStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
}, (err) => {
    return err
})
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')