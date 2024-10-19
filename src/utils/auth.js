import Cookies from "js-cookie";

const TokenKey = "token";

/**
 * @returns {string}
 */
export function getToken() {
    return Cookies.get(TokenKey);
}

/**
 * @param {string} token
 * @returns {string|undefined}
 */
export function setToken(token) {
    return Cookies.set(TokenKey, token);
}

export function removeToken() {
    Cookies.remove(TokenKey);
}
