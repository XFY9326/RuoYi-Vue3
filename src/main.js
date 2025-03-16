import { createApp } from "vue";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";

import "@/assets/styles/index.scss"; // global css
import App from "./App";
import store from "./store";
import router from "./router";
import directive from "./directive"; // directive
// 注册指令
import plugins from "./plugins"; // plugins
import { download } from "@/utils/request";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import "./permission"; // permission control
import { useDict } from "@/utils/dict";
import { addDateRange, handleTree, parseTime, resetForm, selectDictLabel, selectDictLabels } from "@/utils/ruoyi";

const app = createApp(App);

// 全局方法挂载
app.config.globalProperties.useDict = useDict;
app.config.globalProperties.download = download;
app.config.globalProperties.parseTime = parseTime;
app.config.globalProperties.resetForm = resetForm;
app.config.globalProperties.handleTree = handleTree;
app.config.globalProperties.addDateRange = addDateRange;
app.config.globalProperties.selectDictLabel = selectDictLabel;
app.config.globalProperties.selectDictLabels = selectDictLabels;

app.use(router);
app.use(store);
app.use(plugins);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.use(ElementPlus);

directive(app);

app.mount("#app");
