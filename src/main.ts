import "./style.css";

import { createApp } from "vue";
import App from "./App.vue";
const myApp = createApp(App);

import { Quasar } from "quasar";
// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";
// Import Quasar css
import "quasar/src/css/index.sass";
myApp.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
});

import router from "./router";
myApp.use(router);

import { createPinia } from "pinia";
const pinia = createPinia();
myApp.use(pinia);

myApp.mount("#app");
