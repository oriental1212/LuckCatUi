<template>
    <router-view>
        <div class="body">
            <div class="container" :class="{ 'right-panel-active': isAlive }" id="login-box">
                <!-- 注册 -->
                <div class="form-container sign-up-container">
                    <form>
                        <h1>注册</h1>           
                        <div class="txtb">
                            <input type="text" ref="foucs1" @focus="foucsclick1" @blur="unfoucsclick1">
                            <span data-placeholder="Username" ></span>
                        </div>
                        <div class="txtb">
                            <input type="email" ref="foucs2" @focus="foucsclick2" @blur="unfoucsclick2">
                            <span data-placeholder="Email" ></span>
                        </div> 
                        <div class="txtb">
                            <input type="password" ref="foucs3" @focus="foucsclick3" @blur="unfoucsclick3">
                            <span data-placeholder="Password" ></span>
                        </div>
                        <div class="txtb">
                            <input type="password" ref="foucs4" @focus="foucsclick4" @blur="unfoucsclick4">
                            <span data-placeholder="Confirm Password" ></span>
                        </div>            
                        <button>注册</button>
                    </form>
                </div>
                <!-- 登录 -->
                <div class="form-container sign-in-container">
                    <form action="#">
                        <h1>登录</h1>
                        <div class="txtb">
                            <input type="email" ref="foucs5" @focus="foucsclick5" @blur="unfoucsclick5">
                            <span data-placeholder="Email or userName" ></span>
                        </div>
                        <div class="txtb">
                            <input type="password" ref="foucs6" @focus="foucsclick6" @blur="unfoucsclick6">
                            <span data-placeholder="Password"></span>
                        </div>
                        <a href="#">忘记密码？</a>
                        <button>登录</button>
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
import { ref } from "vue"

const foucs1 = ref()
const foucs2 = ref()
const foucs3 = ref()
const foucs4 = ref()
const foucs5 = ref()
const foucs6 = ref()

let isAlive = ref(false)
const sign = () => {
    isAlive.value = !isAlive.value
}
// input的屎山建议别动
//foucs1
const foucsclick1 = () => {
    foucs1.value.className = 'focus'
    console.log(foucs1.value.value.length)
}
const unfoucsclick1 = () => {
    if(foucs1.value.value.length === 0){
        foucs1.value.className = ''
    }
}
//foucs2
const foucsclick2 = () => {
    foucs2.value.className = 'focus'
    console.log(foucs2.value.value.length)
}
const unfoucsclick2 = () => {
    if(foucs2.value.value.length === 0){
        foucs2.value.className = ''
    }
}
//foucs3
const foucsclick3 = () => {
    foucs3.value.className = 'focus'
    console.log(foucs3.value.value.length)
}
const unfoucsclick3 = () => {
    if(foucs3.value.value.length === 0){
        foucs3.value.className = ''
    }
}
//foucs4
const foucsclick4 = () => {
    foucs4.value.className = 'focus'
    console.log(foucs4.value.value.length)
}
const unfoucsclick4 = () => {
    if(foucs4.value.value.length === 0){
        foucs4.value.className = ''
    }
}
//foucs5
const foucsclick5 = () => {
    foucs5.value.className = 'focus'
    console.log(foucs5.value.value.length)
}
const unfoucsclick5 = () => {
    if(foucs5.value.value.length === 0){
        foucs5.value.className = ''
    }
}
//foucs6
const foucsclick6 = () => {
    foucs6.value.className = 'focus'
    console.log(foucs6.value.value.length)
}
const unfoucsclick6 = () => {
    if(foucs6.value.value.length === 0){
        foucs6.value.className = ''
    }
}
</script>
<style>
* {
    box-sizing: border-box;
}
body {
    font-family: 'Montserrat',sans-serif;
    background-image: linear-gradient(120deg,#3498db,#8e44ad);;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: -20px 0 50px;
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
    background-image: linear-gradient(120deg,#3498db,#8e44ad);
    transition: .5s;
}

.focus + span::before {
    top: -5px;
}

.focus + span::after {
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
    position:absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform .6s ease-in-out;
    z-index: 100;
}
.overlay {
    background-image: linear-gradient(120deg,#3498db,#8e44ad);
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