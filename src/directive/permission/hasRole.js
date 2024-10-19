/**
 * v-hasRole 角色权限处理
 * Copyright (c) 2019 ruoyi
 */

import useUserStore from "@/store/modules/user";

/**
 * @typedef {import("vue").DirectiveBinding<Array<string>, Array<string>, "parent">} hasRoleBinding
 * @type {import("vue").Directive}
 */
export default {
    /**
     * @param {HTMLElement} el
     * @param {hasRoleBinding} binding
     * @param {import("vue").VNode} vnode
     */
    mounted(el, binding, vnode) {
        const { value, _, arg } = binding;
        const super_admin = "admin";
        const roles = useUserStore().roles;

        if (value && value instanceof Array && value.length > 0) {
            const roleFlag = value;

            const hasRole = roles.some(role => {
                return super_admin === role || roleFlag.includes(role);
            });

            if (!hasRole) {
                if (arg === "parent") {
                    el.parentNode && el.parentNode.parentNode && el.parentNode.parentNode.removeChild(el.parentNode);
                } else {
                    el.parentNode && el.parentNode.removeChild(el);
                }
            }
        } else {
            throw new Error(`请设置角色权限标签值`);
        }
    },
};
