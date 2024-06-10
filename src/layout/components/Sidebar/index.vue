<template>
    <div
        :class="{ 'has-logo': showLogo }"
        :style="{
            backgroundColor: sideTheme === 'theme-dark' ? menuBackground : menuLightBackground,
        }"
    >
        <logo v-if="showLogo" :collapse="isCollapse" />
        <el-scrollbar :class="sideTheme" wrap-class="scrollbar-wrapper">
            <el-menu
                :active-text-color="theme"
                :background-color="sideTheme === 'theme-dark' ? menuBackground : menuLightBackground"
                :collapse="isCollapse"
                :collapse-transition="false"
                :default-active="activeMenu"
                :text-color="sideTheme === 'theme-dark' ? menuColor : menuLightColor"
                :unique-opened="true"
                mode="vertical"
            >
                <sidebar-item
                    v-for="(route, index) in sidebarRouters"
                    :key="route.path + index"
                    :base-path="route.path"
                    :item="route"
                />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script setup>
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/assets/styles/variables.module.scss";
import useAppStore from "@/store/modules/app";
import useSettingsStore from "@/store/modules/settings";
import usePermissionStore from "@/store/modules/permission";
import { useRoute } from "vue-router";

const route = useRoute();
const appStore = useAppStore();
const settingsStore = useSettingsStore();
const permissionStore = usePermissionStore();

const { menuColor, menuLightColor, menuBackground, menuLightBackground } = variables;

const sidebarRouters = computed(() => permissionStore.sidebarRouters);
const showLogo = computed(() => settingsStore.sidebarLogo);
const sideTheme = computed(() => settingsStore.sideTheme);
const theme = computed(() => settingsStore.theme);
const isCollapse = computed(() => !appStore.sidebar.opened);

const activeMenu = computed(() => {
    const { meta, path } = route;
    // if set path, the sidebar will highlight the path you set
    if (meta.activeMenu) {
        return meta.activeMenu;
    }
    return path;
});
</script>
