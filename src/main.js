import { createApp } from "vue";
import ElementPlus from "element-plus";
import "./style.css";
import "element-plus/dist/index.css";
import router from "@/router/index.js";
import App from "./App.vue";
import store from "@/vuex/index.js";
import "animate.css";
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import  locale   from "element-plus/es/locale/lang/zh-cn";

const app = createApp(App)
app.use(ElementPlus,{locale}).use(router).use(store).mount("#app");
// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}