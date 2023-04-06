<template>
    <router-view>
        <div class="background">
            <div class="form-login">
                <el-form
                    :model="login"
                >
                    <div style="text-align: center; margin-bottom: 18px;">
                        <span style="color: white; font-size: 26px;">LuckCat登录</span>
                    </div>
                    <el-form-item prop="name">
                        <el-input v-model="login.account" placeholder="邮箱或用户名"/>
                    </el-form-item>
                    <el-form-item prop="name">
                        <el-input v-model="login.password" placeholder="密码" type="password" show-password/>
                    </el-form-item>
                    <el-form-item style="flex-wrap: wrap">
                        <el-button type="primary" @click="sumbit" style="margin: 0 auto;">登录</el-button>
                    </el-form-item>
                    <div style="text-align: center; display: flex; justify-content: space-between;">
                        <span style="color: white; font-size: 13px;"><router-link :to="{name:'register'}">注册</router-link></span>
                        <span style="color: white; font-size: 13px;"><router-link :to="{name:'register'}">找回密码</router-link></span>
                    </div>
                </el-form>
            </div>
        </div>
    </router-view>
</template>

<script setup>
import { reactive } from 'vue';
import request from '@/utils/axios';
import { ElMessage } from "element-plus";

const login = reactive({
    account: "",
    password: ""
})

const sumbit = () => {
    console.log(login)
    request.post("/user/loginUser",login).then((res) => {
        if(res.data.data.tokenName == "LuckCat"){
            ElMessage({
                type: 'success',
                message: '登录成功',
            })
        }else{
            ElMessage({
                type: 'error',
                message: res.data.data.msg,
            })
            console.log(res)
        }
    })
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
.form-login{
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