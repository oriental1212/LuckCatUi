<template>
    <router-view>
        <div class="authen">
            <div class="container" :class="{ 'right-panel-active': isAlive }" id="login-box">
                <!-- 注册 -->
                <div class="form-container sign-up-container">
                    <form>
                        <h1>注册</h1>
                        <div class="txtb">
                            <input type="text" v-model="form.register.username" ref="foucs1" @focus="foucsclick1"
                                @blur="unfoucsclick1">
                            <span data-placeholder="Username"></span>
                        </div>
                        <div class="txtb">
                            <input type="email" v-model="form.register.email" ref="foucs2" @focus="foucsclick2"
                                @blur="unfoucsclick2">
                            <span data-placeholder="Email"></span>
                        </div>
                        <div class="txtb">
                            <input type="password" v-model="form.register.password" ref="foucs3" @focus="foucsclick3"
                                @blur="unfoucsclick3">
                            <span data-placeholder="Password"></span>
                        </div>
                        <div class="txtb">
                            <input type="password" v-model="form.register.confirmpassword" ref="foucs4" @focus="foucsclick4"
                                @blur="unfoucsclick4">
                            <span data-placeholder="Confirm Password"></span>
                        </div>
                        <button @click="registerClick">注册</button>
                    </form>
                </div>
                <!-- 登录 -->
                <div class="form-container sign-in-container">
                    <form>
                        <h1>登录</h1>
                        <div class="txtb">
                            <input type="text" v-model="form.login.account" ref="foucs5" @focus="foucsclick5"
                                @blur="unfoucsclick5">
                            <span data-placeholder="Email or userName"></span>
                        </div>
                        <div class="txtb">
                            <input type="password" v-model="form.login.password" ref="foucs6" @focus="foucsclick6"
                                @blur="unfoucsclick6">
                            <span data-placeholder="Password"></span>
                        </div>
                        <router-link :to="{ path: '/findpassword' }"><span class="findPSW">&nbsp;忘记密码？</span>
                        </router-link>
                        <button @click="loginClick">登录</button>
                    </form>
                </div>

                <div class="overlay-container">
                    <div class="overlay">
                        <div class="overlay-panel overlay-left">
                            <h1>已有账号？</h1>
                            <p>请使用您的账号进行登录</p>
                            <button class="ghost" id="signIn" @click="sign">登录</button>
                        </div>
                        <div class="overlay-panel overlay-right">
                            <h1>没有账号?</h1>
                            <p>立即注册加入LuckCat和我们一起开始旅程吧</p>
                            <button class="ghost" id="signUp" @click="sign">注册</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </router-view>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue"
import request from "@/utils/axios";
import router from "../router";
import { useStore } from "vuex";
import { ElNotification } from 'element-plus'

const foucs1 = ref()
const foucs2 = ref()
const foucs3 = ref()
const foucs4 = ref()
const foucs5 = ref()
const foucs6 = ref()

