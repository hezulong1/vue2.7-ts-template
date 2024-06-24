import Vue from 'vue';
import VueRouter, { type RouteConfig } from 'vue-router';

import { useData } from '@/store';
// import service from '@/utils/https';
// import service from '@/utils/https-external';
// import { catchParamsConfig } from '@/utils/commonmethods';
import { isMobile } from '@/utils/browser';
import Empty from '@/pages/display-desktop/empty.vue';

Vue.use(VueRouter);

export const staticRoutes: RouteConfig[] = [
  {
    name: 'Root',
    path: '/a',
    component: Empty,
    meta: { title: '403', nonav: true, nohead: true },
  },
  // {
  //   name: 'Noauth',
  //   path: '/noauth',
  //   component: () => import('@/pages/exception/noauth.vue'),
  //   meta: { title: '403', nonav: true, nohead: true },
  // },
  // {
  //   name: 'Desktop',
  //   path: '/pc/:id',
  //   component: () => import('@/pages/display-desktop/index.vue'),
  //   meta: { title: '切片浏览', nonav: true, nohead: true },
  // },
  // {
  //   name: 'Mobile',
  //   path: '/mobile/:id',
  //   component: () => import('@/pages/display/mobile.vue'),
  //   meta: { title: '切片浏览', nonav: true, nohead: true },
  // },
  // {
  //   name: 'Splitter',
  //   path: '/splitter/:ids',
  //   component: () => import('@/pages/display/splitter.vue'),
  //   meta: { title: '分屏浏览浏览', nonav: true, nohead: true },
  // },
];

if (import.meta.env.RENWEI) {
  staticRoutes.forEach((r) => {
    r.path = `/${import.meta.env.RENWEI}${r.path}`;
  });
}

const router = new VueRouter({
  mode: 'history',
  routes: staticRoutes,
});

const data = useData();

router.beforeEach((to, from, next) => {
  if (to.query.userAuth && to.query.cname) {
    localStorage[to.query.cname + '-qpUserAuth'] = to.query.userAuth;

    if (import.meta.env.PROD) {
      delete to.query['userAuth'];
    }

    next({
      path: to.path,
      query: to.query,
    });
  }

  // Object.keys(catchParamsConfig).forEach((item) => {
  //   if (item in to.query) {
  //     catchParamsConfig[item].catchValue(to.query[item]);
  //     if (catchParamsConfig[item].exclude) delete to.query[item];
  //   } else {
  //     catchParamsConfig[item].noValue?.();
  //   }
  // });

  if (typeof to.query.lang === 'string') {
    if (data.localeName.value !== to.query.lang) {
      data.localeName.value = to.query.lang;
    }

    // service.defaults.params.lang = lang;
    // service.defaults.params.lang = lang;
  }

  if (to.name === 'IndexMobile') {
    let force = to.query.force || '';
    if (force !== 'mobile' && (!isMobile)) { // 自动跳转pc
      let jump = to.fullPath.replace('mobile', 'pc');
      data.displayAsMobile.value = false;
      next({
        path: jump,
      });
    } else {
      next();
    }
  } else if (to.name === 'IndexPc') {
    let force = to.query.force || '';
    if (force !== 'pc' && isMobile) { // 自动跳转mobile
      let jump = to.fullPath.replace('pc', 'mobile');
      data.displayAsMobile.value = true;
      next({
        path: jump,
      });
    } else {
      next();
    }
  } else {
    next();
  }

  document.body.className = to.meta?.bodyclass ?? '';
});

export default router;
