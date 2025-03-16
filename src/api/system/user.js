import request from "@/utils/request";
import { parseStrEmpty } from "@/utils/ruoyi";

// 查询用户列表
export async function listUser(query) {
    return request({
        url: "/system/user/list",
        method: "get",
        params: query,
    });
}

// 查询用户详细
export async function getUser(userId) {
    return request({
        url: "/system/user/" + parseStrEmpty(userId),
        method: "get",
    });
}

// 新增用户
export async function addUser(data) {
    return request({
        url: "/system/user",
        method: "post",
        data: data,
    });
}

// 修改用户
export async function updateUser(data) {
    return request({
        url: "/system/user",
        method: "put",
        data: data,
    });
}

// 删除用户
export async function delUser(userId) {
    return request({
        url: "/system/user/" + userId,
        method: "delete",
    });
}

// 用户密码重置
export async function resetUserPwd(userId, password) {
    const data = {
        userId,
        password,
    };
    return request({
        url: "/system/user/resetPwd",
        method: "put",
        data: data,
    });
}

// 用户状态修改
export async function changeUserStatus(userId, status) {
    const data = {
        userId,
        status,
    };
    return request({
        url: "/system/user/changeStatus",
        method: "put",
        data: data,
    });
}

// 查询用户个人信息
export async function getUserProfile() {
    return request({
        url: "/system/user/profile",
        method: "get",
    });
}

// 修改用户个人信息
export async function updateUserProfile(data) {
    return request({
        url: "/system/user/profile",
        method: "put",
        data: data,
    });
}

// 用户密码重置
export async function updateUserPwd(oldPassword, newPassword) {
    const data = {
        oldPassword,
        newPassword,
    };
    return request({
        url: "/system/user/profile/updatePwd",
        method: "put",
        data: data,
    });
}

// 用户头像上传
export async function uploadAvatar(data) {
    return request({
        url: "/system/user/profile/avatar",
        method: "post",
        data: data,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

// 查询授权角色
export async function getAuthRole(userId) {
    return request({
        url: "/system/user/authRole/" + userId,
        method: "get",
    });
}

// 保存授权角色
export async function updateAuthRole(data) {
    return request({
        url: "/system/user/authRole",
        method: "put",
        params: data,
    });
}

// 查询部门下拉树结构
export async function deptTreeSelect() {
    return request({
        url: "/system/user/deptTree",
        method: "get",
    });
}
