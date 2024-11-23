import zipPack from "vite-plugin-zip-pack";

/**
 * 压缩打包
 * @param {Record<string, string>} env 环境变量
 * @returns {import("vite").PluginOption} 插件
 */
export default function createZipPack(env) {
    return zipPack({
        outFileName: `dist-${env.VITE_APP_ENV}.zip`,
    });
}
