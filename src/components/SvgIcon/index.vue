<template>
    <SvgComponent :class="svgClass" :name="props.iconClass" :style="svgStyle" aria-hidden="true" />
</template>

<script setup>
import SvgComponent from "~virtual/svg-component";

const props = defineProps({
    iconClass: {
        type: String,
        required: true,
    },
    className: {
        type: String,
        default: "",
    },
    color: {
        type: String,
        default: "",
    },
});
const svgClass = computed(() => (props.className ? `svg-icon ${props.className}` : "svg-icon"));
const svgStyle = computed(() => (props.color ? `color: ${props.color}` : undefined));
</script>

<style lang="scss" scoped>
.sub-el-icon,
.nav-icon {
    display: inline-block;
    font-size: 15px;
    margin-right: 12px;
    position: relative;
}
.svg-icon {
    width: 1em;
    height: 1em;
    position: relative;
    fill: currentColor;
    vertical-align: -2px;
}
</style>
