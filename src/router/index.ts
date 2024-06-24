import Vue from 'vue';
import VueRouter from 'vue-router';
import { staticRoutes } from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'hash',
  routes: staticRoutes,
});

router.beforeEach((to, from, next) => {

});

router.afterEach(() => {

});

export default router;
