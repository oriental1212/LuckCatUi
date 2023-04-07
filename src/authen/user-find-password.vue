<template>
    <router-view>
        <div class="findpassword">
            <div class="container">
                <el-container>
                    <el-header>
                        <div style="padding: 20px">
                            <el-steps :active="active" finish-status="success" align-center>
                            <el-step title="Step 1" description="输入您的邮箱"/>
                            <el-step title="Step 2" description="输入您的验证码"/>
                            <el-step title="Step 3" description="输入您的密码"/>
                            </el-steps>
                        </div>
                    </el-header>
                    <el-main>
                        <div class="main">
                            <el-row align="middle" justify="space-evenly" class="el-row">
                                <!-- 步骤一 -->
                                <div v-if="active == 0">
                                    <div class="txtb">
                                        <input type="text" v-model="form.email" ref="foucs" @focus="foucsclick" @blur="unfoucsclick">
                                        <span data-placeholder="Email" ></span>
                                    </div>
                                </div>
                                <!-- 步骤二 -->
                                <div v-if="active == 1">
                                    <div class="txtb">
                                        <input type="text" v-model="form.captcha" ref="foucs" @focus="foucsclick" @blur="unfoucsclick">
                                        <span data-placeholder="Captcha" ></span>
                                    </div>
                                </div>
                                <!-- 步骤三 -->
                                <div v-if="active == 2">
                                    <div class="txtb">
                                        <input type="text" v-model="form.password" ref="foucs" @focus="foucsclick" @blur="unfoucsclick">
                                        <span data-placeholder="Password" ></span>
                                    </div>
                                    <br>
                                    <div class="txtb">
                                        <input type="text" v-model="form.confirmpassword" ref="foucs1" @focus="foucsclick1" @blur="unfoucsclick1">
                                        <span data-placeholder="Confirm Password" ></span>
                                    </div>
                                </div>
                            </el-row>
                        </div>
                    </el-main>
                    <el-footer class="el-footer">
                        <router-link :to="{path:'/authen'}">返回登录</router-link>
                        <br>
                        <el-button @click="next">下一步</el-button>
                    </el-footer>
                </el-container>
            </div>
        </div>
    </router-view>
</template>

<script setup>
import { ref, reactive } from 'vue';
import request from '../utils/axios';
import { ElMessage } from 'element-plus';
import router from '../router';

const active = ref(0)
const foucs = ref()
const foucs1 = ref()
const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
const regPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)/

const form = reactive({
    email: "",
    captcha: "",
    password: "",
    confirmpassword: ""
})

const next = () => {
    //步骤一校验
    if(active.value == 0){
        if(form.email != "" && regEmail.test(form.email)){
            request.get("/user/sendPasswordMail/" + form.email).then(res => {
                if(res.code == 200){
                    ElMessage({
                        type: "success",
                        message: res.msg
                    })
                    active.value++
                }else{
                    ElMessage({
                        type: "error",
                        message: res.msg
                    })
                }
            })
        }else{
            ElMessage({
                type: "error",
                message: "邮箱格式不正确"
            })
        }
    }
    //步骤二校验
    if(active.value == 1){
        if(form.captcha != ""){
            request.get("/user/captchaCheck/" + form.email + "/" + form.captcha).then(res => {
                if(res.code == 200){
                    ElMessage({
                        type: "success",
                        message: res.data
                    })
                    active.value++
                }else{
                    ElMessage({
                        type: "error",
                        message: res.msg
                    })
                }
            })
        }else{
            ElMessage({
                type: "error",
                message: "验证码不能为空"
            })
        }
    }
    //步骤三校验
    if(active.value == 2){
        if(form.password != "" && (form.password == form.confirmpassword) && regPassword.test(form.password)){
            request.get("/user/updatePassword/" + form.email + "/" + form.captcha + "/" + form.password).then(res => {
                if(res.code == 200){
                    ElMessage({
                        type: "success",
                        message: "密码更新成功"
                    })
                    router.push({name : "user-authen"})
                    active.value = 0
                }else{
                    ElMessage({
                        type: "error",
                        message: res.msg
                    })
                }
            })
        }else{
            ElMessage({
                type: "error",
                message: "新密码格式错误"
            })
        }
    }
}

//动态更改css
const foucsclick = () => {
    foucs.value.className = 'focus'
}
const unfoucsclick = () => {
    if(foucs.value.value.length === 0){
        foucs.value.className = ''
    }
}
const foucsclick1 = () => {
    foucs1.value.className = 'focus'
}
const unfoucsclick1 = () => {
    if(foucs1.value.value.length === 0){
        foucs1.value.className = ''
    }
}
</script>

<style>
.findpassword {
    font-family: 'Montserrat',sans-serif;
    background-image: linear-gradient(120deg,#3498db,#8e44ad);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
.container {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .22);
    position: relative;
    overflow: auto;
    width: 850px;
    max-width: 100%;
    min-height: 480px;   
}
.main{
    height: 40vh;
}
.el-row{
    height: 40vh;
}
.el-footer{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

/* 输入框 */
.txtb {
    border-bottom: 2px solid #adadad;
    position: relative;
    margin: 10px 0;
}

.txtb input {
    font-size: 15px;
    color: #333;
    border: none;
    width: 100%;
    outline: none;
    background: none;
    padding: 0 3px;
    height: 35px;
}

.txtb span::before {
    content: attr(data-placeholder);
    position: absolute;
    top: 50%;
    left: 5px;
    color: #adadad;
    transform: translateY(-50%);
    transition: .5s;
}
.txtb span::after {
    content: '';
    position: absolute;
    left: 0%;
    top: 100%;
    width: 0%;
    height: 2px;
    background-image: linear-gradient(120deg,#3498db,#8e44ad);
    transition: .5s;
}

.focus + span::before {
    top: -5px;
}

.focus + span::after {
    width: 100%;
}
</style>