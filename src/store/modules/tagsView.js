const useTagsViewStore = defineStore("tags-view", {
    /**
     * @typedef {{cachedViews: TagView[], iframeViews: TagView[], visitedViews: TagView[]}} TagsViewStore
     * @returns {TagsViewStore}
     */
    state: () => ({
        visitedViews: [],
        cachedViews: [],
        iframeViews: [],
    }),
    /**
     * @mixin TagsViewStore
     */
    actions: {
        /**
         * @param {TagView} view
         */
        addView(view) {
            this.addVisitedView(view);
            this.addCachedView(view);
        },
        /**
         * @param {TagView} view
         */
        addIframeView(view) {
            if (this.iframeViews.some(v => v.path === view.path)) return;
            this.iframeViews.push(
                Object.assign({}, view, {
                    title: view.meta.title || "no-name",
                })
            );
        },
        /**
         * @param {TagView} view
         */
        addVisitedView(view) {
            if (this.visitedViews.some(v => v.path === view.path)) return;
            this.visitedViews.push(
                Object.assign({}, view, {
                    title: view.meta.title || "no-name",
                })
            );
        },
        /**
         * @param {TagView} view
         */
        addCachedView(view) {
            if (this.cachedViews.includes(view.name)) return;
            if (!view.meta.noCache) {
                this.cachedViews.push(view.name);
            }
        },
        /**
         * @param {TagView} view
         * @returns {Promise<{ visitedViews: TagView[]; cachedViews: string[] }>}
         */
        delView(view) {
            return new Promise(async resolve => {
                await this.delVisitedView(view);
                await this.delCachedView(view);
                resolve({
                    visitedViews: [...this.visitedViews],
                    cachedViews: [...this.cachedViews],
                });
            });
        },
        /**
         * @param {TagView} view
         * @returns {Promise<TagView[]>}
         */
        delVisitedView(view) {
            return new Promise(resolve => {
                for (const [i, v] of this.visitedViews.entries()) {
                    if (v.path === view.path) {
                        this.visitedViews.splice(i, 1);
                        break;
                    }
                }
                this.iframeViews = this.iframeViews.filter(item => item.path !== view.path);
                resolve([...this.visitedViews]);
            });
        },
        /**
         * @param {TagView} view
         * @returns {Promise<TagView[]>}
         */
        delIframeView(view) {
            return new Promise(resolve => {
                this.iframeViews = this.iframeViews.filter(item => item.path !== view.path);
                resolve([...this.iframeViews]);
            });
        },
        /**
         * @param {TagView} view
         * @returns {Promise<TagView[]>}
         */
        delCachedView(view) {
            return new Promise(resolve => {
                const index = this.cachedViews.indexOf(view.name);
                index > -1 && this.cachedViews.splice(index, 1);
                resolve([...this.cachedViews]);
            });
        },
        /**
         * @param {TagView} view
         * @returns {Promise<{ visitedViews: TagView[]; cachedViews: string[] }>}
         */
        delOthersViews(view) {
            return new Promise(async resolve => {
                await this.delOthersVisitedViews(view);
                await this.delOthersCachedViews(view);
                resolve({
                    visitedViews: [...this.visitedViews],
                    cachedViews: [...this.cachedViews],
                });
            });
        },
        /**
         * @param {TagView} view
         * @returns {Promise<TagView[]>}
         */
        delOthersVisitedViews(view) {
            return new Promise(resolve => {
                this.visitedViews = this.visitedViews.filter(v => {
                    return v.meta.affix || v.path === view.path;
                });
                this.iframeViews = this.iframeViews.filter(item => item.path === view.path);
                resolve([...this.visitedViews]);
            });
        },
        /**
         * @param {TagView} view
         * @returns {Promise<TagView[]>}
         */
        delOthersCachedViews(view) {
            return new Promise(resolve => {
                const index = this.cachedViews.indexOf(view.name);
                if (index > -1) {
                    this.cachedViews = this.cachedViews.slice(index, index + 1);
                } else {
                    this.cachedViews = [];
                }
                resolve([...this.cachedViews]);
            });
        },
        /**
         * @param {TagView} view
         * @returns {Promise<{ visitedViews: TagView[]; cachedViews: string[] }>}
         */
        delAllViews(view) {
            return new Promise(async resolve => {
                await this.delAllVisitedViews(view);
                await this.delAllCachedViews(view);
                resolve({
                    visitedViews: [...this.visitedViews],
                    cachedViews: [...this.cachedViews],
                });
            });
        },
        /**
         * @param {TagView} view
         * @returns {Promise<TagView[]>}
         */
        delAllVisitedViews(view) {
            return new Promise(resolve => {
                this.visitedViews = this.visitedViews.filter(tag => tag.meta.affix);
                this.iframeViews = [];
                resolve([...this.visitedViews]);
            });
        },
        /**
         * @param {TagView} view
         * @returns {Promise<TagView[]>}
         */
        delAllCachedViews(view) {
            return new Promise(resolve => {
                this.cachedViews = [];
                resolve([...this.cachedViews]);
            });
        },
        /**
         * @param {TagView} view
         */
        updateVisitedView(view) {
            for (let v of this.visitedViews) {
                if (v.path === view.path) {
                    v = Object.assign(v, view);
                    break;
                }
            }
        },
        /**
         * @param {TagView} view
         * @returns {Promise<TagView[]|boolean|undefined>}
         */
        delRightTags(view) {
            return new Promise(resolve => {
                const index = this.visitedViews.findIndex(v => v.path === view.path);
                if (index === -1) {
                    return;
                }
                this.visitedViews = this.visitedViews.filter((item, idx) => {
                    if (idx <= index || (item.meta && item.meta.affix)) {
                        return true;
                    }
                    const i = this.cachedViews.indexOf(item.name);
                    if (i > -1) {
                        this.cachedViews.splice(i, 1);
                    }
                    if (item.meta.link) {
                        const fi = this.iframeViews.findIndex(v => v.path === item.path);
                        this.iframeViews.splice(fi, 1);
                    }
                    return false;
                });
                resolve([...this.visitedViews]);
            });
        },
        /**
         * @param {TagView} view
         * @returns {Promise<TagView[]|boolean|undefined>}
         */
        delLeftTags(view) {
            return new Promise(resolve => {
                const index = this.visitedViews.findIndex(v => v.path === view.path);
                if (index === -1) {
                    return;
                }
                this.visitedViews = this.visitedViews.filter((item, idx) => {
                    if (idx >= index || (item.meta && item.meta.affix)) {
                        return true;
                    }
                    const i = this.cachedViews.indexOf(item.name);
                    if (i > -1) {
                        this.cachedViews.splice(i, 1);
                    }
                    if (item.meta.link) {
                        const fi = this.iframeViews.findIndex(v => v.path === item.path);
                        this.iframeViews.splice(fi, 1);
                    }
                    return false;
                });
                resolve([...this.visitedViews]);
            });
        },
    },
});

export default useTagsViewStore;
