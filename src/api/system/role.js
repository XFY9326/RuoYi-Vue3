import request from "@/utils/request";

// 查询角色列表
export async function listRole(query) {
    return request({
        url: "/system/role/list",
        method: "get",
        params: query,
    });
}

// 查询角色详细
export async function getRole(roleId) {
    return request({
        url: "/system/role/" + roleId,
        method: "get",
    });
}

// 新增角色
export async function addRole(data) {
    return request({
        url: "/system/role",
        method: "post",
        data: data,
    });
}

// 修改角色
export async function updateRole(data) {
    return request({
        url: "/system/role",
        method: "put",
        data: data,
    });
}

// 角色数据权限
export async function dataScope(data) {
    return request({
        url: "/system/role/dataScope",
        method: "put",
        data: data,
    });
}

// 角色状态修改
export async function changeRoleStatus(roleId, status) {
    const data = {
        roleId,
        status,
    };
    return request({
        url: "/system/role/changeStatus",
        method: "put",
        data: data,
    });
}

// 删除角色
export async function delRole(roleId) {
    return request({
        url: "/system/role/" + roleId,
        method: "delete",
    });
}

// 查询角色已授权用户列表
export async function allocatedUserList(query) {
    return request({
        url: "/system/role/authUser/allocatedList",
        method: "get",
        params: query,
    });
}

// 查询角色未授权用户列表
export async function unallocatedUserList(query) {
    return request({
        url: "/system/role/authUser/unallocatedList",
        method: "get",
        params: query,
    });
}

// 取消用户授权角色
export async function authUserCancel(data) {
    return request({
        url: "/system/role/authUser/cancel",
        method: "put",
        data: data,
    });
}

// 批量取消用户授权角色
export async function authUserCancelAll(data) {
    return request({
        url: "/system/role/authUser/cancelAll",
        method: "put",
        params: data,
    });
}

// 授权用户选择
export async function authUserSelectAll(data) {
    return request({
        url: "/system/role/authUser/selectAll",
        method: "put",
        params: data,
    });
}

// 根据角色ID查询部门树结构
export async function deptTreeSelect(roleId) {
    return request({
        url: "/system/role/deptTree/" + roleId,
        method: "get",
    });
}
