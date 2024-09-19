import UnpluginSvgComponent from "unplugin-svg-component/vite";
import path from "path";

export default function createSvgIcon() {
    return UnpluginSvgComponent({
        componentName: "SvgComponent",
        iconDir: path.resolve(process.cwd(), "src/assets/icons/svg/"),
        dts: true,
        dtsDir: path.resolve(process.cwd(), "typing/"),
        treeShaking: false,
    });
}
