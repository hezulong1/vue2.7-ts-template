import Vue from 'vue';
import VueRouter from 'vue-router';
import { staticRoutes } from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'hash',
  base: import.meta.env.BASE_URL,
  routes: staticRoutes,
});

router.beforeEach((to, from, next) => {
  next();
});

router.afterEach(() => {

});

export default router;
