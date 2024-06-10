import autoImport from "unplugin-auto-import/vite";
import autoImportComponents from "unplugin-vue-components/vite";
import path from "path";

export default function createAutoImport() {
    return [
        autoImport({
            imports: ["vue", "vue-router", "pinia"],
            dts: path.resolve(process.cwd(), "./typing/auto-import.d.ts"),
        }),
        autoImportComponents({
            dts: path.resolve(process.cwd(), "./typing/auto-import-components.d.ts"),
        }),
    ];
}
