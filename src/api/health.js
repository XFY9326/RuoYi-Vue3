/**
 * 服务器可用性检查
 * @returns {boolean} 是否可以用
 */
export async function healthCheck() {
    try {
        const response = await fetch(import.meta.env.VITE_APP_BASE_API + "/health/check", { method: "head" });
        return response.status === 204;
    } catch (e) {
        console.error(e);
        return false;
    }
}
