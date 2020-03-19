import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Category from '../views/items/Category.vue'
import Cart from '../views/items/Cart.vue'
import Login from '../views/login/Login.vue'
import Register from '../views/login/Register.vue'
import Profile from '../views/user/Profile.vue'
import TabBar from '../components/Tabbar/Tabbar.vue'
import TopNav from '../components/TopNav/TopNav.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: '首页',
        components: {
            default: Home,
            tabbar: TabBar
        },
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/category',
        name: '分类',
        components: {
            default: Category,
            tabbar: TabBar,
            topnav:TopNav
        },
        meta: {
            requiresAuth: false
        },
        childrens:{

        }
    },
    {
        path: '/cart',
        name: '购物车',
        components: {
            default: Cart,
            tabbar: TabBar
        },
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/my',
        name: '个人',
        components: {
            default: Profile,
            tabbar: TabBar
        },
        meta: {
            requiresAuth: true
        }
    },
    {
        path:'/login',
        name:'登陆',
        component: Login,
        meta:{
            requiresAuth: false
        }
    },
    {
        path:'/register',
        name:'注册',
        component: Register,
        meta:{
            requiresAuth: false
        }
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]



const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
