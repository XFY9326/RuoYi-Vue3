import path from "path";
import fs from "fs/promises";

const dtsHeaderComment = `/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// noinspection JSUnusedGlobalSymbols
// Generated by element-plus-typing-copy
`;

async function copyDTS(sourcePath, targetPath) {
    try {
        await fs.access(sourcePath, fs.constants.R_OK);

        let dtsContent = await fs.readFile(sourcePath, "utf8");
        let outputCode = dtsHeaderComment + dtsContent.replace("@vue/runtime-core", "vue");

        await fs.writeFile(targetPath, outputCode);
    } catch (ignored) {}
}

/**
 *
 * @returns {import("vite").Plugin | import("vite").PluginHooks}
 */
export default function createElementPlusTypingCopy() {
    return {
        name: "element-plus-typing-copy",
        enforce: "pre",
        buildStart() {
            let dtsPath = path.resolve(process.cwd(), "./node_modules/element-plus/global.d.ts");
            let targetPath = path.resolve(process.cwd(), "./typing/element-plus-global.d.ts");
            // noinspection JSIgnoredPromiseFromCall
            copyDTS(dtsPath, targetPath);
        },
    };
}
