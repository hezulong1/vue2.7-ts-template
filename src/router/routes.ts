import type { RouteConfig } from 'vue-router';
import { defineComponent, h } from 'vue';
import Home from '@/layouts/home.vue';

export const staticRoutes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    component: Home,
  },
  {
    name: 'About',
    path: '/a',
    component: defineComponent({
      render() {
        return h('div', {}, 'About');
      },
    }),
  },
];
