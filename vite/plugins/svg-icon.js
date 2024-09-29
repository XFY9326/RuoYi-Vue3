import UnpluginSvgComponent from "unplugin-svg-component/vite";
import path from "path";

/**
 * @returns {import("vite").PluginOption}
 */
export default function createSvgIcon() {
    return UnpluginSvgComponent({
        componentName: "SvgComponent",
        iconDir: path.resolve(process.cwd(), "src/assets/icons/svg/"),
        dts: true,
        dtsDir: path.resolve(process.cwd(), "typing/generated/"),
        treeShaking: false,
    });
}
