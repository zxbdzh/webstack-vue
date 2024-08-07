// http.js
import axios from 'axios'
import { useUserStore } from '@/stores/user.js'
import router from '@/router/index.js'

const userStore = useUserStore()

// 创建 axios 实例
const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 替换为你的 API 基础 URL
  timeout: 10000 // 请求超时时间
  // 其他配置项...
})

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    // 在这里可以添加请求头，比如认证令牌
    config.headers.Authorization = userStore.token
    return config
  },
  (error) => {
    // 处理请求错误
    ElMessage({
      type: 'error',
      message: error.data
    })
    return Promise.reject(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    if (response.data.code > 200) {
      // 处理请求错误
      ElMessage({
        type: 'error',
        message: response.data.message
      })
      return Promise.reject()
    }
    // 对响应数据做点什么
    return response
  },
  async (error) => {
    // 处理响应错误
    if (error.response.status === 401) {
      ElMessage({
        type: 'error',
        message: '用户未登录！'
      })
      await router.push('/user/login')
      window.location.reload()
    }
    if (error.response.status === 402) {
      ElMessage({
        type: 'error',
        message: '用户权限不足！'
      })
      await router.push('/')
      window.location.reload()
    }
    return Promise.reject(error)
  }
)

// 封装 GET 请求
function get(url, params = {}) {
  return http.get(url, {
    params: params
  })
}

// 封装 POST 请求
function post(url, data = {}, params) {
  return http.post(url, data, {
    params: params
  })
}

// 封装 PUT 请求
function put(url, data = {}, params) {
  return http.put(url, data, {
    params
  })
}

// 封装 DELETE 请求
function remove(url, params = {}) {
  return http.delete(url, {
    params
  })
}

// 封装 PATCH 请求
function patch(url, data = {}, params) {
  return http.patch(url, data, {
    params
  })
}

// 导出封装好的方法
export default {
  get,
  post,
  put,
  delete: remove,
  patch
}
