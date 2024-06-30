import { defineConfig, loadEnv } from "vite";
import path from "path";
import createVitePlugins from "./vite/plugins";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
    const env = loadEnv(mode, process.cwd());
    const { VITE_APP_ENV, VITE_APP_BASE_API } = env;
    return {
        // 部署生产环境和开发环境下的URL。
        // 默认情况下，vite 会假设你的应用是被部署在一个域名的根路径上
        // 例如 https://www.ruoyi.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.ruoyi.vip/admin/，则设置 baseUrl 为 /admin/。
        base: VITE_APP_ENV === "production" ? "/" : "/",
        plugins: createVitePlugins(env, command === "build"),
        resolve: {
            // https://cn.vitejs.dev/config/#resolve-alias
            alias: {
                // 设置别名
                "@": path.resolve(__dirname, "./src"),
            },
            // https://cn.vitejs.dev/config/#resolve-extensions
            extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
        },
        // Vite 服务器与反向代理配置
        server: {
            port: 8081,
            host: true,
            open: true,
            proxy: {
                // https://cn.vitejs.dev/config/#server-proxy
                // Swagger反代
                "/api-docs": {
                    target: "http://localhost:8080",
                    xfwd: true,
                    changeOrigin: true,
                    headers: {
                        "X-Forwarded-Prefix": VITE_APP_BASE_API,
                    },
                },
                // Dev服务器反代
                "/dev-api": {
                    target: "http://localhost:8080",
                    xfwd: true,
                    changeOrigin: true,
                    rewrite: p => p.replace(/^\/dev-api/, ""),
                    headers: {
                        "X-Forwarded-Prefix": "/dev-api",
                    },
                },
                // Stage服务器反代
                "/stage-api": {
                    target: "http://localhost:8080",
                    xfwd: true,
                    changeOrigin: true,
                    rewrite: p => p.replace(/^\/stage-api/, ""),
                    headers: {
                        "X-Forwarded-Prefix": "/stage-api",
                    },
                },
                // Prod服务器反代
                "/api": {
                    target: "http://localhost:8080",
                    xfwd: true,
                    changeOrigin: true,
                    rewrite: p => p.replace(/^\/api/, ""),
                    headers: {
                        "X-Forwarded-Prefix": "/api",
                    },
                },
            },
        },
        preview: {
            port: 8081,
            host: true,
            open: false,
        },
        build: {
            chunkSizeWarningLimit: 2048,
        },
        optimizeDeps: {
            include: ["quill", "vue-quilly"],
        },
    };
});
