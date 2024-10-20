import request from "@/utils/request";

// 查询操作日志列表
export async function list(query) {
    return request({
        url: "/monitor/operlog/list",
        method: "get",
        params: query,
    });
}

// 删除操作日志
export async function delOperlog(operId) {
    return request({
        url: "/monitor/operlog/" + operId,
        method: "delete",
    });
}

// 清空操作日志
export async function cleanOperlog() {
    return request({
        url: "/monitor/operlog/clean",
        method: "delete",
    });
}
