import useUserStore from "@/store/modules/user";

/**
 * 字符权限校验
 * @param {Array} value 校验值
 * @returns {Boolean}
 */
export function checkPermi(value) {
    if (value && value instanceof Array && value.length > 0) {
        const permissions = useUserStore().permissions;
        const permissionData = value;
        const all_permission = "*:*:*";

        return permissions.some(permission => {
            return all_permission === permission || permissionData.includes(permission);
        });
    } else {
        console.error(`need roles! Like checkPermi="['system:user:add','system:user:edit']"`);
        return false;
    }
}

/**
 * 角色权限校验
 * @param {Array} value 校验值
 * @returns {Boolean}
 */
export function checkRole(value) {
    if (value && value instanceof Array && value.length > 0) {
        const roles = useUserStore().roles;
        const permissionRoles = value;
        const super_admin = "admin";

        return roles.some(role => {
            return super_admin === role || permissionRoles.includes(role);
        });
    } else {
        console.error(`need roles! Like checkRole="['admin','editor']"`);
        return false;
    }
}
