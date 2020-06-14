import OrderTab from "../views/order/list/Index";
import TopNav from "../components/TopNav/TopNav";
import Order from "../views/order/OrderPreview/Index";
import Comment from "../views/order/comment/Comment";
import OrderItem from "../views/order/item/Index";
import OrderTraces from "../views/order/express/Index";
import Pay from "../views/order/payment/Index";
import Cart from "../views/items/Cart";
import TabBar from "../components/Tabbar/Tabbar";
import ReturnTopNav from "../components/TopNav/ReturnTopNav";
import OrderComment from "../views/order/comment/OrderComment";

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
        path:'/order/info/:id',
        name:'订单详情',
        components: {
            default: OrderItem,
            topnav: ReturnTopNav
        },
        meta: {
            requiresAuth: true
        }
    },
    {
        path:'/order/traces',
        name:'物流信息',
        components: {
            default: OrderTraces,
            topnav: ReturnTopNav
        },
        meta: {
            requiresAuth: true
        }
    },
    {
        path:'/order/comment',
        name:'发表评价',
        components: {
            default: Comment,
            topnav: ReturnTopNav
        },
        meta: {
            requiresAuth: true
        }
    },
    {
        path:'/order/comment/show',
        name:'订单评价',
        components: {
            default: OrderComment,
            topnav: ReturnTopNav
        },
        meta: {
            requiresAuth: true
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
