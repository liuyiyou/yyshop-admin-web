import { axios } from '@/utils/request'
class UploadApi {
  constructor () {
    this._url = '/api/upload'
  }
  get url () {
    return this._url
  }

  getPolicy (data) {
    return axios.get(`${this.url}/getPolicy`)
  }
}
export default new UploadApi()
