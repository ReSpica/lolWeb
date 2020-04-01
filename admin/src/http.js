import axios from 'axios'
import Vue from 'vue'
const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
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
    }
    return Promise.reject(err)
})
export default http