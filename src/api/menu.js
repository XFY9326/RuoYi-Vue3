import request from "@/utils/request";

// 获取路由
export const getRouters = async () => {
    return request({
        url: "/getRouters",
        method: "get",
    });
};
