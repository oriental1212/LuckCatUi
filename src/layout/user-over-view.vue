<template>
    <div class="common-layout">
        <el-container style="height: 100%">
            <el-header>
                <el-menu :default-active="user - home" class="el-menu-demo" mode="horizontal" background-color="#2a2a32"
                    :router="true" @select="select" text-color="#fff" :ellipsis="false">
                    <div class="logo">LuckCat</div>
                    <el-menu-item index="photo-view2">图库</el-menu-item>
                    <div style="flex-grow: 1;"></div>
                    <el-menu-item index="user-home"><el-icon>
                            <UploadFilled />
                        </el-icon>上传</el-menu-item>
                    <el-menu-item index="authen" v-if="loginshow"><el-icon>
                            <Right />
                        </el-icon>登录</el-menu-item>
                    <el-menu-item index="background" v-if="!loginshow"><el-icon>
                            <User />
                        </el-icon>个人中心</el-menu-item>
                </el-menu>
            </el-header>
            <el-main style="padding: 0px">
                <!-- 上传模块 -->
                <transition enter-active-class="animate__animated animate__fadeInDown animate__faster"
                    leave-active-class="animate__animated animate__fadeOutUp">
                    <div v-show="uploadstate" class="upload" v-click-outside="onClickOutside">
                        <el-upload class="upload-demo" drag action="#" :show-file-list="true"
                            :before-upload="beforePhotoUpload" :on-progress="photoUploadIng">
                            <el-icon class="el-icon--upload">
                                <upload-filled />
                            </el-icon>
                            <div class="el-upload__text">
                                <div style="font-size: 30px; color: #ffffff; margin-bottom: 10px;">
                                    拖放图片到这里上传
                                </div>
                                <span style="font-size: 1em; color: #ffffff">或者
                                    <em><el-icon>
                                            <ZoomIn />
                                        </el-icon>浏览您的计算器</em>
                                </span>
                                <br />
                                <div style="font-size: 0.79rem; margin-top: 5px">
                                    JPG JPEG PNG GIF
                                </div>
                            </div>
                        </el-upload>
                    </div>
                </transition>

                <transition enter-active-class="animate__animated animate__fadeIn animate__faster"
                    leave-active-class="animate__animated animate__fadeOut">
                    <router-view></router-view>
                </transition>
            </el-main>
        </el-container>
    </div>
</template>

<script setup>
import { UploadFilled, Right, ZoomIn, User } from "@element-plus/icons-vue";
import { ClickOutside as vClickOutside } from 'element-plus'
import { ref } from "vue";
import router from "../router";
import { useStore } from "vuex"
import { ElMessage } from 'element-plus'
import request from "../utils/axios";

const uploadstate = ref(false);
const loginshow = ref();
const store = useStore()
loginshow.value = store.state.logoinflage
const userPhotoSize = ref()

//获取用户图片大小阈值
request.post("/setting/getSetting").then(res => {
    if (res.code == 200) {
        userPhotoSize.value = res.data.storageSize
    } else {
        console.log("获取失败")
    }
})
//上传前函数
const beforePhotoUpload = (rawFile) => {
    if (!userPhotoSize.value) {
        ElMessage.error({
            message: "未获取成功用户的图片大小",
            duration: 4000
        })
        return false
    }
    if (rawFile.type != "image/jpeg" && rawFile.type != "image/png" && rawFile.type != "image/jpg" && rawFile.type != "image/gif") {
        ElMessage.error({
            message: "图片上传格式错误",
            duration: 4000
        })

        return false
    } else if (rawFile.size / 1024 / 1024 > userPhotoSize.value) {
        ElMessage.error({
            message: "图片大小超过设置阈值",
            duration: 4000
        })
        return false
    }
    console.log("校验成功");
    return true
}
//上传函数
const photoUploadIng = (event, file) => {
    console.log(event)
    let fd = new FormData
    fd.append("file", file.raw)
    fd.append("userName", JSON.parse(localStorage.getItem("personInfo")).username)
    fd.append("photoTag", "default")
    request.post("/photo/upload", fd).then((res) => {
        if (res.code == 200) {
            ElMessage({
                type: "success",
                message: "图片上传成功"
            })
        } else if (res.code == 500) {
            ElMessage({
                type: "error",
                message: res.msg
            })
        } else {
            ElMessage({
                type: "error",
                message: res.msg
            })
        }
    })
}

// 上传框显示函数
const uplaodclick = () => {
    uploadstate.value = !uploadstate.value;
};
// 登录函数
const login = () => {
    router.push({ path: "/authen" });
};
// 菜单选择回调
const select = (key) => {
    if (key == "user-home") {
        uplaodclick();
    }
    if (key == "authen") {
        login();
    }
};
//点击上传区域外隐藏上传界面
const onClickOutside = () => {
    uploadstate.value = false
}
</script>

<style scoped>
html,
body,
#app,
.common-layout {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.upload {
    position: absolute;
    z-index: 999;
    width: 100%;
    height: auto;
    background-color: #2a2a32;
}

.upload :deep(.el-upload-dragger) {
    background-color: #2a2a32;
    border-style: none;
}

.el-header {
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2),
        0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
    padding: 0px 50px;
    background: #2a2a32;
}

.el-menu-demo {
    border-bottom: 0px;
}

.logo {
    padding-right: 30px;
    color: white;
    text-align: center;
    height: 58px;
    line-height: 58px;
    border-right: 20px;
}
</style>
