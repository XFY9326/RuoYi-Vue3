<template>
    <div>
        <el-upload
            v-if="type === 'url'"
            :action="uploadUrl"
            :before-upload="handleBeforeUpload"
            :headers="headers"
            :on-error="handleUploadError"
            :on-success="handleUploadSuccess"
            :show-file-list="false"
            class="editor-img-uploader"
            name="file"
        >
            <i ref="uploadRef" class="editor-img-uploader"></i>
        </el-upload>
    </div>
    <div class="editor">
        <quilly-editor
            ref="quillEditorRef"
            v-model="content"
            :options="options"
            :style="styles"
            @update:model-value="() => $emit('update:modelValue', content)"
        />
    </div>
</template>

<script setup>
import Quill from "quill";
import { QuillyEditor } from "vue-quilly";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import { getToken } from "@/utils/auth";

const { proxy } = getCurrentInstance();

const quillEditorRef = ref();
const uploadUrl = ref(import.meta.env.VITE_APP_BASE_API + "/common/upload"); // 上传的图片服务器地址
const headers = ref({
    Authorization: "Bearer " + getToken(),
});

const props = defineProps({
    /* 编辑器的内容 */
    modelValue: {
        type: String,
    },
    /* 高度 */
    height: {
        type: Number,
        default: null,
    },
    /* 最小高度 */
    minHeight: {
        type: Number,
        default: null,
    },
    /* 只读 */
    readOnly: {
        type: Boolean,
        default: false,
    },
    /* 上传文件大小限制(MB) */
    fileSize: {
        type: Number,
        default: 5,
    },
    /* 类型（base64格式、url格式） */
    type: {
        type: String,
        default: "url",
    },
});

const options = ref({
    theme: "snow",
    bounds: document.body,
    debug: "warn",
    modules: {
        // 工具栏配置
        toolbar: [
            ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
            ["blockquote", "code-block"], // 引用  代码块
            [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            [{ size: ["small", false, "large", "huge"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
            [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
            [{ align: [] }], // 对齐方式
            ["clean"], // 清除文本格式
            ["link", "image", "video"], // 链接、图片、视频
        ],
    },
    placeholder: "请输入内容",
    readOnly: props.readOnly,
});

const styles = computed(() => {
    let style = {};
    if (props.minHeight) {
        style.minHeight = `${props.minHeight}px`;
    }
    if (props.height) {
        style.height = `${props.height}px`;
    }
    return style;
});

const content = ref("");
watch(
    () => props.modelValue,
    v => {
        if (v !== content.value) {
            content.value = v ? v : "<p></p>";
        }
    },
    { immediate: true }
);

let quill = null;

// 如果设置了上传地址则自定义图片上传事件
onMounted(() => {
    if (props.type === "url") {
        quill = quillEditorRef.value.initialize(Quill);
        let toolbar = quill.getModule("toolbar");
        toolbar.addHandler("image", value => {
            if (value) {
                proxy.$refs.uploadRef.click();
            } else {
                quill.format("image", false);
            }
        });
    }
});

// 上传前校检格式和大小
function handleBeforeUpload(file) {
    const type = ["image/jpeg", "image/jpg", "image/png", "image/svg"];
    const isJPG = type.includes(file.type);
    //检验文件格式
    if (!isJPG) {
        proxy.$modal.msgError(`图片格式错误!`);
        return false;
    }
    // 校检文件大小
    if (props.fileSize) {
        const isLt = file.size / 1024 / 1024 < props.fileSize;
        if (!isLt) {
            proxy.$modal.msgError(`上传文件大小不能超过 ${props.fileSize} MB!`);
            return false;
        }
    }
    return true;
}

// 上传成功处理
function handleUploadSuccess(res, file) {
    // 如果上传成功
    if (res.code === 200) {
        // 获取富文本实例
        if (quill !== null) {
            // 获取光标位置
            let length = quill.selection.savedRange.index;
            // 插入图片，res.url为服务器返回的图片链接地址
            quill.insertEmbed(length, "image", import.meta.env.VITE_APP_BASE_API + res.fileName);
            // 调整光标到最后
            quill.setSelection(length + 1);
        }
    } else {
        proxy.$modal.msgError("图片插入失败");
    }
}

// 上传失败处理
function handleUploadError() {
    proxy.$modal.msgError("图片插入失败");
}
</script>

<style>
.editor-img-uploader {
    display: none;
}

.editor {
    white-space: pre-wrap !important;
    line-height: normal !important;
}

.ql-container {
    height: 192px;
}
</style>
