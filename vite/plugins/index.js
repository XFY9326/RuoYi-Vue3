import vue from "@vitejs/plugin-vue";

import createAutoImport from "./auto-import";
import createSvgIcon from "./svg-icon";
import createCompression from "./compression";
import createSetupExtend from "./setup-extend";
import createElementPlusTypingCopy from "./element-plus-typing-copy";
import createZipPack from "./zip-pack";

/**
 * @param {Record<string, string>} env
 * @param {boolean} isBuild
 * @returns {import("vite").PluginOption[]}
 */
export default function createVitePlugins(env, isBuild = false) {
    const vitePlugins = [
        vue(),
        ...createAutoImport(),
        createSetupExtend(),
        createSvgIcon(),
        createElementPlusTypingCopy(),
    ];
    isBuild && vitePlugins.push(createZipPack(env));
    isBuild && vitePlugins.push(...createCompression(env));
    return vitePlugins;
}
