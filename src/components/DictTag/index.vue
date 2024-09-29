<template>
    <div>
        <template v-for="(item, index) in options">
            <template v-if="values.includes(item.value)">
                <span
                    v-if="
                        (item.elTagType === 'default' || item.elTagType === '') &&
                        (item.elTagClass === '' || item.elTagClass == null)
                    "
                    :key="item.value"
                    :class="item.elTagClass"
                    :index="index"
                    >{{ item.label + " " }}</span
                >
                <el-tag
                    v-else
                    :key="item.value + ''"
                    :class="item.elTagClass"
                    :disable-transitions="true"
                    :index="index"
                    :type="item.elTagType"
                    >{{ item.label + " " }}
                </el-tag>
            </template>
        </template>
        <template v-if="unmatched && showValue">
            {{ unmatchArray | handleArray }}
        </template>
    </div>
</template>

<script setup>
// 记录未匹配的项
const unmatchArray = ref([]);

const props = defineProps({
    // 数据
    options: {
        type: Array,
        default: null,
    },
    // 当前的值
    value: [Number, String, Array],
    // 当未找到匹配的数据时，显示value
    showValue: {
        type: Boolean,
        default: true,
    },
    separator: {
        type: String,
        default: ",",
    },
});

const values = computed(() => {
    if (props.value === null || typeof props.value === "undefined" || props.value === "") return [];
    return Array.isArray(props.value) ? props.value.map(item => "" + item) : String(props.value).split(props.separator);
});

const unmatched = computed(() => {
    unmatchArray.value = [];
    // 没有value不显示
    if (props.value === null || typeof props.value === "undefined" || props.value === "" || props.options.length === 0)
        return false;
    // 传入值为数组
    let unmatched = false; // 添加一个标志来判断是否有未匹配项
    values.value.forEach(item => {
        if (!props.options.some(v => v.value === item)) {
            unmatchArray.value.push(item);
            unmatched = true; // 如果有未匹配项，将标志设置为true
        }
    });
    return unmatched; // 返回标志的值
});

function handleArray(array) {
    if (array.length === 0) return "";
    return array.reduce((pre, cur) => {
        return pre + " " + cur;
    });
}
</script>

<style scoped>
.el-tag + .el-tag {
    margin-left: 10px;
}
</style>
