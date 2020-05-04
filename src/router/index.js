import Vue from 'vue'
import VueRouter from 'vue-router'
import home from './home'
import item from './item'
import login from './login'
import order from './order'
import user from './user'

Vue.use(VueRouter)

const routes =
    [...home,
        ...item,
        ...login,
        ...order,
        ...user
    ]


const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router
