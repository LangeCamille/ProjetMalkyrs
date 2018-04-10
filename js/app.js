import TheApp from './composants/TheApp.vue';
import store from './store';

new Vue({
  el: '#app',
  store,
  template: '<TheApp/>',
  components: { TheApp }
});
