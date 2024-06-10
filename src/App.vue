<template>
    <el-config-provider :locale="locale" :size="size">
        <router-view />
    </el-config-provider>
</template>

<script setup>
import useSettingsStore from "@/store/modules/settings";
import { handleThemeStyle } from "@/utils/theme";
import { ElConfigProvider } from "element-plus";
import Cookies from "js-cookie";
import locale from "element-plus/es/locale/lang/zh-cn";

const size = ref(Cookies.get("size") || "default");

onMounted(() => {
    nextTick(() => {
        // 初始化主题样式
        handleThemeStyle(useSettingsStore().theme);
    });
});
</script>
