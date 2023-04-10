<template>
    <router-view>
        <div class="system">
            <el-card class="card">
                <template #header>
                    <div class="card-header">
                        <span>用户相关设置</span>
                    </div>
                </template>
                <el-descriptions direction="vertical" size="big">
                    <!-- 用户设置浏览和修改 -->
                    <el-descriptions-item v-if="userSettingChange" label="用户存储空间">{{ userSetting.space }}MB</el-descriptions-item>
                    <el-descriptions-item v-else label="用户存储空间">{{ userSetting.space }}MB</el-descriptions-item>
                    <el-descriptions-item v-if="userSettingChange" label="用户图片大小">{{ userSetting.size }}个</el-descriptions-item>
                    <el-descriptions-item v-else label="用户图片大小">{{ userSetting.size }}个</el-descriptions-item>
                    <el-descriptions-item v-if="userSettingChange" label="用户图片数量">{{ userSetting.quantity }}MB</el-descriptions-item>
                    <el-descriptions-item v-else label="用户图片数量">{{ userSetting.quantity }}MB</el-descriptions-item>
                </el-descriptions>
            </el-card>
        </div>
    </router-view>
</template>

<script setup>
import { reactive, ref } from "vue";

const userSettingChange = ref(true)
const userSetting = reactive({

})
</script>

<style scoped>
.system {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.card {
    width: 100%;
    border: 20px;
    height: auto;
}
</style>