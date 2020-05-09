import Login from "../views/login/Login";
import Register from "../views/login/Register";
import Forget from "../views/login/Forget";
import ReturnTopNav from "../components/TopNav/ReturnTopNav";

export default [
    {
        path:'/login',
        name:'登陆',
        components: {
            default: Login,
            topnav: ReturnTopNav
        },
        meta:{
            requiresAuth: false
        }
    },
    {
        path:'/register',
        name:'注册',
        components: {
            default: Register,
            topnav: ReturnTopNav
        },
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
    }
]
