import { ElLoading, ElMessage, ElMessageBox, ElNotification } from "element-plus";

let loadingInstance;

export default {
    /**
     * 消息提示
     * @param {import("element-plus").MessageParamsWithType} content
     * @returns {import("element-plus").MessageHandler}
     */
    msg(content) {
        return ElMessage.info(content);
    },
    /**
     * 错误消息
     * @param {import("element-plus").MessageParamsWithType} content
     * @returns {import("element-plus").MessageHandler}
     */
    msgError(content) {
        return ElMessage.error(content);
    },
    /**
     * 成功消息
     * @param {import("element-plus").MessageParamsWithType} content
     * @returns {import("element-plus").MessageHandler}
     */
    msgSuccess(content) {
        return ElMessage.success(content);
    },
    /**
     * 警告消息
     * @param {import("element-plus").MessageParamsWithType} content
     * @returns {import("element-plus").MessageHandler}
     */
    msgWarning(content) {
        return ElMessage.warning(content);
    },
    /**
     * 弹出提示
     * @param {import("element-plus").ElMessageBoxOptions["message"]} content
     * @returns {Promise<import("element-plus").MessageBoxData>}
     */
    alert(content) {
        return ElMessageBox.alert(content, "系统提示");
    },
    /**
     * 错误提示
     * @param {import("element-plus").ElMessageBoxOptions["message"]} content
     * @returns {Promise<import("element-plus").MessageBoxData>}
     */
    alertError(content) {
        return ElMessageBox.alert(content, "系统提示", { type: "error" });
    },
    /**
     * 成功提示
     * @param {import("element-plus").ElMessageBoxOptions["message"]} content
     * @returns {Promise<import("element-plus").MessageBoxData>}
     */
    alertSuccess(content) {
        return ElMessageBox.alert(content, "系统提示", { type: "success" });
    },
    /**
     * 警告提示
     * @param {import("element-plus").ElMessageBoxOptions["message"]} content
     * @returns {Promise<import("element-plus").MessageBoxData>}
     */
    alertWarning(content) {
        return ElMessageBox.alert(content, "系统提示", { type: "warning" });
    },
    /**
     * 通知提示
     * @param {import("element-plus").NotificationParamsTyped} content
     * @returns {import("element-plus").NotificationHandle}
     */
    notify(content) {
        return ElNotification.info(content);
    },
    /**
     * 错误通知
     * @param {import("element-plus").NotificationParamsTyped} content
     * @returns {import("element-plus").NotificationHandle}
     */
    notifyError(content) {
        return ElNotification.error(content);
    },
    /**
     * 成功通知
     * @param {import("element-plus").NotificationParamsTyped} content
     * @returns {import("element-plus").NotificationHandle}
     */
    notifySuccess(content) {
        return ElNotification.success(content);
    },
    /**
     * 警告通知
     * @param {import("element-plus").NotificationParamsTyped} content
     * @returns {import("element-plus").NotificationHandle}
     */
    notifyWarning(content) {
        return ElNotification.warning(content);
    },
    /**
     * 确认窗体
     * @param {import("element-plus").ElMessageBoxOptions["message"]} content
     * @returns {Promise<import("element-plus").MessageBoxData>}
     */
    confirm(content) {
        return ElMessageBox.confirm(content, "系统提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
        });
    },
    /**
     * 提交内容
     * @param {import("element-plus").ElMessageBoxOptions["message"]} content
     * @returns {Promise<import("element-plus").MessageBoxData>}
     */
    prompt(content) {
        return ElMessageBox.prompt(content, "系统提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
        });
    },
    /**
     * 打开遮罩层
     * @param {import("vue").MaybeRef<string>} content
     */
    loading(content) {
        loadingInstance = ElLoading.service({
            lock: true,
            text: content,
            background: "rgba(0, 0, 0, 0.7)",
        });
    },
    // 关闭遮罩层
    closeLoading() {
        loadingInstance.close();
    },
};
