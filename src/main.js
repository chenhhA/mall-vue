import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        console.log(store.state.loginStatus)
        if (store.state.loginStatus === 0) {
            next({
                path: '/login',
            })
        } else {
            next()
        }
    } else {
        next() // 确保一定要调用 next()
    }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
