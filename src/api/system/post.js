import request from "@/utils/request";

// 查询岗位列表
export async function listPost(query) {
    return request({
        url: "/system/post/list",
        method: "get",
        params: query,
    });
}

// 查询岗位详细
export async function getPost(postId) {
    return request({
        url: "/system/post/" + postId,
        method: "get",
    });
}

// 新增岗位
export async function addPost(data) {
    return request({
        url: "/system/post",
        method: "post",
        data: data,
    });
}

// 修改岗位
export async function updatePost(data) {
    return request({
        url: "/system/post",
        method: "put",
        data: data,
    });
}

// 删除岗位
export async function delPost(postId) {
    return request({
        url: "/system/post/" + postId,
        method: "delete",
    });
}
