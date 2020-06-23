import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/primevue'
import './assets/layout/layout.scss';

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
