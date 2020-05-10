import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import './utils/filter'
import { Lazyload } from 'vant';
import {compareArray} from "./utils/ArrayUtils";

import '@/assets/scss/global.scss';
import '@/assets/scss/iconfont/iconfont.css';
import 'vant/lib/icon/local.css';

Vue.use(Vant);
Vue.use(Lazyload);

Vue.config.productionTip = false
Vue.prototype.compareArray = compareArray;
store.dispatch("loadCategory");

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (store.state.loginStatus === 0) {
            console.log(`/login?redirectUrl=${to.path}`)
            next({
                path: `/login?redirectUrl=${to.path}`
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
