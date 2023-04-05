import axios from "axios";

const request = axios.create({
    baseURL: "http://localhost:1111",
    timeout: 5000,
})
//请求过滤器
request.interceptors.request.use(config => {
    if (localStorage.LuckCat) {
        config.headers.LuckCat = localStorage.LuckCat
    }
    return config
}, error => {
    return Promise.reject(error)
})

//响应过滤器
request.interceptors.response.use(
    response => {
        if(response.data.data.data.tokenName){
            localStorage.LuckCat = response.data.data.data.tokenValue
        }
        let res = response.data;
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        return res;
    },
    error => {
        console.log("erroe"+error)
        return Promise.reject(error)
    }
)
export default request