<template>
    <div :style="'height:' + height">
        <iframe :id="iframeId" :src="src" style="width: 100%; height: 100%; border: none"></iframe>
    </div>
</template>

<script setup>
const props = defineProps({
    src: {
        type: String,
        default: "/",
    },
    iframeId: {
        type: String,
    },
});

const height = ref(document.documentElement.clientHeight - 94.5 + "px");
</script>
