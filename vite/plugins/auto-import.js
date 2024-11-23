import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import path from "path";

/**
 * 配置自动导入依赖
 * @returns {import("vite").PluginOption[]}
 */
export default function createAutoImport() {
    return [
        AutoImport({
            imports: ["vue", "vue-router", "pinia"],
            dts: path.resolve(process.cwd(), "./typing/generated/auto-import.d.ts"),
        }),
        Components({
            dts: path.resolve(process.cwd(), "./typing/generated/auto-import-components.d.ts"),
        }),
    ];
}
