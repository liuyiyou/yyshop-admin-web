import baseCountryApi from '@/api/basecountry.api'

class BaseCountryService {
  async create(data) {
    return baseCountryApi.creat(data)
  }
  async update(data) {
    return baseCountryApi.update(data)
  }
  async modify(data) {
    return baseCountryApi.modify(data)
  }
  async delete(id) {
    return baseCountryApi.delete(id)
  }
  async find(id) {
    return baseCountryApi.find(id)
  }
  async list(pageable) {
    return baseCountryApi.list(pageable)
  }
  async advancedSearch(whereClause, pageable) {
    return baseCountryApi.advancedSearch(whereClause, pageable)
  }
}
export default new BaseCountryService()
