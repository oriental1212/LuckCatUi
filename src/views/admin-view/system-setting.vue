<template>
    <router-view>
        <div class="system">
            <el-card class="card">
                <template #header>
                    <div class="card-header">
                        <span>用户相关设置</span>
                        <el-button class="button" @click="eidtSetting()">修改设置</el-button>
                    </div>
                </template>
                <el-descriptions direction="vertical" size="big">
                    <!-- 用户设置浏览和修改 -->
                    <el-descriptions-item label="用户存储空间">
                        {{ userSetting.storageSpace }}GB
                    </el-descriptions-item>
                    <el-descriptions-item label="用户单个图片大小">
                        {{ userSetting.storageSize }}MB
                    </el-descriptions-item>
                    <el-descriptions-item label="用户最大使用容量">
                        {{ userSetting.storageMaxUsed }}MB
                    </el-descriptions-item>
                </el-descriptions>
            </el-card>
            <!-- 单个用户的相关设置 -->


            <el-dialog v-model="editDialogVisible" title="修改设置" width="50%" :close-on-click-modal="false" align-center>
                <el-form ref="ruleFormRef" :model="ruleForm" :label-position="labelPosition" :rules="rules">
                    <el-form-item label="存储空间总量(G)" prop="storageSpace">
                        <el-slider v-model="ruleForm.storageSpace" show-input :min="1" />
                    </el-form-item>
                    <el-form-item label="单个图片大小(MB)" prop="storageSize">
                        <el-input-number v-model="ruleForm.storageSize" :min="1"></el-input-number>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="cancel()">取消</el-button>
                        <el-button type="primary" @click="submitForm(ruleFormRef)">
                            确认
                        </el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
    </router-view>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { reactive, ref, onBeforeMount } from "vue";
import request from "../../utils/axios";

const ruleFormRef = ref()
const labelPosition = ref("top")
const editDialogVisible = ref(false)//修改对话框的状态
const userSetting = reactive({
    storageSpace: 0,
    storageSize: 0,
    storageMaxUsed: 0
})
//提交表单
const ruleForm = reactive({
    storageSpace: 0,
    storageSize: 0,
})
onBeforeMount(() => {
    getData()
})
//取消提交表单
const cancel = () => {
    editDialogVisible.value = false
}
//修改按钮
const eidtSetting = () => {
    ruleForm.storageSpace = userSetting.storageSpace
    ruleForm.storageSize = userSetting.storageSize
    editDialogVisible.value = true
}
//修改设置的表单验证规则
const rules = reactive({
    storageSpace: [
        { required: true, message: '请填写存储空间', trigger: 'change' },
    ],
    storageSize: [
        { required: true, message: '请填写存储图片总数', trigger: 'change' },
    ]
})
//提交修改
const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            editDialogVisible.value = false
            ruleForm.storageSpace*=1024
            request.post("/setting/reviseUserSetting", ruleForm).then((res) => {
                if (res.code == 200) {
                    ElMessage.success({
                        message: res.msg
                    })
                    getData()
                } else if (res.code == 500) {
                    ElMessage.error({
                        message: res.msg
                    })
                }
            })
        } else {
            ElMessage({
                message: '校验失败' + fields,
                type: 'error',
            })
        }
    })
}
//获取数据
const getData = () => {
    request.post("/setting/getSetting").then((res) => {
        if (res.code == 200) {
            userSetting.storageSpace = parseInt(res.data.storageSpace) / 1024
            userSetting.storageSize = parseInt(res.data.storageSize)
            userSetting.storageMaxUsed = parseInt(res.data.storageMaxUsed)
        } else if (res.code == 500) {
            ElMessage.error({
                message: res.msg
            })
        }
    })
}
</script>

<style scoped>
.system {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

/* 卡片头部 */
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card {
    width: 100%;
    border: 20px;
    height: auto;
}
</style>