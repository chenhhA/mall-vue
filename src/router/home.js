import Home from "../views/Home";
import TabBar from "../components/Tabbar/Tabbar";

export default [
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
]
