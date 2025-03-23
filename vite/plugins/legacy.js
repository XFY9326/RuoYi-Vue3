import legacy from "@vitejs/plugin-legacy";

/**
 * 配置 legacy 插件
 * @returns {import("vite").PluginOption[]} vite插件
 */
export default function createLegacy() {
    return legacy({
        targets: ["edge>=79", "firefox>=67", "chrome>=64"],
    });
}
