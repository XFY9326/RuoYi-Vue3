import request from "@/utils/request";

// 获取服务信息
export async function getServer() {
    return request({
        url: "/monitor/server",
        method: "get",
    });
}
