import { createApp } from "vue";
import "nprogress/nprogress.css";
import App from "./App.vue";
import "ol/ol.css";
import "lib-flexible/flexible.js";
import router from "./router";
createApp(App).use(router).mount("#app");
