import TariffApi from '@/api/tariff.api'

class TariffService {
  async create(data) {
    return TariffApi.creat(data)
  }
  async update(data) {
    return TariffApi.update(data)
  }
  async delete(id) {
    return TariffApi.delete(id)
  }
  async find(id) {
    return TariffApi.find(id)
  }
  async list (params) {
    console.log('getTariffList', params)
    return TariffApi.list(params)
  }
}
export default new TariffService()