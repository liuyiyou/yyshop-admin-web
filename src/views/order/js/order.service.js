import orderApi from '@/api/order.api'

class OrderService {
  async create (data) {
    return orderApi.creat(data)
  }

  async update (data) {
    return orderApi.update(data)
  }

  async modify (data) {
    return orderApi.modify(data)
  }

  async delete (id) {
    return orderApi.delete(id)
  }

  async find (id) {
    return orderApi.find(id)
  }

  async list (pageable) {
    return orderApi.list(pageable)
  }

  async advancedSearch (whereClause, pageable) {
    return orderApi.advancedSearch(whereClause, pageable)
  }
}

export default new OrderService()
