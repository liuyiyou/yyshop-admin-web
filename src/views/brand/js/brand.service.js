import brandApi from '@/api/brand.api'

class BrandService {
  async create(data) {
    return brandApi.creat(data)
  }
  async update(data) {
    return brandApi.update(data)
  }
  async delete(id) {
    return brandApi.delete(id)
  }
  async find(id) {
    return brandApi.find(id)
  }
  async list (params) {
    console.log('getBrandList', params)
    return brandApi.list(params)
  }
}
export default new BrandService()