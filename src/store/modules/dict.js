const useDictStore = defineStore("dict", {
    /**
     * @typedef {{dict: DictDataOption[]}} DictStore
     * @returns {DictStore}
     */
    state: () => ({
        dict: [],
    }),
    /**
     * @mixin DictStore
     */
    actions: {
        /**
         * 获取字典
         * @param {string} _key
         * @returns {DictDataOption[] | null}
         */
        getDict(_key) {
            if (_key == null && _key === "") {
                return null;
            }
            try {
                for (let i = 0; i < this.dict.length; i++) {
                    if (this.dict[i].key === _key) {
                        return this.dict[i].value;
                    }
                }
            } catch (e) {
                return null;
            }
        },
        /**
         * 设置字典
         * @param {string} _key
         * @param {DictDataOption[]} value
         */
        setDict(_key, value) {
            if (_key !== null && _key !== "") {
                this.dict.push({
                    key: _key,
                    value: value,
                });
            }
        },
        /**
         * 删除字典
         * @param {string} _key
         * @returns {boolean}
         */
        removeDict(_key) {
            let bln = false;
            try {
                for (let i = 0; i < this.dict.length; i++) {
                    if (this.dict[i].key === _key) {
                        this.dict.splice(i, 1);
                        return true;
                    }
                }
            } catch (e) {
                bln = false;
            }
            return bln;
        },
        // 清空字典
        cleanDict() {
            this.dict = [];
        },
        // 初始字典
        initDict() {},
    },
});

export default useDictStore;
