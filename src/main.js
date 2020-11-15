import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import * as satellite from "satellite.js";
// import VueSplide from '@splidejs/vue-splide';
createApp(App)
  .use(store)
  .use(router)
  // .use(satellite)
  .mount("#app");
