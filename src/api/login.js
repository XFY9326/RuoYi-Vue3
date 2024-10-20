import request from "@/utils/request";

/**
 * 登录方法
 * @param {string} username
 * @param {string} password
 * @param {string} code
 * @param {string} uuid
 */
export async function login(username, password, code, uuid) {
    const data = {
        username,
        password,
        code,
        uuid,
    };
    return request({
        url: "/login",
        headers: {
            isToken: false,
            repeatSubmit: false,
        },
        method: "post",
        data: data,
    });
}

// 注册方法
export async function register(data) {
    return request({
        url: "/register",
        headers: {
            isToken: false,
        },
        method: "post",
        data: data,
    });
}

// 获取用户详细信息
export async function getInfo() {
    return request({
        url: "/getInfo",
        method: "get",
    });
}

// 退出方法
export async function logout() {
    return request({
        url: "/logout",
        method: "post",
    });
}

// 获取验证码
export async function getCodeImg() {
    return request({
        url: "/captchaImage",
        headers: {
            isToken: false,
        },
        method: "get",
        timeout: 20000,
    });
}
