import vue from "@vitejs/plugin-vue";

import createAutoImport from "./auto-import";
import createSvgIcon from "./svg-icon";
import createCompression from "./compression";
import createSetupExtend from "./setup-extend";
import createElementPlusTypingCopy from "./element-plus-typing-copy";
import createZipPack from "./zip-pack";

/**
 * @param {Record<string, string>} viteEnv
 * @param {boolean} isBuild 
 * @returns {import("vite").Plugin<any>[]}
 */
export default function createVitePlugins(viteEnv, isBuild = false) {
    const vitePlugins = [
        vue(),
        ...createAutoImport(),
        createSetupExtend(),
        createSvgIcon(isBuild),
        createElementPlusTypingCopy(),
    ];
    isBuild && vitePlugins.push(createZipPack(viteEnv));
    isBuild && vitePlugins.push(...createCompression(viteEnv));
    return vitePlugins;
}
