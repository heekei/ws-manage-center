import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title: '首页',
      },
      component: () => import(/* webpackChunkName: "about" */ './views/Home.vue'),
    },
    {
      path: '/keyword',
      name: 'keyword',
      meta: {
        title: '关键字配置',
      },
      component: () => import(/* webpackChunkName: "about" */ './views/Keyword.vue'),
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        title: '关于',
      },
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = `${to.meta.title} - Rankup控制面板`;
    // document.title = to.meta.title;
  }
  next();
});
export default router;
