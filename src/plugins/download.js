import axios from "axios";
import { ElLoading, ElMessage } from "element-plus";
import FileSaver, { saveAs } from "file-saver";
import { getToken } from "@/utils/auth";
import errorCode from "@/utils/errorCode";
import { blobValidate } from "@/utils/ruoyi";

const baseURL = import.meta.env.VITE_APP_BASE_API;
let downloadLoadingInstance;

/**
 * 下载文件
 * @param {string} url
 */
function download_file(url) {
    axios({
        method: "get",
        url: url,
        responseType: "blob",
        headers: { Authorization: "Bearer " + getToken() },
    }).then(res => {
        const isBlob = blobValidate(res.data);
        if (isBlob) {
            const blob = new Blob([res.data]);
            this.saveAs(blob, decodeURIComponent(res.headers["download-filename"]));
        } else {
            this.printErrMsg(res.data);
        }
    });
}

export default {
    /**
     * @param {string} name
     * @param {boolean} isDelete
     */
    name(name, isDelete = true) {
        let url = baseURL + "/common/download?fileName=" + encodeURIComponent(name) + "&delete=" + isDelete;
        download_file(url);
    },
    /**
     * @param {string} resource
     */
    resource(resource) {
        let url = baseURL + "/common/download/resource?resource=" + encodeURIComponent(resource);
        download_file(url);
    },
    /**
     * @param {string} url_path
     * @param {string} name
     */
    zip(url_path, name) {
        let url = baseURL + url_path;
        downloadLoadingInstance = ElLoading.service({ text: "正在下载数据，请稍候", background: "rgba(0, 0, 0, 0.7)" });
        axios({
            method: "get",
            url: url,
            responseType: "blob",
            headers: { Authorization: "Bearer " + getToken() },
        })
            .then(res => {
                const isBlob = blobValidate(res.data);
                if (isBlob) {
                    const blob = new Blob([res.data], { type: "application/zip" });
                    this.saveAs(blob, name);
                } else {
                    this.printErrMsg(res.data);
                }
                downloadLoadingInstance.close();
            })
            .catch(r => {
                console.error(r);
                ElMessage.error("下载文件出现错误，请联系管理员！");
                downloadLoadingInstance.close();
            });
    },
    /**
     * @param {Blob | string} text
     * @param {string} name
     * @param {import("file-saver").FileSaver.FileSaverOptions} opts
     */
    saveAs(text, name, opts) {
        saveAs(text, name, opts);
    },
    async printErrMsg(data) {
        const resText = await data.text();
        const rspObj = JSON.parse(resText);
        const errMsg = errorCode[rspObj.code] || rspObj.msg || errorCode["default"];
        ElMessage.error(errMsg);
    },
};
