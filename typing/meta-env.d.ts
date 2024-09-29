interface ImportMetaEnv {
    readonly VITE_APP_VERSION: string;
    readonly VITE_APP_TITLE: string;
    readonly VITE_APP_ENV: string;
    readonly VITE_APP_BASE_API: string;
    readonly VITE_BUILD_COMPRESS: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
