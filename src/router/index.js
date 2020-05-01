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
import Search from '../views/items/search/Index'
import Product from '../views/items/Product.vue'
import EditUserInfo from "../views/user/EditUserInfo";
import UsefFootprint from "../views/user/footprint/Index";
import UserCollect from "../views/user/collect/Index";
import Help from "../views/user/help/Index";
import FeedBackList from "../views/user/feedback/Index";
import AddFeedBack from "../views/user/feedback/add/Index";
import UserCoupon from "../views/user/Coupon/Index";
import Order from "../views/order/OrderPreview/Index";
import OrderTab from "../views/order/list/Index";
import OrderItem from "../views/order/item/Index";
import OrderTraces from "../views/order/express/Index";
import Pay from "../views/order/payment/Index";
import Test from "../views/Test";

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
        path: '/test',
        name: '测试页面',
        components: {
            default: Test,
            tabbar: TabBar,
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
        path: '/search',
        name: '商品搜索',
        components: {
            default: Search,
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
        path: '/user/coupon',
        name: '优惠券管理',
        components: {
            default: UserCoupon,
            topnav: TopNav
        },
        meta:{
            requiresAuth: true
        },
    },

    {
        path:'/user/info',
        name: '个人信息',
        components: {
            default: EditUserInfo,
            topnav: TopNav
        },
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/user/footprint',
        name: '浏览记录',
        components: {
            default: UsefFootprint,
            topnav: TopNav
        },
        meta:{
            requiresAuth: true
        }
    },
    {
        path: '/user/collect',
        name: '收藏夹',
        components: {
            default: UserCollect,
            topnav: TopNav
        },
        meta:{
            requiresAuth: true
        }
    },
    {
        path: '/user/feedback',
        name: '意见反馈',
        components: {
            default: FeedBackList,
            topnav: TopNav
        },
        meta:{
            requiresAuth: true
        }
    },
    {
        path: '/user/feedback/add',
        name: '添加意见反馈',
        components: {
            default: AddFeedBack,
            topnav: TopNav
        },
        meta:{
            requiresAuth: true
        }
    },
    {
        path: '/user/help',
        name: '帮助中心',
        components: {
            default: Help,
            topnav: TopNav
        },
        meta:{
            requiresAuth: true
        }
    },
    {
        path: '/order/list',
        name: '订单列表',
        components: {
            default: OrderTab,
            topnav: TopNav
        },
        meta:{
            requiresAuth: false
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
        path:'/order/preview',
        name:'订单结算',
        components: {
            default: Order,
            topnav: TopNav
        },
        meta: {
            requiresAuth: true
        }
    },
    {
        path:'/order/info',
        name:'订单详情',
        components: {
            default: OrderItem,
            topnav: TopNav
        },
        meta: {
            requiresAuth: false
        }
    },
    {
        path:'/order/traces',
        name:'物流信息',
        components: {
            default: OrderTraces,
            topnav: TopNav
        },
        meta: {
            requiresAuth: false
        }
    },
    {
        path:'/order/pay',
        name:'订单结算',
        components: {
            default: Pay,
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
