import Cookies from "js-cookie";

const useAppStore = defineStore("app", {
    /**
     * @typedef {{size: string, sidebar: {hide: boolean, opened: boolean, withoutAnimation: boolean}, device: string}} AppStore
     * @returns {AppStore}
     */
    state: () => ({
        sidebar: {
            opened: Cookies.get("sidebarStatus") ? !!+Cookies.get("sidebarStatus") : true,
            withoutAnimation: false,
            hide: false,
        },
        device: "desktop",
        size: Cookies.get("size") || "default",
    }),
    /**
     * @mixin AppStore
     */
    actions: {
        /**
         * @param {boolean} withoutAnimation
         */
        toggleSideBar(withoutAnimation) {
            if (this.sidebar.hide) {
                return false;
            }
            this.sidebar.opened = !this.sidebar.opened;
            this.sidebar.withoutAnimation = withoutAnimation;
            if (this.sidebar.opened) {
                Cookies.set("sidebarStatus", 1);
            } else {
                Cookies.set("sidebarStatus", 0);
            }
        },
        /**
         * @param {boolean} withoutAnimation
         */
        closeSideBar({ withoutAnimation }) {
            Cookies.set("sidebarStatus", 0);
            this.sidebar.opened = false;
            this.sidebar.withoutAnimation = withoutAnimation;
        },
        /**
         * @param {string} device
         */
        toggleDevice(device) {
            this.device = device;
        },
        /**
         * @param {string} size
         */
        setSize(size) {
            this.size = size;
            Cookies.set("size", size);
        },
        /**
         * @param {boolean} status
         */
        toggleSideBarHide(status) {
            this.sidebar.hide = status;
        },
    },
});

export default useAppStore;
