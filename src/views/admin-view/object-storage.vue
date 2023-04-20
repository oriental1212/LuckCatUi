<template>
    <router-view>
        <el-row justify="space-between" align="top">
            <el-col :span="5" v-for="ossInfo in ossInfos" :key="ossInfo">
                <!-- Card -->
                <el-card class="box-card">
                    <template #header>
                        <div class="card-header">
                            <span>{{ ossInfo.ossName }}</span>
                            <el-tooltip content="点击设置更多吧" placement="right">
                                <el-icon @click="Visible = true">
                                    <MoreFilled />
                                </el-icon>
                            </el-tooltip>
                        </div>
                    </template>
                    <div v-for="bucketName in ossInfo.ossBucketNames" :key="bucketName" style="padding-bottom: 10px;">
                        <el-icon style="padding-right: 5px;"><Coffee /></el-icon>{{ bucketName }}
                    </div>
                </el-card>
                <!-- 弹窗 -->
                <el-dialog v-model="Visible" :show-close="false">
                    <template #header="{ titleId, titleClass }">
                        <div class="my-header">
                            <h4 :id="titleId" :class="titleClass">{{ ossInfo.ossName }}设置</h4>
                            <el-switch
                                v-model="ossInfo.ossState"
                                active-text="启用"
                                inactive-text="停用"
                            />
                        </div>
                    </template>
                    <el-row>
                        <el-col :span="8">
                            AccessKey<el-input v-model="confirmOss.accessKey" size="large" placeholder="请输入您的AccessKey" clearable></el-input>
                        </el-col>
                        <el-col :span="16"></el-col>
                        <el-col :span="8">
                            SecretKey<el-input v-model="confirmOss.secretKey" size="large" placeholder="请输入您的SecretKey" clearable></el-input>
                        </el-col>
                        <el-col :span="16"></el-col>
                        <el-col :span="8">
                            url<el-input v-model="confirmOss.url" size="large" placeholder="请输入您的Url地址,如果不需要修改请不管" clearable></el-input>
                        </el-col>
                    </el-row>
                    <template #footer>
                        <el-button @click="Visible = false">取消</el-button>
                        <el-button type="primary" @click="confirmOssData(ossInfo.ossName)">修改</el-button>
                    </template>
                </el-dialog>
            </el-col>
        </el-row>
    </router-view>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { onBeforeMount,reactive, ref } from "vue";
import request from "../../utils/axios";

onBeforeMount(() => {
    getOssInfo()
})
//控制dialog
const Visible = ref(false)
//获取的oss数据
let ossInfos = reactive([
    {
        ossName: "Minio",
        ossBucketNames: [
            "photo","user"
        ],
        ossState: true
    },
])
//提交修改数据的对象
const confirmOss = reactive({
    ossName: "",
    accessKey: "",
    secretKey: "",
    url: ""
})
//提交修改数据
const confirmOssData = (ossName) => {
    confirmOss.ossName = ossName
    request.post("/oss/changeOssInfo", confirmOss).then((res) => {
        if(res.code == 200){
            ElMessage.success("修改成功")
        }else{
            ElMessage.error(res.data)
        }
    })
    Visible.value = false
    confirmOss.accessKey = ""
    confirmOss.secretKey = ""
    confirmOss.ossName = ""
    confirmOss.url = ""
}

const getOssInfo = () => {
    request.get("/oss/getAllOssInfo").then(res => {
        if(res.code == 200){
            ossInfos = res.data
        }else{
            ElMessage.error(res.msg)
        }
    })
}

</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

</style>