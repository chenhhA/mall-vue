import Login from "../views/login/Login";
import Register from "../views/login/Register";
import Forget from "../views/login/Forget";

export default [
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
    }
]
