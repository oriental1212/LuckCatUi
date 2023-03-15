<template>
    <router-view>
        <div class="background">
            <div class="word">
                <el-row
                    justify="center"
                    align="middle"
                    style="margin-bottom: 20px"
                >
                    <span>开始上传你的图片吧</span>
                </el-row>
                <el-row justify="center" align="middle">
                    <el-button type="primary">
                        Upload
                        <el-icon class="el-icon--right"><Upload /></el-icon>
                    </el-button>
                </el-row>
            </div>
        </div>
    </router-view>
</template>

<script setup>
import { Upload } from "@element-plus/icons-vue";
</script>

<style>
.background {
    background: url("@/public/no01.jpg");
    width: 100%;
    height: 100%;
    position: fixed;
    background-size: 100% 100%;
}
.word {
    font-size: 3em;
    color: #ffffff;
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
