<template>
    <router-view>
        <el-row :gutter="20" justify="space-between" style="margin: 0;">
            <el-col :span="8">
                <el-card class="box-card" shadow="never">
                    <template #header>
                        <div class="card-header">
                            <span>图片总数</span>
                        </div>
                    </template>
                    <div style="height: 60px; display: flex; align-items: center;">{{ state.total_photo }}</div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="box-card" shadow="never">
                    <template #header>
                        <div class="card-header">
                            <span>用户总数</span>
                        </div>
                    </template>
                    <div style="height: 60px; display: flex; align-items: center;">{{ state.total_user }}</div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="box-card" shadow="never">
                    <template #header>
                        <div class="card-header">
                            <span>剩余容量</span>
                        </div>
                    </template>
                    <div style="height: 60px; display: flex; align-items: center;">{{ state.total_space }}</div>
                </el-card>
            </el-col>
        </el-row>
    </router-view>
</template>

<script setup>
import { reactive } from "vue";

const state = reactive({
    total_user : "total_user",
    total_photo: "total_photo",
    total_space: "total_space",
    personal_photo: "personal_photo",
    personal_space: "personal_space",
})
</script>

<style>
.el-card{
    height: 160px;
}
</style>