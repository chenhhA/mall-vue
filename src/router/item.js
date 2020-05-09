import Category from "../views/items/Category";
import TabBar from "../components/Tabbar/Tabbar";
import TopNav from "../components/TopNav/TopNav";
import CategoryItems from "../views/items/CategoryItems";
import ItemList from "../views/items/ItemList";
import Product from "../views/items/Product";
import Search from "../views/items/search/Index";
import SearchResult from "../views/items/search/result/Index";

export default [
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
        path: '/search/result',
        name: '搜索结果',
        components: {
            default: SearchResult,
        },
        meta:{
            requiresAuth: false
        }
    },
]
