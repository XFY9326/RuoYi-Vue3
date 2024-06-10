<template>
    <svg :class="svgClass" aria-hidden="true">
        <!--suppress HtmlUnknownAttribute -->
        <use :fill="props.color" :xlink:href="iconName" />
    </svg>
</template>

<script setup>
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

const iconName = computed(() => `#icon-${props.iconClass}`);
const svgClass = computed(() => (props.className ? `svg-icon ${props.className}` : "svg-icon"));
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
