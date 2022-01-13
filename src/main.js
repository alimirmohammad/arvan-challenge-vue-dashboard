import Vue from "vue";
import { BootstrapVue } from "bootstrap-vue";
import "./utils/validation";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./app.scss";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
