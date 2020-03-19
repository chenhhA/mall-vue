import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loginStatus: 0,//0->未登录, 1->已登陆,
        userInfo:{},  //用户相关信息
        categories:{} // 分类信息
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
            console.log(data);
        },
        loadCategory(state){

        }
    },
    actions: {

    },
    modules: {}
})
