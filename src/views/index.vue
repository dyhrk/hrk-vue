<template>
    <div class="app-container">
        <el-card class="mb20 card_query" style="margin-top: 20px;">

            <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
                <el-form-item label="用户名称" prop="userName">
                    <el-input v-model="queryParams.userName" placeholder="请输入用户名称" clearable style="width: 240px"
                        @keyup.enter="handleQuery" />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
                    <el-button icon="Refresh" @click="resetQuery">重置</el-button>
                </el-form-item>
            </el-form>

        </el-card>
        <el-card class="mb20">
            <el-table :data="orderlist" style="width: 100%" :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
                <el-table-column prop="OrderId" label="订单号" />
                <el-table-column prop="time" label="交易时间" />
                <el-table-column prop="account" label="入账账户" />
                <el-table-column prop="Status" label="交易状态" />
                <el-table-column prop="amount" label="交易金额" />
                <el-table-column label="操作" width="120">
                    <template #default>
                        <el-button link type="primary" size="small" @click="handleClick">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum"
                v-model:limit="queryParams.pageSize" @pagination="getList" /> -->
        </el-card>

    </div>
</template>
<script setup>
const total = ref(1);
const orderlist = [
    {
        OrderId: '2016-05-03',
        time: '2016-05-03 14:20:08',
        account: '37254875554921472',
        orderStatus: '交易成功',
        amount: '+160.55 RMB',
    },
    {
        OrderId: '2016-05-03',
        time: '2016-05-03 14:20:08',
        account: '37254875554921472',
        orderStatus: '交易成功',
        amount: '+160.55 RMB',
    }, {
        OrderId: '2016-05-03',
        time: '2016-05-03 14:20:08',
        account: '37254875554921472',
        orderStatus: '交易成功',
        amount: '+160.55 RMB',
    }, {
        OrderId: '2016-05-03',
        time: '2016-05-03 14:20:08',
        account: '37254875554921472',
        orderStatus: '交易成功',
        amount: '+160.55 RMB',
    }
]
const showSearch = ref(true);
const data = reactive({
    form: {},
    queryParams: {
        pageNum: 1,
        pageSize: 10,
        userName: undefined,
        phonenumber: undefined,
        status: undefined,
        deptId: undefined
    },
    rules: {
        userName: [{ required: true, message: "用户名称不能为空", trigger: "blur" }, { min: 2, max: 20, message: "用户名称长度必须介于 2 和 20 之间", trigger: "blur" }],
        nickName: [{ required: true, message: "用户昵称不能为空", trigger: "blur" }],
        password: [{ required: true, message: "用户密码不能为空", trigger: "blur" }, { min: 5, max: 20, message: "用户密码长度必须介于 5 和 20 之间", trigger: "blur" }],
        email: [{ type: "email", message: "请输入正确的邮箱地址", trigger: ["blur", "change"] }],
        phonenumber: [{ pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: "请输入正确的手机号码", trigger: "blur" }]
    }
});
const { queryParams, form, rules } = toRefs(data);
/** 搜索按钮操作 */
function handleQuery() {
    queryParams.value.pageNum = 1;
    getList();
};

function handleClick() { }
/** 重置按钮操作 */
/** 查询客户列表 */
function getList() {

};
function resetQuery() {
    dateRange.value = [];
    proxy.resetForm("queryRef");
    queryParams.value.deptId = undefined;
    proxy.$refs.deptTreeRef.setCurrentKey(null);
    handleQuery();
};
</script>
<style scoped lang="scss"></style>