const store = useStore()
let isAlive = ref(false)
//校验的正则判断
const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
const regPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)/
//滑动切换函数
const sign = () => {
    isAlive.value = !isAlive.value
}
//表单数据
const form = reactive({
    register: {
        username: "",
        email: "",
        password: "",
        confirmpassword: ""
    },
    login: {
        account: "",
        password: ""
    },
    registercommite: {}
})
//注册事件
const registerClick = (event) => {
    event.preventDefault()
    if (checkregister()) {
        request.post("/user/registerUser", form.registercommite).then((res) => {
            console.log(res)
            if (res.code === 500) {
                ElMessage({
                    type: "error",
                    message: "该用户名或邮箱已经注册，不可以重复注册"
                })
            } else if (res.code === 200) {
                ElMessage({
                    type: "success",
                    message: "注册成功"
                })
                localStorage.setItem(res.data[0].tokenName, res.data[0].tokenValue)
                localStorage.setItem("personInfo", JSON.stringify(res.data[1]))
                localStorage.setItem("startTime",new Date().getTime())
                store.commit("changeloginflage")
                router.push({ name: 'user-home' })
            }
        })
    }
}
//登录事件
const loginClick = (event) => {
    event.preventDefault()
    if (checklogin()) {
        request.post("/user/loginUser", form.login).then((res) => {
            console.log(res)
            if (res.code === 500) {
                ElMessage({
                    type: "error",
                    message: res.msg
                })
            } else if (res.code === 200) {
                ElMessage({
                    type: "success",
                    message: "登录成功"
                })
                localStorage.setItem(res.data[0].tokenName, res.data[0].tokenValue)
                localStorage.setItem("personInfo", JSON.stringify(res.data[1]))
                localStorage.setItem("startTime",new Date().getTime())
                store.commit("changeloginflage")
                router.push({ name: 'user-home' })
            }
        })
    }
}
//登录校验函数
const checklogin = () => {
    if (form.login.account === "" || form.login.password === "") {
        // ElMessage({
        //     type: "error",
        //     message: "选项不能为空"
        // })
        ElNotification.error({
            title: '信息错误',
            message: '选项不能为空',
        })
        return false
    }
    if (form.login.account.length < 4) {
        ElMessage({
            type: "error",
            message: "账户名长度不能小于4"
        })
        return false
    }
    if (form.login.password.length < 6 || form.login.password.length > 16) {
        ElMessage({
            type: "error",
            message: "密码长度必须处于6~16之间"
        })
        return false
    } else if (!regPassword.test(form.login.password)) {
        ElMessage({
            type: "error",
            message: "格式错误：密码必须包含两种不同字符"
        })
        return false
    }
    return true
}
//注册校验函数
const checkregister = () => {
    if (form.register.username === "" || form.register.email === "" || form.register.password === "" || form.register.confirmpassword === "") {
        ElMessage({
            type: "error",
            message: "选项不能为空"
        })
        return false
    }
    if (form.register.username.length < 4) {
        ElMessage({
            type: "error",
            message: "用户名长度不能小于4"
        })
        return false
    }
    if (!regEmail.test(form.register.email)) {
        ElMessage({
            type: "error",
            message: "邮箱格式不正确"
        })
        return false
    }
    if (form.register.password !== form.register.confirmpassword) {
        ElMessage({
            type: "error",
            message: "两次密码输入不同，请重新校验"
        })
        return false
    } else if (form.register.password.length < 6 || form.register.password.length > 16) {
        ElMessage({
            type: "error",
            message: "密码长度必须处于6~16之间"
        })
        return false
    } else if (!regPassword.test(form.register.password)) {
        ElMessage({
            type: "error",
            message: "格式错误：密码必须包含两种不同字符"
        })
        return false
    }
    form.registercommite.username = form.register.username
    form.registercommite.email = form.register.email
    form.registercommite.password = form.register.password
    return true
}
//判断用户是否存在的函数
const isExist = (param) => {
    if (param === "login") {
        if (form.login.account.length > 4 && form.login.account !== "") {
            request.get("/user/exist/" + form.login.account).then((res) => {
                if (res.code == 200) {
                    ElNotification.success({
                        message: '欢迎登录',
                        duration: 2000
                    })
                } else if (res.code == 500) {
                    ElNotification.error({
                        message: '该账户不存在,请先注册',
                        duration: 3000
                    })
                }
            })
        } else if (form.login.account.length <= 4 && form.login.account !== "") {
            ElNotification.warning({
                message: '账号长度要大于四位',
                duration: 2000
            })
        }
    } else if (param === "register") {
        if (form.register.username.length > 4 && form.register.username !== "") {
            request.get("/user/exist/" + form.register.username).then((res) => {
                if (res.code == 200) {
                    ElNotification.error({
                        message: '该账户已存在,请换一个',
                        duration: 2000
                    })
                } else if (res.code == 500) {
                    ElNotification.success({
                        message: '该账户不存在,欢迎注册',
                        duration: 3000
                    })
                }
            })
        } else if (form.register.username.length <= 4 && form.register.username !== "") {
            ElNotification.warning({
                message: '账号长度要大于四位',
                duration: 2000
            })
        }
    }

}

