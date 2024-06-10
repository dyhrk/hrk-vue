<template>
    <div>
        <el-dialog :title="title" :visible.sync="show" width="70%" :append-to-body="true">
            <div>
                <el-row>
                    <el-col :span="6">
                        <!-- <el-input v-model="deptName" placeholder="请输入部门名称" clearable size="small"
                            prefix-icon="el-icon-search" style="margin-bottom: 20px" />


                        <el-tree :data="deptOptions" :props="defaultProps" :expand-on-click-node="false"
                            :filter-node-method="filterNode" ref="tree" node-key="id" default-expand-all
                            highlight-current @node-click="handleNodeClick" /> -->
                    </el-col>
                    <el-col :span="13">
                        <el-row>
                            <el-col :span="24" align="right">
                                <!-- <el-input v-model="queryParams.name" placeholder="请输入姓名" size="mini"
                                    class="filter-item perSelector-select-input-icon" clearable :validate-event="false"
                                    @input="queryDataSelect" @keyup.enter.native="queryDataSelect">
                                    <i slot="suffix" style="cursor: pointer" class="el-input__icon el-icon-search"
                                        @click="queryDataSelect" />
                                </el-input> -->
                            </el-col>
                        </el-row>
                        <el-row>
                            <!-- <el-table ref="multipleTable" v-loading="listLoading" highlight-current-row
                                class="el-table-high" :data="tableData" style="width: 100%" size="mini" row-key="id"
                                :header-cell-style="headerCellStyle" @current-change="handleSelect">
                                <el-table-column type="index" width="50" label="序号" align="center" />
                                <el-table-column align="center" prop="name" label="人员姓名" />
                                <el-table-column align="center" prop="phone" label="手机号码" />
                            </el-table>
                            <pagination v-show="queryParams.total > 0" v-loading="paginationLoading"
                                element-loading-spinner="el-icon-loading" class="perSelector-paginationIcon"
                                :total="queryParams.total" :page.sync="queryParams.pageNo"
                                :limit.sync="queryParams.pageSize" @pagination="queryData" /> -->
                        </el-row>
                    </el-col>
                    <el-col :span="5">
                        <!-- <el-row>
                            <el-col :span="12">
                                <div class="selectText">已选人员</div>
                            </el-col>
                            <el-col :span="12" align="right">
                                <el-button type="text" size="mini" class="delAll" @click="delAll">清空</el-button>
                            </el-col>
                        </el-row>
                        <el-row>
                            <ul class="el-table-high">
                                <li v-show="!nameDisplay" style="list-style-type: none;">
                                    <el-row>
                                        <div class="selectLi">
                                            <el-col :span="8">
                                                <div>{{ currentRow.name }}</div>
                                            </el-col>
                                            <el-col :span="16">
                                                <div>{{ currentRow.phone }}</div>
                                            </el-col>
                                        </div>
                                    </el-row>
                                </li>
                            </ul>
                        </el-row> -->
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

<script>

import { listUser, getUser, delUser, addUser, updateUser, resetUserPwd, changeUserStatus, deptTreeSelect } from "@/api/system/user";
export default {
    name: "EmSelection",

    data() {
        return {
            // 部门树选项
            deptOptions: undefined,
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                nickName: undefined,
                userName: undefined,
                phonenumber: undefined,
                status: undefined,
                deptId: undefined
            },
            title: '选择人员',
            // 部门名称
            deptName: undefined,
            // 是否显示弹出层
            show: false,
            defaultProps: {
                children: "children",
                label: "label"
            },
        };
    },
    watch: {
        // 根据名称筛选部门树
        deptName(val) {
            this.$refs.tree.filter(val);
        }
    },
    created() {
        

    },
    methods: {
        open() {
            this.getList();
            this.getDeptTree();
        },
        // 筛选节点
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        /** 查询部门下拉树结构 */
        getDeptTree() {
            deptTreeSelect().then(response => {
                this.deptOptions = response.data;
                this.show = true
            });
        },
        /** 查询用户列表 */
        getList() {
            // this.loading = true;
            listUser(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                // this.userList = response.rows;
                // this.total = response.total;
                // this.loading = false;
            }
            );
        },
        // 节点单击事件
        handleNodeClick(data) {
            this.queryParams.deptId = data.id;
            this.handleQuery();
        },
        /** 搜索按钮操作 */
        handleQuery() {
            this.queryParams.pageNum = 1;
            this.getList();
        },
    }
};
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

.el-table-high {
    height: 54.9vh;
    overflow: auto;
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