<template>
    <div class="common-layout">
        <el-container>
            <!-- 侧边菜单 -->
            <el-aside width="180px">
                <el-menu default-active="backgroundview" :unique-opened="true" class="el-menu-vertical-demo" :router="true">
                    <el-menu-item index="backgroundview">
                        <el-icon>
                            <location />
                        </el-icon>
                        <span>总览</span>
                    </el-menu-item>
                    <el-menu-item index="usercontroller">
                        <el-icon>
                            <document />
                        </el-icon>
                        <span>用户管理</span>
                    </el-menu-item>
                    <el-menu-item index="objectstorage">
                        <el-icon>
                            <setting />
                        </el-icon>
                        <span>OSS管理</span>
                    </el-menu-item>
                    <el-menu-item index="systemsetting">
                        <el-icon><setting /></el-icon>
                        <span>图库设置</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>

            <el-container>
                <!-- 头部菜单 -->
                <el-header>
                    <el-row justify="end" align="middle" :gutter=25 style="margin: 0px;">
                        <el-col :span="2.25" style="padding-left: 0px">
                            <el-button link @click="comeback" style="font-size: larger;">LuckCat图床</el-button>
                        </el-col>
                        <el-col :span="18"></el-col>
                        <el-col :span="1.5">
                            <el-avatar :src="userRevise.avatar" />
                        </el-col>
                        <el-col :span="1.5">
                            <el-dropdown @command="handleCommand" placement="bottom-end">
                                <span class="el-dropdown-link">
                                    用户管理<el-icon class="el-icon--right"><arrow-down /></el-icon>
                                </span>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item command="personal">个人资料</el-dropdown-item>
                                        <el-dropdown-item command="logout">登出</el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </el-col>
                    </el-row>
                </el-header>
                <!-- 用户资料 -->
                <el-drawer v-model="drawer">
                    <template #header>
                        <h1>个人资料</h1>
                    </template>
                    <template #default>
                        <!-- 头像修改 -->
                        <div class="avatarImg">
                            <el-upload class="avatar-uploader" action="#" :show-file-list="false"
                                :before-upload="beforeAvatarUpload" :on-progress="handleProgress">
                                <img :src="userRevise.avatar" class="avatar" />
                            </el-upload>
                        </div>

                        <el-descriptions 
                            column="1"
                            direction="vertical"
                            size="small"
                        >
                            <el-descriptions-item label="用户名">{{ userRevise.username }}</el-descriptions-item>
                            <el-descriptions-item v-if="personalInfoChange" label="昵称">{{ userRevise.nickname }}</el-descriptions-item>
                            <el-descriptions-item v-else label="昵称">
                                <el-input v-model="userRevise.nickname"/>
                            </el-descriptions-item>
                            <el-descriptions-item v-if="personalInfoChange" label="邮箱">{{ userRevise.email }}</el-descriptions-item>
                            <el-descriptions-item v-else label="邮箱">
                                <el-input v-model="userRevise.email"/>
                            </el-descriptions-item>
                        </el-descriptions>
                    </template>
                    <template #footer>
                        <div style="flex: auto">
                            <el-button @click="cancelClick">{{ buttonvalue.cancel }}</el-button>
                            <el-button type="primary" @click="confirmClick">{{ buttonvalue.confirm }}</el-button>
                        </div>
                    </template>
                </el-drawer>

                <!-- 主内容 -->
                <el-main>
                    <transition enter-active-class="animate__animated animate__fadeIn animate__faster"
                        leave-active-class="animate__animated animate__fadeOut">
                        <router-view></router-view>
                    </transition>
                </el-main>
            </el-container>

        </el-container>
    </div>
</template>

<script setup>
import { Document, Location, Setting, ArrowDown } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import router from '../router';
import { useStore } from 'vuex'
import request from '../utils/axios';
import { reactive, ref } from 'vue';

const drawer = ref(false)
const store = useStore()
const personalInfoChange = ref(true)

const userRevise = reactive({
})
const userReviseConfirm = reactive({

})
const buttonvalue = reactive({
    cancel: "关闭",
    confirm: "修改"
})

