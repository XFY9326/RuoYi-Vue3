<template>
    <div class="app-container">
        <el-form v-show="showSearch" ref="queryRef" :inline="true" :model="queryParams" label-width="68px">
            <el-form-item label="操作地址" prop="operIp">
                <el-input
                    v-model="queryParams.operIp"
                    clearable
                    placeholder="请输入操作地址"
                    style="width: 240px"
                    @keyup.enter="handleQuery"
                />
            </el-form-item>
            <el-form-item label="系统模块" prop="title">
                <el-input
                    v-model="queryParams.title"
                    clearable
                    placeholder="请输入系统模块"
                    style="width: 240px"
                    @keyup.enter="handleQuery"
                />
            </el-form-item>
            <el-form-item label="操作人员" prop="operName">
                <el-input
                    v-model="queryParams.operName"
                    clearable
                    placeholder="请输入操作人员"
                    style="width: 240px"
                    @keyup.enter="handleQuery"
                />
            </el-form-item>
            <el-form-item label="类型" prop="businessType">
                <el-select v-model="queryParams.businessType" clearable placeholder="操作类型" style="width: 240px">
                    <el-option
                        v-for="dict in sys_oper_type"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <el-select v-model="queryParams.status" clearable placeholder="操作状态" style="width: 240px">
                    <el-option
                        v-for="dict in sys_common_status"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="操作时间" style="width: 308px">
                <el-date-picker
                    v-model="dateRange"
                    :default-time="[new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)]"
                    end-placeholder="结束日期"
                    range-separator="-"
                    start-placeholder="开始日期"
                    type="daterange"
                    value-format="YYYY-MM-DD HH:mm:ss"
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
                    v-hasPermi:parent="['monitor:operlog:remove']"
                    :disabled="multiple"
                    icon="Delete"
                    plain
                    type="danger"
                    @click="handleDelete"
                    >删除
                </el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    v-hasPermi:parent="['monitor:operlog:remove']"
                    icon="Delete"
                    plain
                    type="danger"
                    @click="handleClean"
                    >清空
                </el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    v-hasPermi:parent="['monitor:operlog:export']"
                    icon="Download"
                    plain
                    type="warning"
                    @click="handleExport"
                    >导出
                </el-button>
            </el-col>
            <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>

        <el-table
            ref="operlogRef"
            v-loading="loading"
            :data="operlogList"
            :default-sort="defaultSort"
            @selection-change="handleSelectionChange"
            @sort-change="handleSortChange"
        >
            <el-table-column align="center" type="selection" width="50" />
            <el-table-column align="center" label="日志编号" prop="operId" />
            <el-table-column :show-overflow-tooltip="true" align="center" label="系统模块" prop="title" />
            <el-table-column align="center" label="操作类型" prop="businessType">
                <template #default="scope">
                    <dict-tag :options="sys_oper_type" :value="scope.row.businessType" />
                </template>
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                :sort-orders="['descending', 'ascending']"
                align="center"
                label="操作人员"
                prop="operName"
                sortable="custom"
                width="110"
            />
            <el-table-column :show-overflow-tooltip="true" align="center" label="操作地址" prop="operIp" width="130" />
            <el-table-column align="center" label="操作状态" prop="status">
                <template #default="scope">
                    <dict-tag :options="sys_common_status" :value="scope.row.status" />
                </template>
            </el-table-column>
            <el-table-column
                :sort-orders="['descending', 'ascending']"
                align="center"
                label="操作日期"
                prop="operTime"
                sortable="custom"
                width="180"
            >
                <template #default="scope">
                    <span>{{ parseTime(scope.row.operTime) }}</span>
                </template>
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                :sort-orders="['descending', 'ascending']"
                align="center"
                label="消耗时间"
                prop="costTime"
                sortable="custom"
                width="110"
            >
                <template #default="scope">
                    <span>{{ scope.row.costTime }}毫秒</span>
                </template>
            </el-table-column>
            <el-table-column align="center" class-name="small-padding fixed-width" label="操作">
                <template #default="scope">
                    <el-button
                        v-hasPermi="['monitor:operlog:query']"
                        icon="View"
                        link
                        type="primary"
                        @click="handleView(scope.row, scope.index)"
                        >详细
                    </el-button>
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

        <!-- 操作日志详细 -->
        <el-dialog v-model="open" append-to-body title="操作日志详细" width="800px">
            <el-form :model="form" label-width="100px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="操作模块：">{{ form.title }} / {{ typeFormat(form) }}</el-form-item>
                        <el-form-item label="登录信息："
                            >{{ form.operName }} / {{ form.operIp }} / {{ form.operLocation }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="请求地址：">{{ form.operUrl }}</el-form-item>
                        <el-form-item label="请求方式：">{{ form.requestMethod }}</el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="操作方法：">
                            <el-input
                                v-model="form.method"
                                :autosize="{ minRows: 1, maxRows: 2 }"
                                readonly
                                resize="none"
                                type="textarea"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="请求参数：">
                            <el-input
                                v-model="form.operParam"
                                :autosize="{ minRows: 1, maxRows: 8 }"
                                readonly
                                resize="none"
                                type="textarea"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="返回参数：">
                            <el-input
                                v-model="form.jsonResult"
                                :autosize="{ minRows: 1, maxRows: 8 }"
                                readonly
                                resize="none"
                                type="textarea"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="操作状态：">
                            <div v-if="form.status === 0">正常</div>
                            <div v-else-if="form.status === 1">失败</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="消耗时间：">{{ form.costTime }}毫秒</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="操作时间：">{{ parseTime(form.operTime) }}</el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item v-if="form.status === 1" label="异常信息：">{{ form.errorMsg }}</el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="open = false">关 闭</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script name="Operlog" setup>
import { cleanOperlog, delOperlog, list } from "@/api/monitor/operlog";

const { proxy } = getCurrentInstance();
const { sys_oper_type, sys_common_status } = proxy.useDict("sys_oper_type", "sys_common_status");

const operlogList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");
const dateRange = ref([]);
const defaultSort = ref({ prop: "operTime", order: "descending" });

const data = reactive({
    form: {},
    queryParams: {
        pageNum: 1,
        pageSize: 10,
        operIp: undefined,
        title: undefined,
        operName: undefined,
        businessType: undefined,
        status: undefined,
    },
});

const { queryParams, form } = toRefs(data);

/** 查询登录日志 */
function getList() {
    loading.value = true;
    list(proxy.addDateRange(queryParams.value, dateRange.value)).then(response => {
        operlogList.value = response.rows;
        total.value = response.total;
        loading.value = false;
    });
}

/** 操作日志类型字典翻译 */
function typeFormat(row, column) {
    return proxy.selectDictLabel(sys_oper_type.value, row.businessType);
}

/** 搜索按钮操作 */
function handleQuery() {
    queryParams.value.pageNum = 1;
    getList();
}

/** 重置按钮操作 */
function resetQuery() {
    dateRange.value = [];
    proxy.resetForm("queryRef");
    queryParams.value.pageNum = 1;
    proxy.$refs["operlogRef"].sort(defaultSort.value.prop, defaultSort.value.order);
}

/** 多选框选中数据 */
function handleSelectionChange(selection) {
    ids.value = selection.map(item => item.operId);
    multiple.value = !selection.length;
}

/** 排序触发事件 */
function handleSortChange(column, prop, order) {
    queryParams.value.orderByColumn = column.prop;
    queryParams.value.isAsc = column.order;
    getList();
}

/** 详细按钮操作 */
function handleView(row) {
    open.value = true;
    form.value = row;
}

/** 删除按钮操作 */
function handleDelete(row) {
    const operIds = row.operId || ids.value;
    proxy.$modal
        .confirm('是否确认删除日志编号为"' + operIds + '"的数据项?')
        .then(function () {
            return delOperlog(operIds);
        })
        .then(() => {
            getList();
            proxy.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
}

/** 清空按钮操作 */
function handleClean() {
    proxy.$modal
        .confirm("是否确认清空所有操作日志数据项?")
        .then(function () {
            return cleanOperlog();
        })
        .then(() => {
            getList();
            proxy.$modal.msgSuccess("清空成功");
        })
        .catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
    proxy.download(
        "monitor/operlog/export",
        {
            ...queryParams.value,
        },
        `config_${new Date().getTime()}.xlsx`
    );
}

getList();
</script>
