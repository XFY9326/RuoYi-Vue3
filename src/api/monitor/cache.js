import request from "@/utils/request";

// 查询缓存详细
export async function getCache() {
    return request({
        url: "/monitor/cache",
        method: "get",
    });
}

// 查询缓存名称列表
export async function listCacheName() {
    return request({
        url: "/monitor/cache/getNames",
        method: "get",
    });
}

/**
 * 查询缓存键名列表
 * @param {string} cacheName
 */
export async function listCacheKey(cacheName) {
    return request({
        url: "/monitor/cache/getKeys/" + cacheName,
        method: "get",
    });
}

/**
 * 查询缓存内容
 * @param {string} cacheName
 * @param {string} cacheKey
 */
export async function getCacheValue(cacheName, cacheKey) {
    return request({
        url: "/monitor/cache/getValue/" + cacheName + "/" + cacheKey,
        method: "get",
    });
}

/**
 * 清理指定名称缓存
 * @param {string} cacheName
 */
export async function clearCacheName(cacheName) {
    return request({
        url: "/monitor/cache/clearCacheName/" + cacheName,
        method: "delete",
    });
}

/**
 * 清理指定键名缓存
 * @param {string} cacheKey
 */
export async function clearCacheKey(cacheKey) {
    return request({
        url: "/monitor/cache/clearCacheKey/" + cacheKey,
        method: "delete",
    });
}

// 清理全部缓存
export async function clearCacheAll() {
    return request({
        url: "/monitor/cache/clearCacheAll",
        method: "delete",
    });
}
