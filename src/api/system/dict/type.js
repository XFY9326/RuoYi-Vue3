import request from "@/utils/request";

// 查询字典类型列表
export async function listType(query) {
    return request({
        url: "/system/dict/type/list",
        method: "get",
        params: query,
    });
}

// 查询字典类型详细
export async function getType(dictId) {
    return request({
        url: "/system/dict/type/" + dictId,
        method: "get",
    });
}

// 新增字典类型
export async function addType(data) {
    return request({
        url: "/system/dict/type",
        method: "post",
        data: data,
    });
}

// 修改字典类型
export async function updateType(data) {
    return request({
        url: "/system/dict/type",
        method: "put",
        data: data,
    });
}

// 删除字典类型
export async function delType(dictId) {
    return request({
        url: "/system/dict/type/" + dictId,
        method: "delete",
    });
}

// 刷新字典缓存
export async function refreshCache() {
    return request({
        url: "/system/dict/type/refreshCache",
        method: "delete",
    });
}

// 获取字典选择框列表
export async function optionselect() {
    return request({
        url: "/system/dict/type/optionselect",
        method: "get",
    });
}
