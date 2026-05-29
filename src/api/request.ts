import axios from 'axios'
import type { ApiResult } from './types'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://pconsole-dev.seeneuro.com'
const isStatic = import.meta.env.VITE_STATIC_MODE === 'true'

const request = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

request.interceptors.request.use((config) => {
  if (isStatic) {
    config.adapter = () =>
      Promise.reject(new Error('Static mode: request skipped'))
  }
  return config
})
request.interceptors.response.use(
  (response) => {
    const data = response.data as ApiResult
    if (data.code !== 0) {
      return Promise.reject(new Error(data.message || '请求失败'))
    }
    return response
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default request