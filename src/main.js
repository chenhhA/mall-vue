import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import { Lazyload } from 'vant';

Vue.use(Vant);
Vue.use(Lazyload);

Vue.config.productionTip = false
store.dispatch("loadCategory");

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
