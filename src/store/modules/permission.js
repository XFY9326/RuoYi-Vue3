import auth from "@/plugins/auth";
import router, { constantRoutes, dynamicRoutes } from "@/router";
import { getRouters } from "@/api/menu";
import Layout from "@/layout/index";
import ParentView from "@/components/ParentView";
import InnerLink from "@/layout/components/InnerLink";

// 匹配views里面所有的.vue文件
const modules = import.meta.glob("./../../views/**/*.vue");

const usePermissionStore = defineStore("permission", {
    /**
     * @typedef {{routes: RouteOption[], sidebarRouters: RouteOption[], addRoutes: RouteOption[], topbarRouters: RouteOption[], defaultRoutes: RouteOption[]}} PermissionStore
     * @returns {PermissionStore}
     */
    state: () => ({
        routes: [],
        addRoutes: [],
        defaultRoutes: [],
        topbarRouters: [],
        sidebarRouters: [],
    }),
    /**
     * @mixin PermissionStore
     */
    actions: {
        /**
         * @param {RouteOption[]} routes
         */
        setRoutes(routes) {
            this.addRoutes = routes;
            this.routes = constantRoutes.concat(routes);
        },
        /**
         * @param {RouteOption[]} routes
         */
        setDefaultRoutes(routes) {
            this.defaultRoutes = constantRoutes.concat(routes);
        },
        /**
         * @param {RouteOption[]} routes
         */
        setTopbarRoutes(routes) {
            this.topbarRouters = routes;
        },
        /**
         * @param {RouteOption[]} routes
         */
        setSidebarRouters(routes) {
            this.sidebarRouters = routes;
        },
        generateRoutes() {
            return new Promise(resolve => {
                // 向后端请求路由数据
                getRouters().then(res => {
                    const sdata = JSON.parse(JSON.stringify(res.data));
                    const rdata = JSON.parse(JSON.stringify(res.data));
                    const defaultData = JSON.parse(JSON.stringify(res.data));
                    const sidebarRoutes = filterAsyncRouter(sdata);
                    const rewriteRoutes = filterAsyncRouter(rdata, false, true);
                    const defaultRoutes = filterAsyncRouter(defaultData);
                    const asyncRoutes = filterDynamicRoutes(dynamicRoutes);
                    asyncRoutes.forEach(route => {
                        router.addRoute(route);
                    });
                    this.setRoutes(rewriteRoutes);
                    this.setSidebarRouters(constantRoutes.concat(sidebarRoutes));
                    this.setDefaultRoutes(sidebarRoutes);
                    this.setTopbarRoutes(defaultRoutes);
                    resolve(rewriteRoutes);
                });
            });
        },
    },
});

/**
 * 遍历后台传来的路由字符串，转换为组件对象
 * @param {RouteOption[]} asyncRouterMap
 * @param {RouteOption | boolean} lastRouter
 * @param {boolean} type
 * @returns {RouteOption[]}
 */
function filterAsyncRouter(asyncRouterMap, lastRouter = false, type = false) {
    return asyncRouterMap.filter(route => {
        if (type && route.children) {
            route.children = filterChildren(route.children);
        }
        if (route.component) {
            // Layout ParentView 组件特殊处理
            if (route.component === "Layout") {
                route.component = Layout;
            } else if (route.component === "ParentView") {
                route.component = ParentView;
            } else if (route.component === "InnerLink") {
                route.component = InnerLink;
            } else {
                route.component = loadView(route.component);
            }
        }
        if (route.children != null && route.children && route.children.length) {
            route.children = filterAsyncRouter(route.children, route, type);
        } else {
            delete route["children"];
            delete route["redirect"];
        }
        return true;
    });
}

/**
 * 遍历后台传来的路由字符串，转换为组件对象
 * @param {RouteOption[]} childrenMap
 * @param {RouteOption | boolean} lastRouter
 * @returns {RouteOption[]}
 */
function filterChildren(childrenMap, lastRouter = false) {
    /**
     * @type {RouteOption[]}
     */
    let children = [];
    childrenMap.forEach(el => {
        el.path = lastRouter ? lastRouter.path + "/" + el.path : el.path;
        if (el.children && el.children.length && el.component === "ParentView") {
            children = children.concat(filterChildren(el.children, el));
        } else {
            children.push(el);
        }
    });
    return children;
}

/**
 * 动态路由遍历，验证是否具备权限
 * @param {RouteOption[]} routes
 * @returns {RouteOption[]}
 */
export function filterDynamicRoutes(routes) {
    /**
     * @type {RouteOption[]}
     */
    const res = [];
    routes.forEach(route => {
        if (route.permissions) {
            if (auth.hasPermiOr(route.permissions)) {
                res.push(route);
            }
        } else if (route.roles) {
            if (auth.hasRoleOr(route.roles)) {
                res.push(route);
            }
        }
    });
    return res;
}

export const loadView = view => {
    let res;
    for (const path in modules) {
        const dir = path.split("views/")[1].split(".vue")[0];
        if (dir === view) {
            res = () => modules[path]();
        }
    }
    return res;
};

export default usePermissionStore;
