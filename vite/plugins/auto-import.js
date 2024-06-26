import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import path from "path";

export default function createAutoImport() {
    return [
        AutoImport({
            imports: ["vue", "vue-router", "pinia"],
            dts: path.resolve(process.cwd(), "./typing/auto-import.d.ts"),
        }),
        Components({
            dts: path.resolve(process.cwd(), "./typing/auto-import-components.d.ts"),
        }),
    ];
}
