import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Router from 'vue-router';
const routerPush = Router.prototype.push;
import 'normalize.css' //重置html 默认样式
import PostCss from 'postcss-px-to-viewport'
// window.baseImgUrl = "http://119.3.196.255:7604/images/iconPic/"  预留网上图片地址
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}
Vue.config.productionTip = false

new Vue({
    router,
    store,
    PostCss,
    render: h => h(App)
}).$mount('#app')