import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Category from '../views/items/Category.vue'
import Cart from '../views/items/Cart.vue'
import Login from '../views/login/Login.vue'
import Register from '../views/login/Register.vue'
import Forget from '../views/login/Forget.vue'
import Profile from '../views/user/Profile.vue'
import Address from '../views/user/Address.vue'
import TabBar from '../components/Tabbar/Tabbar.vue'
import TopNav from '../components/TopNav/TopNav.vue'
import CategoryItems from '../views/items/CategoryItems.vue'
import ItemList from '../views/items/ItemList.vue'
import Coupon from '../views/items/Coupon.vue'
import Product from '../views/items/Product.vue'
import EditUserInfo from "../views/user/EditUserInfo";

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
        }
    },
    {
        path: '/category/:id',
        name: '分类商品',
        components: {
            default: CategoryItems,
            topnav:TopNav
        },
        meta:{
            requiresAuth: false
        }
    },
    {
        path: '/item/list',
        name: '分类商品列表',
        props: { default: true, topnav: false },
        components: {
            default: ItemList,
            topnav: TopNav
        },
        meta:{
            requiresAuth: false
        }
    },
    {
        path: '/product/:id',
        name: '商品详情',
        components: {
            default: Product,
            topnav: TopNav
        },
        meta:{
            requiresAuth: false
        }
    },
    {
        path: '/coupon',
        name: '领券中心',
        components: {
            default: Coupon,
            tabbar: TabBar,
            topnav: TopNav
        },
        meta:{
            requiresAuth: false
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
        path: '/user',
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
        path:'/user/info',
        name: '个人信息',
        components: {
            default: EditUserInfo,
            tabbar: TabBar
        },
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/address/list',
        name: '收货地址',
        components: {
            default: Address,
            topnav: TopNav
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
        path:'/forget',
        name:'注册',
        component: Forget,
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
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router
