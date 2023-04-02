<template>
    <router-view>
        <el-table :data="filterTableData" style="width: 100%">
            <el-table-column label="用户名" prop="username" />
            <el-table-column label="昵称" prop="nickname" />
            <el-table-column label="邮箱" prop="email" />
            <el-table-column align="right">
                <template #header>
                <el-input v-model="search" size="small" placeholder="输入查询用户名" />
                </template>
                <template #default="scope">
                <el-button size="small" type="info" @click="handleEdit(scope.$index, scope.row)">禁用</el-button>
                </template>
            </el-table-column>
        </el-table>
    </router-view>
</template>

<script setup>
import { ref, reactive, computed} from 'vue';

const search = ref('')

const filterTableData = computed(() =>
    userData.filter(
        (data) => !search.value || data.nickname.toLowerCase().includes(search.value.toLowerCase())
    )
)

const userData = reactive([
    {
        username: '2016-05-03',
        nickname: 'Tom',
        email: 'No. 189, Grove St, Los Angeles',
    },
    {
        username: '2016-05-02',
        nickname: 'John',
        email: 'No. 189, Grove St, Los Angeles',
    },
    {
        username: '2016-05-04',
        nickname: 'Morgan',
        email: 'No. 189, Grove St, Los Angeles',
    },
    {
        username: '2016-05-01',
        nickname: 'Jessy',
        email: 'No. 189, Grove St, Los Angeles',
    }
])
</script>

<style>
</style>