import { axios, buildPaginationQueryOpts } from '@/utils/request'
class PropertyApi {
  constructor () {
    this._url = '/services/product/api/brand'
  }
  get url () {
    return this._url
  }

  creat (data) {
    return axios.post(`${this.url}`, data)
  }
  update (data) {
    return axios.put(`${this.url}`, data)
  }
  delete (id) {
    return axios.delete(`${this.url}/${encodeURIComponent(id)}`)
  }
  find (id) {
    return axios.get(`${this.url}/${encodeURIComponent(id)}`)
  }

  list (pageable) {
    return axios.get(`${this.url}/list?${buildPaginationQueryOpts(pageable)}`)
  }
}
export default new PropertyApi()
