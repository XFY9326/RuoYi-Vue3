import request from "@/utils/request";

// 查询部门列表
export async function listDept(query) {
    return request({
        url: "/system/dept/list",
        method: "get",
        params: query,
    });
}

// 查询部门列表（排除节点）
export async function listDeptExcludeChild(deptId) {
    return request({
        url: "/system/dept/list/exclude/" + deptId,
        method: "get",
    });
}

// 查询部门详细
export async function getDept(deptId) {
    return request({
        url: "/system/dept/" + deptId,
        method: "get",
    });
}

// 新增部门
export async function addDept(data) {
    return request({
        url: "/system/dept",
        method: "post",
        data: data,
    });
}

// 修改部门
export async function updateDept(data) {
    return request({
        url: "/system/dept",
        method: "put",
        data: data,
    });
}

// 删除部门
export async function delDept(deptId) {
    return request({
        url: "/system/dept/" + deptId,
        method: "delete",
    });
}
