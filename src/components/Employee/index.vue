<template>
    <div>
        <el-dialog v-model="dialogTableVisible" title="人员选择器" width="70%" :append-to-body="true">
            <div style="height: 700px;">
                <el-row>
                    <el-col :span="6">

                        <el-input v-model="deptName" placeholder="请输入部门名称" clearable prefix-icon="Search"
                            style="margin-bottom: 20px" />

                        <el-tree :data="deptOptions" :props="{ label: 'label', children: 'children' }"
                            :expand-on-click-node="false" :filter-node-method="filterNode" ref="deptTreeRef"
                            node-key="id" highlight-current default-expand-all @node-click="handleNodeClick" />
                    </el-col>
                    <el-col :span="13">
                        <el-row>
                            <el-col :span="24" align="right">
                                <el-input v-model="queryParams.name" placeholder="请输入姓名"
                                    class="filter-item perSelector-select-input-icon" clearable :validate-event="false"
                                    @input="handleQuery" @keyup.enter.native="handleQuery">

                                </el-input>
                            </el-col>
                        </el-row>
                        <el-row>

                            <el-table v-loading="loading" style="height: 100%;" :data="userList" @current-change="handleSelect">

                                <el-table-column label="用户编号" align="center" key="userId" prop="userId" />
                                <el-table-column label="用户名称" align="center" key="userName" prop="userName"
                                    :show-overflow-tooltip="true" />
                                <el-table-column label="用户昵称" align="center" key="nickName" prop="nickName"
                                    :show-overflow-tooltip="true" />
                                <el-table-column label="部门" align="center" key="deptName" prop="dept.deptName"
                                    :show-overflow-tooltip="true" />
                                <el-table-column label="手机号码" align="center" key="phonenumber" prop="phonenumber"
                                    width="120" />
    
                            </el-table>
                            <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum"
                                v-model:limit="queryParams.pageSize" @pagination="getList" />
                        </el-row>
                    </el-col>
                    <el-col :span="5">
                        <el-row>
                            <el-col :span="12">
                                <div class="selectText">已选人员(<span style="color: #0080FF;">{{ selectList.length
                                        }}</span>)</div>
                            </el-col>
                            <el-col :span="12" align="right">
                                <el-button class="delAll" @click="delAll">清空</el-button>
                            </el-col>
                        </el-row>
                        <el-row>
                            <ul style="width: 100%;">
                                <li v-for="(item, index) in selectList" :key="index" style="width: 100%;"
                                    class="selectLi">

                                    <el-row>
                                        <el-col :span="8">
                                            <div>{{ item.nickName }}</div>
                                        </el-col>
                                        <el-col :span="12">
                                            <div>{{ item.phonenumber }}</div>
                                        </el-col>
                                        <el-col :span="4" align="right">
                                            <el-button type="danger" size="small" :icon="Delete">删除</el-button>
                                        </el-col>
                                    </el-row>

                                </li>
                            </ul>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
            <div align="right" class="tree_btn">
                <!-- <el-button type="primary" size="mini" @click="save">确 认</el-button>
                <el-button size="mini" @click="handleCancel">取 消</el-button> -->
            </div>
        </el-dialog>
    </div>
</template>

<script setup>
import { Delete } from '@element-plus/icons-vue'
import { changeUserStatus, listUser, resetUserPwd, delUser, getUser, updateUser, addUser, deptTreeSelect } from "@/api/system/user";
const { proxy } = getCurrentInstance();
const dialogTableVisible = ref(true)
const deptName = ref("");
const deptOptions = ref(undefined);
const userList = ref([]);
const total = ref(0);
const selectList = ref([]);


const loading = ref(true);

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

/** 通过条件过滤节点  */
const filterNode = (value, data) => {
    if (!value) return true;
    return data.label.indexOf(value) !== -1;
};

const { queryParams, form, rules } = toRefs(data);

/** 节点单击事件 */
function handleNodeClick(data) {
    queryParams.value.deptId = data.id;
    handleQuery();
};

/** 搜索按钮操作 */
function handleQuery() {
    queryParams.value.pageNum = 1;
    getList();
};

const handleSelect = (val) => {
    selectList.value.push(val)
}

/** 查询部门下拉树结构 */
function getDeptTree() {
    deptTreeSelect().then(response => {
        deptOptions.value = response.data;
    });
};

/** 查询部门下拉树结构 */
function delAll() {

};

/** 查询用户列表 */
function getList() {
    loading.value = true;
    listUser(proxy.addDateRange(queryParams.value)).then(res => {
        loading.value = false;
        userList.value = res.rows;
        total.value = res.total;
    });
};

/** 根据名称筛选部门树 */
watch(deptName, val => {
    proxy.$refs["deptTreeRef"].filter(val);
});

getDeptTree();
getList();

</script>

<style lang="scss" scoped>
.divTinymce {
    border: 1px solid #e4e7ed;
    border-radius: 5px;
    background-color: #f5f7fa;
    color: #c0c4cc;
}

.divTinymceIn {
    padding-right: 15px;
    padding-left: 15px;
    background-color: #f5f7fa;
    color: #c0c4cc;
}

.divTinymceShow {
    border: 1px solid #e4e7ed;
    border-radius: 5px;
}

.divTinymceInShow {
    padding-right: 15px;
    padding-left: 15px;
}

.selectText {
    text-align: center;
    height: 28px;
    line-height: 28px;
    font-size: 12px;
}

.selectLi {
    height: 28px;
    line-height: 28px;
    font-size: 12px;
}
</style>
<style lang="scss">
//不显示搜索input输入验证icon图标
.perSelector-select-input-icon .el-input__validateIcon {
    width: 0% !important;
}

.perSelector-select-input-icon .el-input__validateIcon:before {
    content: "" !important;
}

//不显示分页组件input输入验证icon图标
.perSelector-paginationIcon .el-input__validateIcon {
    width: 0% !important;
}

.perSelector-paginationIcon .el-input__validateIcon:before {
    content: "" !important;
}
</style>