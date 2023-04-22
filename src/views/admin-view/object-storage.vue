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
                                :before-change="switchChange.bind(this,ossInfo)"
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
const ossInfos = ref([])
// let ossInfos = reactive([
//     {
//         ossName: "Minio",
//         ossBucketNames: [
//             "photo","user"
//         ],
//         ossState: true
//     },
// ])
//提交修改数据的对象
const confirmOss = reactive({
    ossName: "",
    accessKey: "",
    secretKey: "",
    url: ""
})
onBeforeMount(() => {
    getOssInfo()
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
    getOssInfo()
    Visible.value = false
    confirmOss.accessKey = ""
    confirmOss.secretKey = ""
    confirmOss.ossName = ""
    confirmOss.url = ""
}
//获取oss数据
const getOssInfo = () => {
    request.get("/oss/getAllOssInfo").then(res => {
        if(res.code == 200){
            res.data.forEach((one) => {
                JSON.parse(one.ossState)
            })
            ossInfos.value = res.data
        }else{
            ElMessage.error(res.msg)
        }
    })
}
const switchChange = (oss) => {
    let state = !oss.ossState
    request.get("/oss/changeOssInfo/"+ oss.ossName +"/"+ state.toString()).then(res => {
        if(res.code == 200 && oss.ossState == false){
            ElMessage.success("启用成功")
            oss.ossState = true
            return true
        }
        if(res.code == 200 && oss.ossState == true){
            ElMessage.success("停用成功")
            oss.ossState = false
            return true
        }else{
            ElMessage.error("设置失败，请稍后重试")
            return false
        }
    })
    return false
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