// input的屎山建议别动
//foucs1
const foucsclick1 = () => {
    foucs1.value.className = 'focus'
}
const unfoucsclick1 = () => {
    if (foucs1.value.value.length === 0) {
        foucs1.value.className = ''
    }
    isExist("register")
}
//foucs2
const foucsclick2 = () => {
    foucs2.value.className = 'focus'
}
const unfoucsclick2 = () => {
    if (foucs2.value.value.length === 0) {
        foucs2.value.className = ''
    }
}
//foucs3
const foucsclick3 = () => {
    foucs3.value.className = 'focus'
}
const unfoucsclick3 = () => {
    if (foucs3.value.value.length === 0) {
        foucs3.value.className = ''
    }
}
//foucs4
const foucsclick4 = () => {
    foucs4.value.className = 'focus'
}
const unfoucsclick4 = () => {
    if (foucs4.value.value.length === 0) {
        foucs4.value.className = ''
    }
}
//foucs5
const foucsclick5 = () => {
    foucs5.value.className = 'focus'
}
const unfoucsclick5 = () => {
    if (foucs5.value.value.length === 0) {
        foucs5.value.className = ''
    }
    isExist("login")
}
//foucs6
const foucsclick6 = () => {
    foucs6.value.className = 'focus'
}
const unfoucsclick6 = () => {
    if (foucs6.value.value.length === 0) {
        foucs6.value.className = ''
    }
}
</script>
<style scoped>
* {
    box-sizing: border-box;
}

/* 忘记密码 */
.findPSW {
    position: relative;
}

.findPSW::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #7060bc;
    transform-origin: bottom right;
    transform: scaleX(0);
    transition: transform 0.5s ease;
}

.findPSW:hover::before {
    transform-origin: bottom left;
    transform: scaleX(1);
}

.authen {
    font-family: 'Montserrat', sans-serif;
    background-image: linear-gradient(120deg, #3498db, #8e44ad);
    ;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

h1 {
    font-weight: bold;
    margin: 0;
}

p {
    font-size: 14px;
    line-height: 20px;
    letter-spacing: .5px;
    margin: 20px 0 30px;
}

span {
    font-size: 12px;
}

a {
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
}

.container {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .22);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;

}

.form-container form {
    background: #fff;
    display: flex;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    justify-content: center;
    text-align: center;
}

.social-container {
    margin: 20px 0;
}

.social-container a {
    border: 1px solid #ddd;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    height: 40px;
    width: 40px;
}

.social-container a:hover {
    background-color: #eee;

}

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
    background-image: linear-gradient(120deg, #3498db, #8e44ad);
    transition: .5s;
}

.focus+span::before {
    top: -5px;
}

.focus+span::after {
    width: 100%;
}

button {
    border-radius: 20px;
    border: 1px solid #ff4b2b;
    background: #ff4b2b;
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
    cursor: pointer;
}

button:active {
    transform: scale(.95);
}

button:focus {
    outline: none;
}

button.ghost {
    background: transparent;
    border-color: #fff;
}

.form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all .6s ease-in-out;
}

.form-container button {
    background: linear-gradient(120deg, #3498db, #8e44ad);
    border: none;
    background-size: 200%;
    color: #fff;
    transition: .5s;
}

.form-container button:hover {
    background-position: right;
}

.sign-in-container {
    left: 0;
    width: 50%;
    z-index: 2;
}

.sign-in-container form a {
    position: relative;
    left: 100px;
}

.sign-up-container {
    left: 0;
    width: 50%;
    z-index: 1;
    opacity: 0;
}

.sign-up-container button {
    margin-top: 20px;
}

.overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform .6s ease-in-out;
    z-index: 100;
}

.overlay {
    background-image: linear-gradient(120deg, #3498db, #8e44ad);
    color: #fff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateY(0);
    transition: transform .6s ease-in-out;
}

.overlay-panel {
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 40px;
    height: 100%;
    width: 50%;
    text-align: center;
    transform: translateY(0);
    transition: transform .6s ease-in-out;
}

.overlay-right {
    right: 0;
    transform: translateY(0);

}

.overlay-left {
    transform: translateY(-20%);
}

.container.right-panel-active .sign-in-container {
    transform: translateY(100%);
}

.container.container.right-panel-active .overlay-container {
    transform: translateX(-100%);
}

.container.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
}

.container.container.right-panel-active .overlay {
    transform: translateX(50%);
}

.container.container.right-panel-active .overlay-left {
    transform: translateY(0);
}

.container.container.right-panel-active .overlay-right {
    transform: translateY(20%);
}
</style>