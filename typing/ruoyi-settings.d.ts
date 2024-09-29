declare type DefaultSettings = {
    /**
     * 网页标题
     */
    title?: string;

    /**
     * 侧边栏主题 theme-dark | theme-light
     */
    sideTheme?: string;

    /**
     * 是否显示系统布局设置
     */
    showSettings?: boolean;

    /**
     * 是否显示顶部导航
     */
    topNav?: boolean;

    /**
     * 是否显示多标签导航
     */
    tagsView?: boolean;

    /**
     * 是否固定头部
     */
    fixedHeader?: boolean;

    /**
     * 是否显示侧边栏Logo
     */
    sidebarLogo?: boolean;

    /**
     * 是否显示动态标题
     */
    dynamicTitle?: boolean;

    /**
     * 导航栏布局
     */
    layout?: string;

    /**
     * 主题模式
     */
    theme?: string;

    /**
     * 布局大小
     */
    size?: string;

    /**
     * @type {string | string[]} 'production' | ['production', 'development']
     * @description Need show err logs component.
     * The default is only used in the production env
     * If you want to also use it in dev, you can pass ['production', 'development']
     */
    errorLog?: string | string[];
};
