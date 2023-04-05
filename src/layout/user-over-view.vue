<template>
    <div class="common-layout">
        <el-container style="height: 100%">
            <el-header>
                <el-menu
                    :default-active="user-home"
                    class="el-menu-demo"
                    mode="horizontal"
                    background-color="#2a2a32"
                    :router="true"
                    @select="select"
                    text-color="#fff"
                    :ellipsis="false"
                >
                    <div class="logo">LuckCat</div>
                    <el-menu-item index="photo-view">图库</el-menu-item>
                    <el-menu-item index="">管理</el-menu-item>
                    <div style="flex-grow: 1;"></div>
                    <el-menu-item index="user-home"><el-icon><UploadFilled/></el-icon>上传</el-menu-item>
                    <el-menu-item index="login" v-if="loginshow"><el-icon><Right/></el-icon>登录</el-menu-item>
                    <el-menu-item index="background" v-if="!loginshow"><el-icon><User/></el-icon>个人中心</el-menu-item>
                </el-menu>
            </el-header>
            <el-main style="padding: 0px">
                <!-- 上传模块 -->
                <transition
                    enter-active-class="animate__animated animate__fadeInDown animate__faster"
                    leave-active-class="animate__animated animate__fadeOutUp"
                >
                    <div v-show="uploadstate" class="upload">
                        <el-upload
                            class="upload-demo"
                            drag
                            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                            multiple
                        >
                            <el-icon class="el-icon--upload">
                                <upload-filled />
                            </el-icon>
                            <div class="el-upload__text">
                                <div style="font-size: 30px; color: #ffffff; margin-bottom: 10px;">
                                    拖放图片到这里上传
                                </div>
                                <span style="font-size: 1em; color: #ffffff"
                                    >或者
                                    <em
                                        ><el-icon><ZoomIn /></el-icon
                                        >浏览您的计算器</em
                                    ></span
                                >
                                <br />
                                <div
                                    style="font-size: 0.79rem; margin-top: 5px"
                                >
                                    JPG JPEG PNG GIF
                                </div>
                            </div>
                        </el-upload>
                    </div>
                </transition>

                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script setup>
import { UploadFilled, Right, ZoomIn, User } from "@element-plus/icons-vue";
import { ref } from "vue";
import router from "../router";

const uploadstate = ref(false);
const loginshow = ref(false);
// 上传框显示函数
const uplaodclick = () => {
    uploadstate.value = !uploadstate.value;
};
// 登录函数
const login = () => {
    router.push({ path: "/login" });
};
// 菜单选择回调
const select = (key) => {
    if (key == "user-home") {
        uplaodclick();
    }
    if (key == "login") {
        login();
    }
};
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
