import axios from 'axios'
import Vue from 'vue'
import router from './router'
const http = axios.create({
    baseURL:process.env.VUE_APP_API_URL || '/admin/api',
    // baseURL: 'http://localhost:3000/admin/api'
});


//拦截器，拦截表示200的响应码..
http.interceptors.response.use(res => {
    return res
}, err => {
    if (err.response.data.message) {
        Vue.prototype.$message.error({
            type: 'error',
            message: err.response.data.message
        })
        //如果是401错误，就是token的问题，需要跳去登录页面
        if (err.response.status === 401) {
            router.push('/login')
        }
    }
    return Promise.reject(err)
})

//操作请求头
http.interceptors.request.use((config) => {
    if (localStorage.token) {
        config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config;
}, err => {
    return Promise.reject(err)
})
export default http