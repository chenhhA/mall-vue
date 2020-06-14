import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import {getCategory} from "../api/api";

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})


export default new Vuex.Store({
    state: {
        loginStatus: 0,//0->未登录, 1->已登陆,
        userInfo:{},  //用户相关信息
        categories:[], // 分类信息
        selectCartItem:[], // 购物车中选中的项的id
        order:{},
        searchHistory:[], // 用户搜索记录
        orderItems:[] // 订单中待评价的商品
    },
    mutations: {
        login(state) {
            state.loginStatus = 1;
        },
        logout(state) {
            state.loginStatus = 0;
        },
        setUserInfo(state, data) {
            state.userInfo = data;
        },
        setCategory(state, categoriess) {
            state.categories = categoriess;
        },
        clearCartItem(state){
          state.selectCartItem= [];
        },
        setCartItem(state, cartItem){
            state.selectCartItem = cartItem;
        },
        setOrder(state, order) {
            state.order = order;
        },
        addSearchHistory(state, log){
            state.searchHistory.push(log)
        },
        setOrderItems(state, item) {
            state.orderItems = item
        }

    },
    actions: {
        // 加载分类信息
        loadCategory(context){
            getCategory().then(resp => {
                context.commit("setCategory", resp);
            });
        }
    },
    modules: {},
    getters:{
        getCategory: state=>{
            return state.categories;
        },
        getSubCategoryById: (state) => (id) => {
            for (let i = 0; i < state.categories.length; i++) {
                if (state.categories[i].id == id) {
                    return state.categories[i];
                }
            }
        },
        getCategoryById: (state) => (id) => {
            for (let i = 0; i < state.categories.length; i++) {
                if (state.categories[i].id == id) {
                    console.log("dd")
                    return state.categories[i];
                }
                for (let j = 0; j < state.categories[i].children.length; j++) {
                    if (state.categories[i].children[j].id == id) {
                        return state.categories[i].children[j];
                    }
                }
            }
        },
    },
    plugins: [vuexLocal.plugin]
})
