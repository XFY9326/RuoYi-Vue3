import zipPack from "vite-plugin-zip-pack";

export default function createZipPack(env) {
    return zipPack({
        outFileName: `dist-${env.VITE_APP_ENV}.zip`,
    });
}
