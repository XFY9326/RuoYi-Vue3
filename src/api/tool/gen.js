import request from "@/utils/request";

// 查询生成表数据
export async function listTable(query) {
    return request({
        url: "/tool/gen/list",
        method: "get",
        params: query,
    });
}

// 查询db数据库列表
export async function listDbTable(query) {
    return request({
        url: "/tool/gen/db/list",
        method: "get",
        params: query,
    });
}

// 查询表详细信息
export async function getGenTable(tableId) {
    return request({
        url: "/tool/gen/" + tableId,
        method: "get",
    });
}

// 修改代码生成信息
export async function updateGenTable(data) {
    return request({
        url: "/tool/gen",
        method: "put",
        data: data,
    });
}

// 导入表
export async function importTable(data) {
    return request({
        url: "/tool/gen/importTable",
        method: "post",
        params: data,
    });
}

// 创建表
export async function createTable(data) {
    return request({
        url: "/tool/gen/createTable",
        method: "post",
        params: data,
    });
}

// 预览生成代码
export async function previewTable(tableId) {
    return request({
        url: "/tool/gen/preview/" + tableId,
        method: "get",
    });
}

// 删除表数据
export async function delTable(tableId) {
    return request({
        url: "/tool/gen/" + tableId,
        method: "delete",
    });
}

// 生成代码（自定义路径）
export async function genCode(tableName) {
    return request({
        url: "/tool/gen/genCode/" + tableName,
        method: "get",
    });
}

// 同步数据库
export async function synchDb(tableName) {
    return request({
        url: "/tool/gen/synchDb/" + tableName,
        method: "get",
    });
}
