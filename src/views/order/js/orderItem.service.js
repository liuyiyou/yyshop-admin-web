import orderItemApi from '@/api/orderItem.api'

class OrderItemService {
  async create (data) {
    return orderItemApi.creat(data)
  }

  async update (data) {
    return orderItemApi.update(data)
  }

  async modify (data) {
    return orderItemApi.modify(data)
  }

  async delete (id) {
    return orderItemApi.delete(id)
  }

  async find (id) {
    return orderItemApi.find(id)
  }

  async list (pageable) {
    return orderItemApi.list(pageable)
  }

  async advancedSearch (whereClause, pageable) {
    return orderItemApi.advancedSearch(whereClause, pageable)
  }
}

export default new OrderItemService()
