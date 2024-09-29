import zipPack from "vite-plugin-zip-pack";

/**
 * @param env {Record<string, string>}
 * @returns {import("vite").PluginOption}
 */
export default function createZipPack(env) {
    return zipPack({
        outFileName: `dist-${env.VITE_APP_ENV}.zip`,
    });
}
