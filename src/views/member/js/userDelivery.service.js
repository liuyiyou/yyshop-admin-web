import userDeliveryApi from '@/api/userDelivery.api'

class UserDeliveryService {
  async create (data) {
    return userDeliveryApi.creat(data)
  }

  async update (data) {
    return userDeliveryApi.update(data)
  }

  async modify (data) {
    return userDeliveryApi.modify(data)
  }

  async delete (id) {
    return userDeliveryApi.delete(id)
  }

  async find (id) {
    return userDeliveryApi.find(id)
  }

  async list (pageable) {
    return userDeliveryApi.list(pageable)
  }

  async listByUId (uid) {
    return userDeliveryApi.listByUId(uid)
  }

  async advancedSearch (whereClause, pageable) {
    return userDeliveryApi.advancedSearch(whereClause, pageable)
  }
}

export default new UserDeliveryService()
