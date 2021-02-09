/**
 * 封装 axios 请求模块
 */

import axios from 'axios'
import store from '@/store/index'

const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net'
  // baseURL: 'http://ttapi.research.itcast.cn/'
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  const { user } = store.state
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

export default request
