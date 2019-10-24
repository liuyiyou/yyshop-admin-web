import { axios, buildPaginationQueryOpts } from '@/utils/request'
class SysRoleApi {
    constructor() {
        this._url = '/api/sysRole'
    }
    get url() {
        return this._url
    }
    creat(data) {
        return axios.post(`${this.url}`, data)
    }
    update(data) {
        return axios.put(`${this.url}`, data)
    }
    modify(data) {
        return axios.put(`${this.url}/modify`, data)
    }
    delete(id) {
        return axios.delete(`${this.url}/${encodeURIComponent(id)}`)
    }
    find(id) {
        return axios.get(`${this.url}/${encodeURIComponent(id)}`)
    }

    list(pageable) {
        return axios.get(`${this.url}/list?${buildPaginationQueryOpts(pageable)}`)
    }

    advancedSearch(whereCause, pageable) {
        return axios.get(`${this.url}/adv/${encodeURIComponent(whereCause)}?${buildPaginationQueryOpts(pageable)}`)
    }
}
export default new SysRoleApi()
