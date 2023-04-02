<template>
    <router-view>
        <el-row justify="space-between" align="top">
            <el-col :span="5" v-for="o in sso" :key="o">
                <el-card class="box-card">
                    <template #header>
                    <div class="card-header">
                        <span>{{ o.ssoname }}</span>
                        <el-button class="button" text>查看</el-button>
                    </div>
                    </template>
                    <div>你好</div>
                </el-card>
            </el-col>
        </el-row>
    </router-view>
</template>

<script setup>
import { reactive } from 'vue';

const sso = reactive([
    {
        ssoname: "阿里云"
    },
    {
        ssoname: "七牛云"
    },
    {
        ssoname: "Minio云"
    },    
    {
        ssoname: "牛客云"
    },
    {
        ssoname: "腾讯云"
    },
])
</script>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>