userRevise.avatar = JSON.parse(localStorage.getItem("personInfo")).avatarAddress
userRevise.email = JSON.parse(localStorage.getItem("personInfo")).email
userRevise.nickname = JSON.parse(localStorage.getItem("personInfo")).nickname
userRevise.username = JSON.parse(localStorage.getItem("personInfo")).username

const cancelClick = () => {
    if(personalInfoChange.value == true){
        drawer.value = false
    }else{
        personalInfoChange.value = true
        buttonvalue.confirm = "修改"
        buttonvalue.cancel = "关闭"
        userRevise.email = JSON.parse(localStorage.getItem("personInfo")).email
        userRevise.nickname = JSON.parse(localStorage.getItem("personInfo")).nickname
    }
}
const confirmClick = () => {
    if(personalInfoChange.value == true){
        personalInfoChange.value = false
        buttonvalue.confirm = "提交"
        buttonvalue.cancel = "取消"
    }else{
        userReviseConfirm.nickname = userRevise.nickname
        userReviseConfirm.email = userRevise.email
        request.post("/user/personalRevise",userReviseConfirm).then(res => {
            console.log(res)
            request.get("/user/getPersonalInfo").then((res) => {
                if(res.code == 200){
                    ElMessage({
                        type: "success",
                        message: "用户数据更新成功"
                    })
                }if(res.code == 500){
                    ElMessage({
                        type: "error",
                        message: res.msg
                    })
                }
                localStorage.setItem("personInfo", JSON.stringify(res.data))
            })
        })
    }
}

//图片上传
const beforeAvatarUpload = (rawFile) => {
    if (rawFile.type != "image/jpeg" && rawFile.type !== "image/png" && rawFile.type !== "image/jpg") {
        ElMessage.error("图片上传格式错误")
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error("图片大小不能超过2MB")
        return false
    }
    return true
}
const handleProgress = (event, file) => {
    console.log(event)
    let fd = new FormData
    fd.append('file', file.raw)
    request.post("/user/avatarChange", fd).then((res) => {
        if (res.code == 200) {
            ElMessage({
                type: "success",
                message: "图片修改成功"
            })
        } if (res.code == 500) {
            ElMessage({
                type: "error",
                message: res.msg
            })
        }
    })
    request.get("/user/getPersonalInfo").then((res) => {
        if (res.code == 200) {
            ElMessage({
                type: "success",
                message: "用户信息更新成功"
            })
        } if (res.code == 500) {
            ElMessage({
                type: "error",
                message: res.msg
            })
        }
        localStorage.setItem("personInfo", JSON.stringify(res.data))
    })
}

const handleCommand = (command) => {
    //个人资料
    if (command == "personal") {
        drawer.value = true
        //登出
    } else if (command == "logout") {
        ElMessageBox.confirm(
            '确定登出系统吗',
            {
                cancelButtonText: '手滑了',
                confirmButtonText: '确定',
                center: true,
            }
        ).then(() => {
            request.get("/user/logout").then((res) => {
                console.log(res)
                if (res.code == 200) {
                    ElMessage({
                        type: 'success',
                        message: '登出成功',
                    })
                    localStorage.removeItem("LuckCat")
                    localStorage.removeItem("personInfo")
                    store.commit("changeloginflage")
                    router.push({ name: 'user-home' })
                } if (res.code == 500) {
                    ElMessage({
                        type: 'error',
                        message: res.msg
                    })
                }
            })
        })
    }
}
//返回主页
const comeback = () => {
    router.push({ name: "user-home" })
}
</script>

<style scoped>
.common-layout {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

.el-header {
    background-color: #EBEEF5;
    /* background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%); */
}

.el-menu {
    background-color: #F0F2F5;
}

.el-container {
    height: 100%;
}

.el-menu-vertical-demo {
    height: 100%;
}

.el-row {
    height: 100%;
    width: 100%;
    margin: 0px;
}

.avatarImg {
    display: flex;
    justify-content: center;
}

.avatar {
    /* 修改个人信息头像 */
    width: 200px;
    height: 200px;
    border-radius: 50%;
}
</style>