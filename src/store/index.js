import Vue from 'vue'
import Vuex from 'vuex'
import {getCategory} from "../api/api";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loginStatus: 0,//0->未登录, 1->已登陆,
        userInfo:{},  //用户相关信息
        categories:[] // 分类信息
    },
    mutations: {
        login(state) {
            state.loginStatus = 1;
            console.log("Login!")
        },
        logout(state) {
            state.loginStatus = 0;
            console.log("Logout!")

        },
        setUserInfo(state, data) {
            state.userInfo = data;
        },
        setCategory(state, categoriess) {
            state.categories = categoriess;
        },
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
                    return state.categories[i];
                }
                for (let j = 0; j < state.categories[i].children.length; j++) {
                    if (state.categories[i].children[j].id == id) {
                        return state.categories[i].children[j];
                    }
                }
            }
        },
    }
})
