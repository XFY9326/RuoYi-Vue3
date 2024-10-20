import request from "@/utils/request";

// 查询在线用户列表
export async function list(query) {
    return request({
        url: "/monitor/online/list",
        method: "get",
        params: query,
    });
}

// 强退用户
export async function forceLogout(tokenId) {
    return request({
        url: "/monitor/online/" + tokenId,
        method: "delete",
    });
}
