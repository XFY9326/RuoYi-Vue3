// noinspection JSUnusedGlobalSymbols,SpellCheckingInspection

export {};

declare module "*.vue" {
    import type { DefineComponent } from "vue";
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

declare global {
    interface ImportMetaEnv {
        readonly VITE_APP_TITLE: string;
        readonly VITE_APP_ENV: string;
        readonly VITE_APP_BASE_API: string;
        readonly VITE_BUILD_COMPRESS: string;
    }

    interface ImportMeta {
        readonly env: ImportMetaEnv;
    }
}

declare module "vue" {
    export interface ComponentCustomProperties {
        useDict: (typeof import("@/utils/dict"))["useDict"];
        download: (typeof import("@/utils/request"))["download"];
        parseTime: (typeof import("@/utils/ruoyi"))["parseTime"];
        resetForm: (typeof import("@/utils/ruoyi"))["resetForm"];
        handleTree: (typeof import("@/utils/ruoyi"))["handleTree"];
        addDateRange: (typeof import("@/utils/ruoyi"))["addDateRange"];
        selectDictLabel: (typeof import("@/utils/ruoyi"))["selectDictLabel"];
        selectDictLabels: (typeof import("@/utils/ruoyi"))["selectDictLabels"];

        $tab: (typeof import("@/plugins/tab"))["default"];
        $auth: (typeof import("@/plugins/auth"))["default"];
        $cache: (typeof import("@/plugins/cache"))["default"];
        $modal: (typeof import("@/plugins/modal"))["default"];
        $download: (typeof import("@/plugins/download"))["default"];
    }
}
