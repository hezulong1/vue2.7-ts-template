import { type RouteConfig } from 'vue-router';
import Home from '@/layouts/home.vue';

export const staticRoutes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    component: Home,
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
