import defaultSettings from "@/settings";
import { useDark, useToggle } from "@vueuse/core";
import { useDynamicTitle } from "@/utils/dynamicTitle";

const isDark = useDark();
const toggleDark = useToggle(isDark);

const { sideTheme, showSettings, topNav, tagsView, fixedHeader, sidebarLogo, dynamicTitle } = defaultSettings;

/**
 * @type {DefaultSettings}
 */
const storageSetting = JSON.parse(localStorage.getItem("layout-setting")) || {};

const useSettingsStore = defineStore("settings", {
    /**
     * @returns {DefaultSettings}
     */
    state: () => ({
        title: "",
        theme: storageSetting.theme || "#409EFF",
        sideTheme: storageSetting.sideTheme || sideTheme,
        showSettings: showSettings,
        topNav: storageSetting.topNav === undefined ? topNav : storageSetting.topNav,
        tagsView: storageSetting.tagsView === undefined ? tagsView : storageSetting.tagsView,
        fixedHeader: storageSetting.fixedHeader === undefined ? fixedHeader : storageSetting.fixedHeader,
        sidebarLogo: storageSetting.sidebarLogo === undefined ? sidebarLogo : storageSetting.sidebarLogo,
        dynamicTitle: storageSetting.dynamicTitle === undefined ? dynamicTitle : storageSetting.dynamicTitle,
        isDark: isDark.value,
    }),
    /**
     * @mixin DefaultSettings
     */
    actions: {
        /**
         * 修改布局设置
         * @param {{key: string, value: any}} data
         */
        changeSetting(data) {
            const { key, value } = data;
            if (this.hasOwnProperty(key)) {
                this[key] = value;
            }
        },
        /**
         * 设置网页标题
         * @param {string} title
         */
        setTitle(title) {
            this.title = title;
            useDynamicTitle();
        },
        /**
         * 切换暗黑模式
         */
        toggleTheme() {
            this.isDark = !this.isDark;
            toggleDark();
        },
    },
});

export default useSettingsStore;
