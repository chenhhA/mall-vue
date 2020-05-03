import OrderTab from "../views/order/list/Index";
import TopNav from "../components/TopNav/TopNav";
import Order from "../views/order/OrderPreview/Index";
import OrderItem from "../views/order/item/Index";
import OrderTraces from "../views/order/express/Index";
import Pay from "../views/order/payment/Index";
import Cart from "../views/items/Cart";
import TabBar from "../components/Tabbar/Tabbar";

export default [
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
]
