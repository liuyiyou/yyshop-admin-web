import prodApi from '@/api/prod.api'

class ProdService {
  async create (data) {
    return prodApi.creat(data)
  }
  async update (data) {
    return prodApi.update(data)
  }
  async modify (data) {
    return prodApi.modify(data)
  }
  async delete (id) {
    return prodApi.delete(id)
  }
  async find (id) {
    return prodApi.find(id)
  }
  async list (pageable) {
    return prodApi.list(pageable)
  }
  async advancedSearch (whereClause, pageable) {
    return prodApi.advancedSearch(whereClause, pageable)
  }
}
export default new ProdService()
