import { baseUrl } from '../config/env.js'
import { useUserStore } from '@/stores/user' // 只是导入，不要执行！

// mock开关 true=启用模拟接口 false=请求真实后端
const IS_MOCK = true
// 模拟接口数据
const mockData = {
  '/user/login': {
    code: 200,
    msg: '登录成功',
    data: {
      token: 'mock-token-123456',
      userId: 10001
    }
  },
  '/user/info': {
    code: 200,
    msg: '成功',
    data: {
      username: '测试用户',
      avatar: '/static/logo.png'
    }
  }
}
const request = (options) => {
  // 🎯重点：函数内部运行的时候再获取store实例！！
  const userStore = useUserStore()

  // 如果开启mock，直接返回模拟数据
  if (IS_MOCK) {
    return new Promise((resolve) => {
      // 模拟网络延迟
      setTimeout(() => {
        const res = mockData[options.url] || { code: 500, msg: 'mock接口不存在' }
        resolve(res)
      }, 600)
    })
  }
  // ========== 下面是原有真实请求代码 ==========
  const url = baseUrl + options.url
  const header = {
    'Content-Type': 'application/json;charset=UTF-8',
    // 从pinia拿token
    Authorization: userStore.token || ''
  }
  const showLoading = options.showLoading ?? true
  if (showLoading) {
    uni.showLoading({ title: '加载中...', mask: true })
  }
  return new Promise((resolve, reject) => {
    uni.request({
      url,
      method: options.method || 'GET',
      data: options.data || {},
      header: { ...header, ...options.header },
      timeout: options.timeout || 10000,
      success: (res) => {
        uni.hideLoading()
        const { statusCode, data } = res
        if (statusCode === 200) {
          if (data.code === 200) {
            resolve(data)
          } else if (data.code === 401) {
            // token失效，调用pinia的logout方法
            userStore.logout()
            uni.showToast({ title: '登录已过期，请重新登录', icon: 'none' })
            setTimeout(() => uni.reLaunch({ url: '/pages/login/login' }), 1000)
            reject(data)
          } else {
            uni.showToast({ title: data.msg || '请求失败', icon: 'none' })
            reject(data)
          }
        } else {
          uni.showToast({ title: `服务器错误${statusCode}`, icon: 'none' })
          reject(res)
        }
      },
      fail: (err) => {
        uni.hideLoading()
        uni.showToast({ title: '网络请求失败，请检查网络', icon: 'none' })
        reject(err)
      }
    })
  })
}
export const get = (url, data = {}, options = {}) => {
  return request({ method: 'GET', url, data, ...options })
}
export const post = (url, data = {}, options = {}) => {
  return request({ method: 'POST', url, data, ...options })
}
export const put = (url, data = {}, options = {}) => {
  return request({ method: 'PUT', url, data, ...options })
}
export const del = (url, data = {}, options = {}) => {
  return request({ method: 'DELETE', url, data, ...options })
}
export default request
