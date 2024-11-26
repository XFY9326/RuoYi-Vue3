<template>
    <!-- 创建表 -->
    <el-dialog v-model="visible" append-to-body title="创建表" top="5vh" width="800px">
        <span>创建表语句(支持多个建表语句)：</span>
        <el-input v-model="content" :rows="10" placeholder="请输入文本" type="textarea"></el-input>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="handleImportTable">确 定</el-button>
                <el-button @click="(visible = false)">取 消</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { createTable } from "@/api/tool/gen";

const visible = ref(false);
const content = ref("");
const { proxy } = getCurrentInstance();
const emit = defineEmits(["ok"]);

/** 显示弹框 */
function show() {
    visible.value = true;
}

/** 导入按钮操作 */
function handleImportTable() {
    if (content.value === "") {
        proxy.$modal.msgError("请输入建表语句");
        return;
    }
    createTable({ sql: content.value }).then(res => {
        proxy.$modal.msgSuccess(res.msg);
        if (res.code === 200) {
            visible.value = false;
            emit("ok");
        }
    });
}

defineExpose({
    show,
});
</script>
