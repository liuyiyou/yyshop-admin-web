import Vue from 'vue'
import { login, getInfo, logout } from '@/api/login'
import userApi from '@/api/user.api'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          // const result = response.result
          // eslint-disable-next-line
          const { errcode, errmsg, result: { id_token, expires_in } } = response
          // Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
          if (errcode === 0) {
            Vue.ls.set(ACCESS_TOKEN, id_token, expires_in)
            commit('SET_TOKEN', id_token)
            resolve()
          } else {
            reject(errmsg)
          }
        })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const result = response.result

          if (result.role && result.role.permissions.length > 0) {
            const role = result.role
            role.permissions = result.role.permissions
            role.permissions.map(per => {
              if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                const action = per.actionEntitySet.map(action => { return action.action })
                per.actionList = action
              }
            })
            role.permissionList = role.permissions.map(permission => { return permission.permissionId })
            commit('SET_ROLES', result.role)
            commit('SET_INFO', result)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }

          commit('SET_NAME', { name: result.name, welcome: welcome() })
          commit('SET_AVATAR', result.avatar)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        console.log('getUserInfo')
        userApi.getCurrentUserInfo().then(res => {
          console.log(res)
          const { errcode, result } = res
          if (errcode === 0 && res.result) {
            commit('SET_INFO', result)
            commit('SET_NAME', { name: result.firstName, welcome: welcome() })
            commit('SET_AVATAR', result.imageUrl)
            if (result.authorities) {
              commit('SET_ROLES', res.result.authorities)
            }
            resolve(res)
          } else {
            reject(new Error('getUserInfo: failed to get userInfo'))
          }
        }).catch(error => {
          reject(error)
        })
        //   getInfo().then(response => {
        //     const result = response.result
        //     console.log(response)
        //     if (result.role && result.role.permissions.length > 0) {
        //       const role = result.role
        //       role.permissions = result.role.permissions
        //       role.permissions.map(per => {
        //         if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
        //           const action = per.actionEntitySet.map(action => { return action.action })
        //           per.actionList = action
        //         }
        //       })
        //       role.permissionList = role.permissions.map(permission => { return permission.permissionId })
        //       commit('SET_ROLES', result.role)
        //       commit('SET_INFO', result)
        //     } else {
        //       reject(new Error('getInfo: roles must be a non-null array !'))
        //     }

        //     commit('SET_NAME', { name: result.name, welcome: welcome() })
        //     commit('SET_AVATAR', result.avatar)

      //     resolve(response)
      //   }).catch(error => {
      //     reject(error)
      //   })
      // })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          Vue.ls.remove(ACCESS_TOKEN)
        })
      })
    }

  }
}

export default user
