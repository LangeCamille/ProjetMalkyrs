import App from './composants/App.vue';
import store from "./store";

new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
});
