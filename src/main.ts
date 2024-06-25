import '@/styles/index.scss';

import Vue from 'vue';
// Setup
import router from './router';
import i18n from './utils/i18n';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  router,
  i18n,
  render: h => h(App),
}).$mount('#app');
