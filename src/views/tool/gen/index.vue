<template>
    <div class="app-container">
        <el-form v-show="showSearch" ref="queryRef" :inline="true" :model="queryParams">
            <el-form-item label="表名称" prop="tableName">
                <el-input
                    v-model="queryParams.tableName"
                    clearable
                    placeholder="请输入表名称"
                    style="width: 200px"
                    @keyup.enter="handleQuery"
                />
            </el-form-item>
            <el-form-item label="表描述" prop="tableComment">
                <el-input
                    v-model="queryParams.tableComment"
                    clearable
                    placeholder="请输入表描述"
                    style="width: 200px"
                    @keyup.enter="handleQuery"
                />
            </el-form-item>
            <el-form-item label="创建时间" style="width: 308px">
                <el-date-picker
                    v-model="dateRange"
                    end-placeholder="结束日期"
                    range-separator="-"
                    start-placeholder="开始日期"
                    type="daterange"
                    value-format="YYYY-MM-DD"
                ></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button icon="Search" type="primary" @click="handleQuery">搜索</el-button>
                <el-button icon="Refresh" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button
                    v-hasPermi:parent="['tool:gen:code']"
                    :disabled="multiple"
                    icon="Download"
                    plain
                    type="primary"
                    @click="handleGenTable"
                    >生成
                </el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button v-hasRole:parent="['admin']" icon="Plus" plain type="primary" @click="openCreateTable"
                    >创建
                </el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    v-hasPermi:parent="['tool:gen:import']"
                    icon="Upload"
                    plain
                    type="info"
                    @click="openImportTable"
                    >导入
                </el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    v-hasPermi:parent="['tool:gen:edit']"
                    :disabled="single"
                    icon="Edit"
                    plain
                    type="success"
                    @click="handleEditTable"
                    >修改
                </el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    v-hasPermi:parent="['tool:gen:remove']"
                    :disabled="multiple"
                    icon="Delete"
                    plain
                    type="danger"
                    @click="handleDelete"
                    >删除
                </el-button>
            </el-col>
            <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>

        <el-table
            ref="genRef"
            v-loading="loading"
            :data="tableList"
            :default-sort="defaultSort"
            @selection-change="handleSelectionChange"
            @sort-change="handleSortChange"
        >
            <el-table-column align="center" type="selection" width="55"></el-table-column>
            <el-table-column align="center" label="序号" type="index" width="50">
                <template #default="scope">
                    <span>{{ (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1 }}</span>
                </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" align="center" label="表名称" prop="tableName" />
            <el-table-column :show-overflow-tooltip="true" align="center" label="表描述" prop="tableComment" />
            <el-table-column :show-overflow-tooltip="true" align="center" label="实体" prop="className" />
            <el-table-column
                :sort-orders="['descending', 'ascending']"
                align="center"
                label="创建时间"
                prop="createTime"
                sortable="custom"
                width="160"
            />
            <el-table-column
                :sort-orders="['descending', 'ascending']"
                align="center"
                label="更新时间"
                prop="updateTime"
                sortable="custom"
                width="160"
            />
            <el-table-column align="center" class-name="small-padding fixed-width" label="操作" width="330">
                <template #default="scope">
                    <el-tooltip content="预览" placement="top">
                        <el-button
                            v-hasPermi:parent="['tool:gen:preview']"
                            icon="View"
                            link
                            type="primary"
                            @click="handlePreview(scope.row)"
                        ></el-button>
                    </el-tooltip>
                    <el-tooltip content="编辑" placement="top">
                        <el-button
                            v-hasPermi:parent="['tool:gen:edit']"
                            icon="Edit"
                            link
                            type="primary"
                            @click="handleEditTable(scope.row)"
                        ></el-button>
                    </el-tooltip>
                    <el-tooltip content="删除" placement="top">
                        <el-button
                            v-hasPermi:parent="['tool:gen:remove']"
                            icon="Delete"
                            link
                            type="primary"
                            @click="handleDelete(scope.row)"
                        ></el-button>
                    </el-tooltip>
                    <el-tooltip content="同步" placement="top">
                        <el-button
                            v-hasPermi:parent="['tool:gen:edit']"
                            icon="Refresh"
                            link
                            type="primary"
                            @click="handleSynchDb(scope.row)"
                        ></el-button>
                    </el-tooltip>
                    <el-tooltip content="生成代码" placement="top">
                        <el-button
                            v-hasPermi:parent="['tool:gen:code']"
                            icon="Download"
                            link
                            type="primary"
                            @click="handleGenTable(scope.row)"
                        ></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <pagination
            v-show="total > 0"
            v-model:limit="queryParams.pageSize"
            v-model:page="queryParams.pageNum"
            :total="total"
            @pagination="getList"
        />
        <!-- 预览界面 -->
        <el-dialog v-model="preview.open" :title="preview.title" append-to-body class="scrollbar" top="5vh" width="80%">
            <el-tabs v-model="preview.activeName">
                <el-tab-pane
                    v-for="(value, key) in preview.data"
                    :key="value"
                    :label="key.substring(key.lastIndexOf('/') + 1, key.indexOf('.vm'))"
                    :name="key.substring(key.lastIndexOf('/') + 1, key.indexOf('.vm'))"
                >
                    <el-link
                        v-clipboard:copy="value"
                        v-clipboard:success="copyTextSuccess"
                        :underline="false"
                        icon="DocumentCopy"
                        style="float: right"
                        >&nbsp;复制
                    </el-link>
                    <pre>{{ value }}</pre>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
        <import-table ref="importRef" @ok="handleQuery" />
        <create-table ref="createRef" @ok="handleQuery" />
    </div>
</template>

<script name="Gen" setup>
import { delTable, genCode, listTable, previewTable, synchDb } from "@/api/tool/gen";
import router from "@/router";
import importTable from "./importTable";
import createTable from "./createTable";

const route = useRoute();
const { proxy } = getCurrentInstance();

const tableList = ref([]);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const tableNames = ref([]);
const dateRange = ref([]);
const uniqueId = ref("");
const defaultSort = ref({ prop: "createTime", order: "descending" });

const data = reactive({
    queryParams: {
        pageNum: 1,
        pageSize: 10,
        tableName: undefined,
        tableComment: undefined,
        orderByColumn: defaultSort.value.prop,
        isAsc: defaultSort.value.order,
    },
    preview: {
        open: false,
        title: "代码预览",
        data: {},
        activeName: "domain.java",
    },
});

const { queryParams, preview } = toRefs(data);

onActivated(() => {
    const time = route.query.t;
    if (time != null && time !== uniqueId.value) {
        uniqueId.value = time;
        queryParams.value.pageNum = Number(route.query.pageNum);
        dateRange.value = [];
        proxy.resetForm("queryForm");
        getList();
    }
});

/** 查询表集合 */
function getList() {
    loading.value = true;
    listTable(proxy.addDateRange(queryParams.value, dateRange.value)).then(response => {
        tableList.value = response.rows;
        total.value = response.total;
        loading.value = false;
    });
}

/** 搜索按钮操作 */
function handleQuery() {
    queryParams.value.pageNum = 1;
    getList();
}

/** 生成代码操作 */
function handleGenTable(row) {
    const tbNames = row.tableName || tableNames.value;
    if (tbNames === "") {
        proxy.$modal.msgError("请选择要生成的数据");
        return;
    }
    if (row.genType === "1") {
        genCode(row.tableName).then(response => {
            proxy.$modal.msgSuccess("成功生成到自定义路径：" + row.genPath);
        });
    } else {
        proxy.$download.zip("/tool/gen/batchGenCode?tables=" + tbNames, "ruoyi.zip");
    }
}

/** 同步数据库操作 */
function handleSynchDb(row) {
    const tableName = row.tableName;
    proxy.$modal
        .confirm('确认要强制同步"' + tableName + '"表结构吗？')
        .then(function () {
            return synchDb(tableName);
        })
        .then(() => {
            proxy.$modal.msgSuccess("同步成功");
        })
        .catch(() => {});
}

/** 打开导入表弹窗 */
function openImportTable() {
    proxy.$refs["importRef"].show();
}

/** 打开创建表弹窗 */
function openCreateTable() {
    proxy.$refs["createRef"].show();
}

/** 重置按钮操作 */
function resetQuery() {
    dateRange.value = [];
    proxy.resetForm("queryRef");
    queryParams.value.pageNum = 1;
    proxy.$refs["genRef"].sort(defaultSort.value.prop, defaultSort.value.order);
}

/** 预览按钮 */
function handlePreview(row) {
    previewTable(row.tableId).then(response => {
        preview.value.data = response.data;
        preview.value.open = true;
        preview.value.activeName = "domain.java";
    });
}

/** 复制代码成功 */
function copyTextSuccess() {
    proxy.$modal.msgSuccess("复制成功");
}

// 多选框选中数据
function handleSelectionChange(selection) {
    ids.value = selection.map(item => item.tableId);
    tableNames.value = selection.map(item => item.tableName);
    single.value = selection.length !== 1;
    multiple.value = !selection.length;
}

/** 排序触发事件 */
function handleSortChange(column, prop, order) {
    queryParams.value.orderByColumn = column.prop;
    queryParams.value.isAsc = column.order;
    getList();
}

/** 修改按钮操作 */
function handleEditTable(row) {
    const tableId = row.tableId || ids.value[0];
    router.push({ path: "/tool/gen-edit/index/" + tableId, query: { pageNum: queryParams.value.pageNum } });
}

/** 删除按钮操作 */
function handleDelete(row) {
    const tableIds = row.tableId || ids.value;
    proxy.$modal
        .confirm('是否确认删除表编号为"' + tableIds + '"的数据项？')
        .then(function () {
            return delTable(tableIds);
        })
        .then(() => {
            getList();
            proxy.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
}

getList();
</script>
