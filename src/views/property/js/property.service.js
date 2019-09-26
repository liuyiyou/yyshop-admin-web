import propertyApi from '@/api/property.api'

class PropertyService {
  async create(data) {
    return propertyApi.creat(data)
  }
  async update(data) {
    return propertyApi.update(data)
  }
  async delete(id) {
    return propertyApi.delete(id)
  }
  async find(id) {
    return propertyApi.find(id)
  }
  async list (params) {
    console.log('getPropertyList', params)
    return propertyApi.list(params)
  }
}
export default new PropertyService()