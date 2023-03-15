<template>
    <div class="common-layout">
        <el-container style="height: 100%">
            <el-header style="padding: 0px; background: #2a2a32">
                <el-row
                    :gutter="5"
                    justify="end"
                    align="middle"
                    style="height: 100%; width: 100%"
                >
                    <el-col :span="1.25">
                        <el-button
                            color="#000000"
                            link
                            :icon="UploadFilled"
                            @click="uplaodclick"
                            >上传</el-button
                        >
                    </el-col>
                    <el-col :span="1.25">
                        <el-button color="#000000" link :icon="Right"
                            >登录</el-button
                        >
                    </el-col>
                    <el-col :span="0.5"> </el-col>
                </el-row>
            </el-header>

            <el-main style="padding: 0px">
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
                            <el-icon class="el-icon--upload"
                                ><upload-filled
                            /></el-icon>
                            <div class="el-upload__text">
                                Drop file here or <em>click to upload</em>
                            </div>
                            <template #tip>
                                <div class="el-upload__tip">
                                    jpg/png files with a size less than 500kb
                                </div>
                            </template>
                        </el-upload>
                    </div>
                </transition>

                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script setup>
import { UploadFilled, Right } from "@element-plus/icons-vue";
import { ref } from "vue";

const uploadstate = ref(false);

const uplaodclick = () => {
    uploadstate.value = !uploadstate.value;
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

.el-upload-dragger {
    background-color: #2a2a32;
}
</style>
