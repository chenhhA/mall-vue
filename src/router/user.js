import Profile from "../views/user/Profile";
import TabBar from "../components/Tabbar/Tabbar";
import UserCoupon from "../views/user/Coupon/Index";
import TopNav from "../components/TopNav/TopNav";
import ReturnTopNav from "../components/TopNav/ReturnTopNav";
import EditUserInfo from "../views/user/EditUserInfo";
import UsefFootprint from "../views/user/footprint/Index";
import UserCollect from "../views/user/collect/Index";
import FeedBackList from "../views/user/feedback/Index";
import AddFeedBack from "../views/user/feedback/add/Index";
import Help from "../views/user/help/Index";
import Address from "../views/user/Address";
import Coupon from "../views/items/Coupon";

export default [
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
            topnav: ReturnTopNav
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
            topnav: ReturnTopNav
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
            topnav: ReturnTopNav
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
]
