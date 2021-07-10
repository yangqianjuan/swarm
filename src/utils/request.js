import axios from 'axios'
// import { Message, MessageBox } from 'element-ui'
import { Message } from 'element-ui'
import store from '../store'
import { getToken, removeToken } from '@/utils/auth'

// 创建axios实例
console.log(process.env.BASE_API)
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 150000, // 请求超时时间
  withCredentials: false, // 跨域
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['authorization'] = 'Bearer '+getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.code !== undefined) {
      return response.data
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
