import { defineComponent, h } from "vue";
import { ElButton, ElCheckbox, ElCheckboxButton, ElIcon, ElOption, ElRadio, ElRadioButton } from "element-plus";
import { makeMap } from "@/utils/index";
import { Plus } from "@element-plus/icons-vue";

const isExcludeProps = makeMap("layout,prepend,regList,tag,document,changeTag,defaultValue");

const componentChild = {
    "el-button": {
        default(h, conf, key) {
            return conf[key];
        },
    },
    "el-input": {
        prepend(h, conf, key) {
            return h("template", { slot: "prepend" }, conf[key]);
        },
        append(h, conf, key) {
            return h("template", { slot: "append" }, conf[key]);
        },
    },
    "el-select": {
        options(h, conf, key) {
            return conf.options.map(item =>
                h(ElOption, {
                    label: item.label,
                    value: item.value,
                    disabled: item.disabled,
                })
            );
        },
    },
    "el-radio-group": {
        options(h, conf, key) {
            return conf.options.map(item =>
                conf.optionType === "button"
                    ? h(ElRadioButton, { label: item.label, value: item.value })
                    : h(ElRadio, { label: item.label, value: item.value, border: conf.border })
            );
        },
    },
    "el-checkbox-group": {
        options(h, conf, key) {
            return conf.options.map(item =>
                conf.optionType === "button"
                    ? h(ElCheckboxButton, { label: item.label, value: item.value })
                    : h(ElCheckbox, { label: item.label, value: item.value, border: conf.border })
            );
        },
    },
    "el-upload": {
        "list-type": (h, conf, key) => {
            if (conf["list-type"] === "picture-card") {
                return h(ElIcon, () => h(Plus));
            } else {
                return h(ElButton, { type: "primary", icon: "upload" }, () => conf.buttonText);
            }
        },
    },
};

const componentSlot = {
    "el-upload": {
        tip: (h, conf, key) => {
            if (conf.showTip) {
                return h(
                    "div",
                    { class: "el-upload__tip" },
                    `只能上传不超过 ${conf.fileSize}${conf.sizeUnit} 的${conf.accept}文件`
                );
            }
        },
    },
};

export default defineComponent({
    props: {
        conf: {
            type: Object,
            required: true,
        },
    },
    render() {
        const dataObject = {};
        const confClone = JSON.parse(JSON.stringify(this.conf));
        const children = [];
        const slots = {};

        const childObjs = componentChild[confClone.tag];
        if (childObjs) {
            Object.keys(childObjs).forEach(key => {
                const childFunc = childObjs[key];
                if (confClone[key]) {
                    children.push(childFunc(h, confClone, key));
                }
            });
        }

        const slotObjs = componentSlot[confClone.tag];
        if (slotObjs) {
            Object.keys(slotObjs).forEach(key => {
                const childFunc = slotObjs[key];
                if (confClone[key]) {
                    slots[key] = () => childFunc(h, confClone, key);
                }
            });
        }

        Object.keys(confClone).forEach(key => {
            const val = confClone[key];
            if (key === "label") key = "aria-label";
            if (key === "vModel") {
                dataObject.modelValue = confClone.defaultValue;
                dataObject["onUpdate:modelValue"] = value => {
                    this.$emit("update:modelValue", value);
                };
            } else if (this.conf.tag === "el-time-picker" && key === "defaultValue" && val === null) {
                // ignore
            } else if (!isExcludeProps(key)) {
                dataObject[key] = val;
            }
        });

        if (children.length > 0) {
            slots.default = () => children;
        }

        return h(resolveComponent(this.conf.tag), dataObject, slots ?? null);
    },
});
