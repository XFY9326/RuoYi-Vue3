const sessionCache = {
    /**
     * @param {string} key
     * @param {string} value
     */
    set(key, value) {
        if (!sessionStorage) {
            return;
        }
        if (key != null && value != null) {
            sessionStorage.setItem(key, value);
        }
    },
    /**
     * @param {string} key
     * @returns {string | null}
     */
    get(key) {
        if (!sessionStorage) {
            return null;
        }
        if (key == null) {
            return null;
        }
        return sessionStorage.getItem(key);
    },
    /**
     * @param {string} key
     * @param {object} jsonValue
     */
    setJSON(key, jsonValue) {
        if (jsonValue != null) {
            this.set(key, JSON.stringify(jsonValue));
        }
    },
    /**
     * @param {string} key
     * @returns {object | null}
     */
    getJSON(key) {
        const value = this.get(key);
        return value != null ? JSON.parse(value) : null;
    },
    /**
     * @param {string} key
     */
    remove(key) {
        sessionStorage.removeItem(key);
    },
};
const localCache = {
    /**
     * @param {string} key
     * @param {string} value
     */
    set(key, value) {
        if (!localStorage) {
            return;
        }
        if (key != null && value != null) {
            localStorage.setItem(key, value);
        }
    },
    /**
     * @param {string} key
     * @returns {string | null}
     */
    get(key) {
        if (!localStorage) {
            return null;
        }
        if (key == null) {
            return null;
        }
        return localStorage.getItem(key);
    },
    /**
     * @param {string} key
     * @param {object} jsonValue
     */
    setJSON(key, jsonValue) {
        if (jsonValue != null) {
            this.set(key, JSON.stringify(jsonValue));
        }
    },
    /**
     * @param {string} key
     * @returns {object | null}
     */
    getJSON(key) {
        const value = this.get(key);
        return value != null ? JSON.parse(value) : null;
    },
    /**
     * @param {string} key
     */
    remove(key) {
        localStorage.removeItem(key);
    },
};

export default {
    /**
     * 会话级缓存
     */
    session: sessionCache,
    /**
     * 本地缓存
     */
    local: localCache,
};
