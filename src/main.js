// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/index.styl'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import 'jquery'
import ElementUI from 'element-ui'
import global from './assets/js/config'
import base from './assets/js/base'
import store from './assets/js/store'
// import 'bootstrap/dist/css/bootstrap.css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap'
// import 'babel-polyfill'
// import filters from './assets/js/filters'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(ElementUI)
Vue.use(base)
Vue.prototype.GLOBAL = global

// Object.keys(filters).forEach(key => {
//   Vue.filter(key, filters[key])
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
//个人中心登录判断
router.beforeEach((to, from, next) => {
  router.app.$options.store.commit('SetSearch',false)
  let token = sessionStorage.getItem('token')
  if (to.meta.requireAuth && (!token || token === null)) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }else {

    next()
  }
})
