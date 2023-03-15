import { createApp } from "vue";
import ElementPlus from "element-plus";
import "./style.css";
import "element-plus/dist/index.css";
import router from "@/router/index.js";
import App from "./App.vue";
import store from "@/vuex/index.js";
import "animate.css";

createApp(App).use(ElementPlus).use(router).use(store).mount("#app");
