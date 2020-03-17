import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state: any = {//要设置的全局访问的state对象
    showLoading: false,
    token: '',//登录cookie
};
const getters: any = {//实时监听state值的变化(最新状态)
    getToken(state: any) {
        return state.token;
    },
    getShowLoading(state: any) {
        return state.showLoading;
    }
};
const mutations: any = {
    newToken(state: any, token: string) { //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
        state.token = token;
    },
    showLoading(state: any) {//显示加载动画
        state.showLoading = true;
    },
    hideLoading(state: any) {//隐藏加载动画
        state.showLoading = false;
    },
};
const actions: any = {
};

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {}
});
export default store;

