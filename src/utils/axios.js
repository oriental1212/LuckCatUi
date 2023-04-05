import axios from "axios";
import { Message } from "@element-plus/icons";

const request = axios.create({
    url: "http://localhost:1111",
    timeout: 5000,
})
//请求过滤器
request.interceptors.request.use(config => {
    if (localStorage.LuckCat) {
        config.headers.Authorization = getLocalStorage("LuckCat")
    }
    return config
}, error => {
    return Promise.reject(error)
})

//响应过滤器
request.interceptors.response.use(
    response => {
        if(response.data.message.LuckCat){
            setLocalStorage(response.data.message.LuckCat,response.data.message.LuckCat.value)
        }
        return response.data
    },
    error => {
        if (error != '' && error != null && error != undefined) {
            Message({
                type: "error",
                message: error.response.data.message
            })
            return Promise.reject(error.response.data)
        } else {
            Message({
                type: "error",
                message: "HTTP:服务器遇到错误，无法完成请求"
            })
        }
    })

// 设置LocalStorage过期
const setLocalStorage = (key, value) => {
    value = JSON.stringify(value);
    // 设置过期原则
    if (!value) {
        localStorage.removeItem(key)
    } else {
        var Days = 24; // 以小时为单位，默认24小时
        var exp = new Date();
        localStorage[key] = JSON.stringify({
            value,
            // 和后端协商做了失效时间
            expires: exp.getTime() + Days * 7
        })
    }
}

const getLocalStorage = name => {
    try {
        let o = JSON.parse(localStorage[name]);
        if (!o || o.expires < Date.now()) {
            return ""
        } else {
            return JSON.parse(o.value)
        }
    } catch (e) {
        // 兼容其他localstorage
        return localStorage[name]
    }
}
export default request