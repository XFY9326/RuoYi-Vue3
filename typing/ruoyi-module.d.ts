// noinspection JSUnusedGlobalSymbols

import { useDict } from "@/utils/dict";
import { download } from "@/utils/request";
import { addDateRange, handleTree, parseTime, resetForm, selectDictLabel, selectDictLabels } from "@/utils/ruoyi";

import pluginTab from "@/plugins/tab";
import pluginAuth from "@/plugins/auth";
import pluginCache from "@/plugins/cache";
import pluginModal from "@/plugins/modal";
import pluginDownload from "@/plugins/download";

declare module "vue" {
    export interface ComponentCustomProperties {
        useDict: typeof useDict;
        download: typeof download;
        parseTime: typeof parseTime;
        resetForm: typeof resetForm;
        handleTree: typeof handleTree;
        addDateRange: typeof addDateRange;
        selectDictLabel: typeof selectDictLabel;
        selectDictLabels: typeof selectDictLabels;

        $tab: typeof pluginTab;
        $auth: typeof pluginAuth;
        $cache: typeof pluginCache;
        $modal: typeof pluginModal;
        $download: typeof pluginDownload;
    }
}
