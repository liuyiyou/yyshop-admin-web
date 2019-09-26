import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, // api base_url
  timeout: 6000 // 请求超时时间
})

const err = (error) => {
  if (error.response) {
    const data = error.response.data
    const token = Vue.ls.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    if (!config.headers) {
      config.headers = {}
    }
    config.headers['Access-Token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改

    config.headers.Authorization = `Bearer ${token}` // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, err)

// response interceptord
service.interceptors.response.use((response) => {
  return response.data
}, err)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, service)
  }
}
const buildPaginationQueryOpts = (paginationQuery) => {
  const { sort, pageNo, pageSize, sortField, sortOrder } = paginationQuery
  if (paginationQuery) {
    let sorts = ''
    if (sortField) {
      sorts += '&sort=' + sortField + ',' + (sortOrder === 'descend' ? 'desc' : 'asc')
    }
    if (sort) {
      for (const idx of Object.keys(sort)) {
        if (sorts.length > 0) {
          sorts += '&'
        }
        sorts += 'sort=' + sort[idx]
      }
    }

    let page = ''
    if (pageNo) {
      page = `&page=${pageNo - 1}`
    }

    let size = ''
    if (pageSize) {
      size = `&size=${pageSize}`
    }
    return `${sorts}${page}${size}`
  }
  return ''
}

export {
  installer as VueAxios,
  service as axios,
  buildPaginationQueryOpts
}
