<template>
    <router-view>
        <div class="select">
            <!-- 条件选择 -->
            <el-input v-model="select.user.username" placeholder="请输入用户名" clearable>
                <template #prefix>
                    <el-icon>
                        <UserFilled />
                    </el-icon>
                </template>
            </el-input>
            <el-input v-model="select.user.nickname" placeholder="请输入昵称" size="normal" clearable>
                <template #prefix><el-icon>
                        <Avatar />
                    </el-icon></template>
            </el-input>
            <el-input v-model="select.user.email" placeholder="请输入邮箱" size="normal" clearable>
                <template #prefix><el-icon>
                        <Message />
                    </el-icon></template>
            </el-input>
            <el-select v-model="select.user.authority" clearable placeholder="请选择账号状态">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-button type="primary" size="default" @click="clear()">
                <el-icon>
                    <Search />
                </el-icon>
                重置条件
            </el-button>

        </div>
        <el-table v-loading.fullscreen.lock="fullscreenLoading" :data="filterTableData" style="width: 100%">
            <el-table-column label="用户名" prop="username" />
            <el-table-column label="昵称" prop="nickname" />
            <el-table-column label="邮箱" prop="email" />
            <el-table-column label="权限" prop="authority">
                <!-- 根据不同权限显示不同颜色标签 -->
                <template #default="scope">
                    <el-tag
                        :type="scope.row.authority == 'admin' ? 'success' : scope.row.authority == 'user' ? '' : 'danger'">
                        {{ scope.row.authority == 'admin' ? '管理员' : scope.row.authority == 'user' ? '用户' : '已禁用' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column align="right">
                <template #default="scope" >
                    <el-popconfirm v-if="scope.row.authority == 'user'" width="220" confirm-button-text="确认" cancel-button-text="取消" :icon="InfoFilled"
                        icon-color="#626AEF" title="确定要设置该用户未为管理员吗吗?" @confirm="admin(scope.row)">
                        <template #reference>
                            <el-button type="success">
                                <el-icon style="margin-right:5px ;">
                                    <UserFilled />
                                </el-icon>
                                管理员
                            </el-button>
                        </template>
                    </el-popconfirm>
                    <el-popconfirm v-if="scope.row.authority == 'user'" width="220" confirm-button-text="确认" cancel-button-text="取消" :icon="InfoFilled"
                        icon-color="#626AEF" title="确定要禁用该用户吗?" @confirm="disable(scope.row)">
                        <template #reference>
                            <el-button type="danger">
                                <el-icon style="margin-right:5px ;">
                                    <CircleCloseFilled />
                                </el-icon>
                                禁用
                            </el-button>
                        </template>
                    </el-popconfirm>
                    <el-popconfirm v-if="scope.row.authority == 'disable'" width="220" confirm-button-text="确认" cancel-button-text="取消" :icon="InfoFilled"
                        icon-color="#626AEF" title="确定要解禁用该用户吗?" @confirm="canceldisable(scope.row)">
                        <template #reference>
                            <el-button type="info">
                                <el-icon style="margin-right:5px ;">
                                    <WarningFilled />
                                </el-icon>
                                解禁
                            </el-button>
                        </template>
                    </el-popconfirm>

                </template>
            </el-table-column>
        </el-table>
        <!-- 分页功能 -->
        <div class="pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                :page-sizes="[2, 5, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </router-view>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { ElNotification } from 'element-plus';
import request from '../../utils/axios';

onMounted(() => {
    //页面挂载后请求表格数据
    getTableData()
})

const fullscreenLoading = ref(false)
const tableData = ref([])//表格数据
const currentPage = ref(1)//当前页
const pageSize = ref(5)//页面大小
const total = ref()//总数
const select = reactive({//条件选择
    user: {
        username: "",
        email: "",
        nickname: "",
        authority: ""
    }
})
const options = [//条件选择下拉框选项
    {
        value: 'admin',
        label: '管理员',
    },
    {
        value: 'user',
        label: '用户',
    },
    {
        value: 'disable',
        label: '已禁用',
    }
]
const handleSizeChange = (val) => {
    pageSize.value = val
    getTableData()
};
const handleCurrentChange = (val) => {
    currentPage.value = val
    getTableData()
}
//表格数据根据条件过滤
const filterTableData = computed(() =>
    tableData.value.filter(
        (data) =>
            data.username.match(new RegExp(select.user.username))
            && data.nickname.match(new RegExp(select.user.nickname))
            && data.email.match(new RegExp(select.user.email))
            && data.authority.match(new RegExp(select.user.authority))
    )
)
//重置查询条件
const clear = () => {
    select.user.username = ""
    select.user.nickname = ""
    select.user.email = ""
    select.user.authority = ""
}
// 请求表格数据
const getTableData = () => {
    fullscreenLoading.value = true
    request.get("/user/findAllUser", {
        params: {
            currentPage: currentPage.value,
            pageSize: pageSize.value
        }
    }).then((res) => {
        if (res.code == 200) {
            tableData.value = res.data.records
            total.value = res.data.total
        } else if (res.code == 500) {
            ElNotification.error({
                title: '错误',
                message: res.msg,
                duration: 2000
            })
        }
        fullscreenLoading.value = false
    })
}
//设置为管理员
const admin = (row) => {
    request.get("/user/adminUser", {
        params: {
            username: row.username
        }
    }).then((res) => {
        if (res.code == 200) {
            getTableData()
            ElNotification.success({
                title: '成功',
                message: res.msg,
                duration: 2000
            })
        } else if (res.code == 500) {
            ElNotification.error({
                title: '失败',
                message: res.msg,
                duration: 3000
            })
        }
    })
}
//禁用账户
const disable = (row) => {
    request.get("/user/disableUser", {
        params: {
            username: row.username
        }
    }).then((res) => {
        if (res.code == 200) {
            getTableData()
            ElNotification.success({
                title: '成功',
                message: res.msg,
                duration: 2000
            })
        } else if (res.code == 500) {
            ElNotification.error({
                title: '失败',
                message: res.msg,
                duration: 3000
            })
        }
    })
}
//解禁用户
const canceldisable = (row) => {
    request.get("/user/cancelDisableUser", {
        params: {
            username: row.username
        }
    }).then((res) => {
        if (res.code == 200) {
            getTableData()
            ElNotification.success({
                title: '成功',
                message: res.msg,
                duration: 2000
            })
        } else if (res.code == 500) {
            ElNotification.error({
                title: '失败',
                message: res.msg,
                duration: 3000
            })
        }
    })
}

</script>

<style scoped>
.pagination {
    /* 分页组件样式 */
    margin: 10px auto;
    display: flex;
    justify-content: center;
}

.select {
    /* 选择区域样式 */
    display: flex;
    justify-content: space-around;
    margin: 20px auto;
}

.select .el-input {
    width: 200px;
    /*     margin-right: 50px; */
}
</style>