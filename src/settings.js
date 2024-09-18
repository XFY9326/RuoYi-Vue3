export default {
    /**
     * 网页标题
     * @type {string}
     */
    title: import.meta.env.VITE_APP_TITLE,
    /**
     * 侧边栏主题 深色主题theme-dark，浅色主题theme-light
     * @type {string}
     */
    sideTheme: "theme-dark",
    /**
     * 是否系统布局配置
     * @type {boolean}
     */
    showSettings: true,

    /**
     * 是否显示顶部导航
     * @type {boolean}
     */
    topNav: false,

    /**
     * 是否显示 tagsView
     * @type {boolean}
     */
    tagsView: true,

    /**
     * 是否固定头部
     * @type {boolean}
     */
    fixedHeader: false,

    /**
     * 是否显示logo
     * @type {boolean}
     */
    sidebarLogo: true,

    /**
     * 是否显示动态标题
     * @type {boolean}
     */
    dynamicTitle: false,

    /**
     * @type {string | array} 'production' | ['production', 'development']
     * @description Need show err logs component.
     * The default is only used in the production env
     * If you want to also use it in dev, you can pass ['production', 'development']
     */
    errorLog: "production",
};
