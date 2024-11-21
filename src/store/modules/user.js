import { getInfo, login, logout } from "@/api/login";
import { getToken, removeToken, setToken } from "@/utils/auth";
import { isHttp, isEmpty } from "@/utils/validate";
import defAva from "@/assets/images/profile.svg";

const useUserStore = defineStore("user", {
    /**
     * @typedef {{permissions: string[], roles: string[], name: string, id: string, avatar: string, token: string}} UserStore
     * @returns {UserStore}
     */
    state: () => ({
        token: getToken(),
        id: "",
        name: "",
        avatar: "",
        roles: [],
        permissions: [],
    }),
    /**
     * @mixin UserStore
     */
    actions: {
        // 登录
        login(userInfo) {
            const username = userInfo.username.trim();
            const password = userInfo.password;
            const code = userInfo.code;
            const uuid = userInfo.uuid;
            return new Promise((resolve, reject) => {
                login(username, password, code, uuid)
                    .then(res => {
                        setToken(res.token);
                        this.token = res.token;
                        resolve();
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        // 获取用户信息
        getInfo() {
            return new Promise((resolve, reject) => {
                getInfo()
                    .then(res => {
                        const user = res.user;
                        let avatar = user.avatar || "";
                        if (!isHttp(avatar)) {
                            avatar = isEmpty(avatar) ? defAva : import.meta.env.VITE_APP_BASE_API + avatar;
                        }
                        if (res.roles && res.roles.length > 0) {
                            // 验证返回的roles是否是一个非空数组
                            this.roles = res.roles;
                            this.permissions = res.permissions;
                        } else {
                            this.roles = ["ROLE_DEFAULT"];
                        }
                        this.id = user.userId;
                        this.name = user.userName;
                        this.avatar = avatar;
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        // 退出系统
        logOut() {
            return new Promise((resolve, reject) => {
                logout(this.token)
                    .then(() => {
                        this.token = "";
                        this.roles = [];
                        this.permissions = [];
                        removeToken();
                        resolve();
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
    },
});

export default useUserStore;
