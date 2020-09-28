import Vue from 'vue'
import App from './App.vue'
// import Tree from './components/tree';

Vue.config.productionTip = false;
new Vue({
  render: h => h(App),
}).$mount('#app');
// Tree.install(Vue);
