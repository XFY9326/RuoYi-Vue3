import UnpluginSvgComponent from "unplugin-svg-component/vite";
import path from "path";

/**
 * 创建 svg 图标插件
 * @returns {import("vite").PluginOption} vite 插件
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
