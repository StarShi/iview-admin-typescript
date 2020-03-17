import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';
// import store from '@/libs/store';
import selfSDK from '@/assets/script/selfSDK';

Vue.use(Router);

const router = new Router({routes});
/* eslint-disable */
router.beforeEach((to, from, next) => {
    next();
});
router.afterEach((to, from) => {
    if (to.meta.title) {//配置路由标题
        let title:string = process.env.NODE_ENV === "production" ? to.meta.title : to.meta.title + 'test';
        selfSDK.setPageTitle(title);//设置页面标题
    }
});
export default router;
