import { createApp } from "vue";
import Antd from "ant-design-vue";
import App from "./App.vue";

import "normalize.css";
import "./assets/main.less";

createApp(App).use(Antd).mount("#app");
