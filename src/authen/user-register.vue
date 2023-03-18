<template>
    <router-view>
        <div class="background">
            <div class="form-register">
                <el-form
                    :model="register"
                >
                    <div style="text-align: center; margin-bottom: 18px;">
                        <span style="color: white; font-size: 26px;">LuckCat注册</span>
                    </div>
                    <el-form-item prop="name">
                        <el-input v-model="register.email" placeholder="邮箱"/>
                    </el-form-item>
                    <el-form-item prop="name">
                        <el-input v-model="register.nickname" placeholder="昵称"/>
                    </el-form-item>
                    <el-form-item prop="name">
                        <el-input v-model="register.password" placeholder="密码" type="password" show-password/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="sumbit" style="margin: 0 auto;">注册</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </router-view>
</template>

<script setup>
import { reactive } from 'vue';

const register = reactive({
    email: "",
    password: "",
    nickname: ""
})

const sumbit = () => {

}
</script>

<style>
.background{
    background: url("@/public/no01.jpg");
    width: 100%;
    height: 100%;
    position: fixed;
    background-size: 100% 100%;
}
.form-register{
    position: absolute;
    top: 45%;
    left: 52%;
    width: 400px;
    height: 300px;
    /* 设置毛玻璃效果 */
    transform: translate(-50%,-50%);
    background: rgba(255, 255, 255, 0.15);
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    border-radius: 25px;
    box-shadow:inset 0 0 6px rgba(255, 255, 255, 0.2);
    /* 设置子div水平垂直居中 */
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>