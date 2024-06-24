import '@/styles/index.scss';

import Vue from 'vue';
// Setup
import router from './router';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
