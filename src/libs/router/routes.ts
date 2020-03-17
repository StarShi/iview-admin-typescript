const routes: any = [
  {
    path: '/',
    redirect: '/admin/home',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import("@/views/login/login.vue"),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import("@/views/main/main.vue"),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import("@/views/home/home.vue"),
        meta: {
          title: '首页'
        }
      },
    ]
  },

];

export default routes