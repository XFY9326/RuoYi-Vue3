import vue from "@vitejs/plugin-vue";

import createAutoImport from "./auto-import";
import createSvgIcon from "./svg-icon";
import createCompression from "./compression";
import createSetupExtend from "./setup-extend";
import createElementPlusTypingCopy from "./element-plus-typing-copy";
import createZipPack from "./zip-pack";
import createLegacy from "./legacy.js";

/**
 * 配置 vite 插件
 * @param {Record<string, string>} env 环境变量
 * @param {boolean} isBuild 是否为打包模式
 * @returns {import("vite").PluginOption[]} vite 插件
 */
export default function createVitePlugins(env, isBuild = false) {
    const vitePlugins = [
        vue(),
        ...createAutoImport(),
        createSetupExtend(),
        createSvgIcon(),
        createElementPlusTypingCopy(),
    ];
    isBuild && vitePlugins.push(createLegacy());
    isBuild && vitePlugins.push(createZipPack(env));
    isBuild && vitePlugins.push(...createCompression(env));
    return vitePlugins;
}
