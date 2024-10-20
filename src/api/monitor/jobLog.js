import request from "@/utils/request";

// 查询调度日志列表
export async function listJobLog(query) {
    return request({
        url: "/monitor/jobLog/list",
        method: "get",
        params: query,
    });
}

// 删除调度日志
export async function delJobLog(jobLogId) {
    return request({
        url: "/monitor/jobLog/" + jobLogId,
        method: "delete",
    });
}

// 清空调度日志
export async function cleanJobLog() {
    return request({
        url: "/monitor/jobLog/clean",
        method: "delete",
    });
}
