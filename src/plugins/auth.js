import useUserStore from "@/store/modules/user";

/**
 * @param {string} permission
 * @returns {boolean}
 */
function authPermission(permission) {
    const all_permission = "*:*:*";
    const permissions = useUserStore().permissions;
    if (permission && permission.length > 0) {
        return permissions.some(v => {
            return all_permission === v || v === permission;
        });
    } else {
        return false;
    }
}

/**
 * @param {string} permission
 * @returns {boolean}
 */
function authRole(role) {
    const super_admin = "admin";
    const roles = useUserStore().roles;
    if (role && role.length > 0) {
        return roles.some(v => {
            return super_admin === v || v === role;
        });
    } else {
        return false;
    }
}

export default {
    /**
     * 验证用户是否具备某权限
     * @param {string} permission
     * @returns {boolean}
     */
    hasPermi(permission) {
        return authPermission(permission);
    },
    /**
     * 验证用户是否含有指定权限，只需包含其中一个
     * @param {string[]} permissions
     * @returns {boolean}
     */
    hasPermiOr(permissions) {
        return permissions.some(item => {
            return authPermission(item);
        });
    },
    /**
     * 验证用户是否含有指定权限，必须全部拥有
     * @param {string[]} permissions
     * @returns {boolean}
     */
    hasPermiAnd(permissions) {
        return permissions.every(item => {
            return authPermission(item);
        });
    },
    /**
     * 验证用户是否具备某角色
     * @param {string} role
     * @returns {boolean}
     */
    hasRole(role) {
        return authRole(role);
    },
    /**
     * 验证用户是否含有指定角色，只需包含其中一个
     * @param {string[]} roles
     * @returns {boolean}
     */
    hasRoleOr(roles) {
        return roles.some(item => {
            return authRole(item);
        });
    },
    /**
     * 验证用户是否含有指定角色，必须全部拥有
     * @param {string[]} roles
     * @returns {boolean}
     */
    hasRoleAnd(roles) {
        return roles.every(item => {
            return authRole(item);
        });
    },
};
