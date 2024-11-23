import { compression } from "vite-plugin-compression2";

/**
 * 创建压缩插件
 * @param {Record<string, string>} env 环境变量
 * @returns {import("vite").PluginOption[]} 插件
 */
export default function createCompression(env) {
    const { VITE_BUILD_COMPRESS } = env;
    const plugin = [];
    if (VITE_BUILD_COMPRESS) {
        const compressList = VITE_BUILD_COMPRESS.split(",");
        if (compressList.includes("gzip")) {
            // http://doc.ruoyi.vip/ruoyi-vue/other/faq.html#使用gzip解压缩静态文件
            plugin.push(
                compression({
                    algorithm: "gzip",
                    deleteOriginalAssets: false,
                    skipIfLargerOrEqual: true,
                })
            );
        }
        if (compressList.includes("brotli")) {
            plugin.push(
                compression({
                    algorithm: "brotliCompress",
                    deleteOriginalAssets: false,
                    skipIfLargerOrEqual: true,
                })
            );
        }
    }
    return plugin;
}
