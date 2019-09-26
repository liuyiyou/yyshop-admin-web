import { axios, buildPaginationQueryOpts } from '@/utils/request'
class UserApi {
  constructor () {
    this._url = '/api/user'
  }
  get url () {
    return this._url
  }

  getCurrentUserInfo () {
    return axios.get(`${this.url}`)
  }
  getUserList (pageable) {
    return axios.get(`${this.url}/list?${buildPaginationQueryOpts(pageable)}`)
  }
}
export default new UserApi()
