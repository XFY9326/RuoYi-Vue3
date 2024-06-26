import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from "path";

export default function createAutoImport() {
    return [
        AutoImport({
            imports: ["vue", "vue-router", "pinia"],
            resolvers: [ElementPlusResolver()],
            dts: path.resolve(process.cwd(), "./typing/auto-import.d.ts"),
        }),
        Components({
            resolvers: [ElementPlusResolver()],
            dts: path.resolve(process.cwd(), "./typing/auto-import-components.d.ts"),
        }),
    ];
}
