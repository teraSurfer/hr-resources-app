import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import HrEventBus from './plugins/HrEventBus';
import './plugins/bootstrapVue';
import './plugins/fontawesome';
import './plugins/aws';

Vue.use(HrEventBus);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
